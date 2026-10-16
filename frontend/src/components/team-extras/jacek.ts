const DURATION = 4500;
const TURNS = 1.5;
const TILT = 1.2; // how far the circle leans back, in radians from facing the viewer
const easeInOut = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

const VERT = `#version 300 es
void main() {
  gl_Position = vec4(vec2(gl_VertexID & 1, gl_VertexID >> 1) * 4.0 - 1.0, 0.0, 1.0);
}`;

// Traces each pixel's ray through the force a = -1.5 h² x / r⁵, the exact light-bending law around a
// heavy point mass (rays that get inside r = 1 are absorbed). The halo and the warped backdrop come out of
// that for free.
const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uSize;
out vec4 color;

const float RING_IN = 3.0;
const float RING_OUT = 10.0;
const float CAM_DIST = 16.0;
const float CAM_TILT = 0.1; // radians above the ring plane

float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1) * 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
    f.z);
}

vec3 backdrop(vec3 d) {
  vec3 p = d * 250.0;
  float h = hash(floor(p));
  float speck = smoothstep(0.4, 0.0, length(fract(p) - 0.5)) * step(0.993, h) * (h - 0.993) * 140.0;
  float band = exp(-12.0 * pow(dot(d, normalize(vec3(0.35, 1.0, 0.15))), 2.0));
  float haze = band * (0.6 * noise(d * 5.0) + 0.4 * noise(d * 13.0));
  return speck * vec3(1.0, 0.92, 0.85) + haze * vec3(0.16, 0.07, 0.12);
}

// Premultiplied colour of the ring where a ray crosses its plane.
vec4 ring(vec3 p) {
  float r = length(p.xz);
  float t = (r - RING_IN) / (RING_OUT - RING_IN);
  if (t < 0.0 || t > 1.0) return vec4(0.0);
  float a = uTime * 8.0 * pow(r, -1.5); // inner parts turn faster
  vec2 q = mat2(cos(a), sin(a), -sin(a), cos(a)) * p.xz;
  float n = 0.6 * noise(vec3(q * 0.8, r * 5.0)) + 0.4 * noise(vec3(q * 2.0, r * 13.0));
  float clump = smoothstep(0.2, 0.8, noise(vec3(q * 0.6, r * 1.5))); // big bright patches make the turning visible
  float alpha = smoothstep(0.0, 0.05, t) * smoothstep(1.0, 0.4, t) * (0.4 + 0.6 * n);
  vec3 hue = mix(vec3(1.0, 0.9, 0.7), vec3(1.0, 0.4, 0.08), smoothstep(0.0, 0.6, t));
  return vec4(hue * (2.5 * pow(1.0 - t, 2.0) + 0.2) * (0.5 + clump) * alpha, alpha);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / (0.5 * uRes.y);
  vec3 back = vec3(0.0, sin(CAM_TILT), -cos(CAM_TILT));
  // Shrinking the scene looks exactly like seeing it from further away.
  vec3 pos = back * CAM_DIST / max(uSize, 0.02);
  vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), -back));
  vec3 up = cross(-back, right);
  vec3 vel = normalize(-back + 0.6 * (uv.x * right + uv.y * up));
  vec3 h = cross(pos, vel);
  float h2 = dot(h, h);

  vec4 acc = vec4(0.0);
  for (int i = 0; i < 400; i++) {
    float r = length(pos);
    float dt = 0.06 * r;
    vel -= 1.5 * h2 * pos / pow(r, 5.0) * dt;
    vec3 next = pos + vel * dt;
    if (pos.y * next.y < 0.0) acc += (1.0 - acc.a) * ring(mix(pos, next, pos.y / (pos.y - next.y)));
    pos = next;
    if (dot(pos, pos) < 1.0) acc.a = 1.0; // absorbed
    if (acc.a > 0.99 || (r > 30.0 && dot(pos, vel) > 0.0)) break;
  }
  acc += (1.0 - acc.a) * vec4(backdrop(normalize(vel)), 1.0);
  color = vec4(1.0 - exp(-1.4 * acc.rgb), 1.0);
}`;

export default function setup(avatar: HTMLElement) {
  let running = false;
  avatar.addEventListener("dblclick", async () => {
    if (running || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    running = true;
    getSelection()?.removeAllRanges();
    // Moving elements would otherwise make the page scrollable; the stable scrollbar gutter avoids a layout shift.
    const { style } = document.documentElement;
    const overflow = style.overflow;
    style.overflow = "hidden";
    try {
      await play();
    } finally {
      running = false;
      style.overflow = overflow;
    }
  });
}

async function play() {
  // Sits behind the page content, so everything else stays on top of it.
  const canvas = document.createElement("canvas");
  canvas.className = "fixed inset-0 -z-1 size-full bg-black";
  canvas.setAttribute("aria-hidden", "true");
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  document.body.append(canvas);

  // size eases between values; the shader scales the scene by it.
  let size = 0;
  let from = 0;
  let to = 1;
  let since = performance.now();
  let ms = 3000;
  const resizeTo = (target: number, duration: number) => {
    [from, to, since, ms] = [size, target, performance.now(), duration];
  };
  const draw = createRenderer(canvas);
  // Count from this run's start: the ring turns faster inside, so a large time would wind it into noise.
  const start = performance.now();
  const frame = (now: number) => {
    if (!canvas.isConnected) return;
    size = from + (to - from) * easeInOut(clamp01((now - since) / ms));
    draw?.((now - start) / 1000, size);
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
  canvas.animate(
    { opacity: [0, 1] },
    { duration: 1500, easing: "ease-in-out" },
  );

  const cx = innerWidth / 2;
  const cy = innerHeight / 2;
  const targets = document.querySelectorAll<HTMLElement>(
    "header > *, footer, h1, h1 + *, [data-slot=card]",
  );
  const flights = [...targets].map((el) => {
    const r = el.getBoundingClientRect();
    const x = r.left + r.width / 2 - cx;
    const y = r.top + r.height / 2 - cy;
    const keyframes = trajectory(x, y, Math.max(r.width, r.height));
    const anim = el.animate(keyframes, {
      duration: DURATION,
      delay: 1200 + Math.hypot(x, y) / 4,
      fill: "both",
    });
    return { el, keyframes, anim };
  });

  await Promise.all(flights.map((f) => f.anim.finished));
  resizeTo(1.2, 800);
  await new Promise((resolve) => setTimeout(resolve, 900));

  // Play everything back; the canvas fades as the last elements land. These are new animations with the
  // frames reversed: playing the finished ones backwards makes Chrome flash their first frame.
  const back = DURATION / 1.5;
  const anims = flights.map(({ el, keyframes, anim }) => {
    anim.cancel();
    return el.animate([...keyframes].reverse(), {
      duration: back,
      fill: "both",
    });
  });
  resizeTo(0, back);
  const fade = canvas.animate(
    { opacity: [1, 0] },
    { duration: 1200, delay: back - 1200, easing: "ease-in", fill: "forwards" },
  );
  await Promise.all([...anims, fade].map((a) => a.finished));
  anims.forEach((a) => a.cancel());
  canvas.remove();
}

// Returns a draw(time, size) function, or null when WebGL2 is unavailable (the canvas then stays plain black).
function createRenderer(canvas: HTMLCanvasElement) {
  // Software rendering would take ~0.5s per frame, so fall back to plain black instead.
  const gl = canvas.getContext("webgl2", {
    failIfMajorPerformanceCaveat: true,
  });
  if (!gl) return null;
  const program = gl.createProgram();
  for (const [type, source] of [
    [gl.VERTEX_SHADER, VERT],
    [gl.FRAGMENT_SHADER, FRAG],
  ] as const) {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const shaders = gl.getAttachedShaders(program) ?? [];
    console.error(
      gl.getProgramInfoLog(program),
      ...shaders.map((s) => gl.getShaderInfoLog(s)),
    );
    return null;
  }
  gl.useProgram(program);
  gl.uniform2f(
    gl.getUniformLocation(program, "uRes"),
    canvas.width,
    canvas.height,
  );
  const time = gl.getUniformLocation(program, "uTime");
  const size = gl.getUniformLocation(program, "uSize");
  return (t: number, s: number) => {
    gl.uniform1f(time, t);
    gl.uniform1f(size, s);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
}

// Drift in slowly and get pulled onto a circle that leans back, so elements swing towards and away from
// the viewer. Then spiral in: angular speed grows as the radius shrinks, and at the edge of the dark
// centre everything stretches towards it, slows to a halt, reddens and fades.
function trajectory(x: number, y: number, size: number): Keyframe[] {
  const camera = innerHeight * 1.5; // perspective distance
  const edge = innerHeight * 0.13; // on-screen radius of the dark centre
  const rCircle = innerHeight * (0.3 + Math.random() * 0.08);
  const small = Math.min(0.3, (innerHeight * 0.15) / size); // wide bars end up card-sized
  // Slightly different circles and speeds, so elements spread out instead of moving as one block.
  const tilt = TILT + (Math.random() - 0.5) * 0.4;
  const turns = TURNS * (0.6 + Math.random() * 0.8);
  const theta0 = Math.atan2(y / Math.cos(tilt), x);
  const steps = Array.from({ length: 91 }, (_, i) => {
    const s = i / 90;
    const pull = easeInOut(Math.min(1, s / 0.45));
    const fall = s < 0.65 ? 0 : easeInOut((s - 0.65) / 0.35);
    const r = rCircle + (edge - rCircle) * fall;
    const spin = Math.min(1, s / 0.25) * r ** -1.5 * (1 - fall ** 3);
    return { pull, fall, r, spin };
  });
  const total = steps.reduce((sum, p) => sum + p.spin, 0) - steps[0].spin;
  let turned = -steps[0].spin;
  return steps.map(({ pull, fall, r, spin }) => {
    turned += spin;
    const da = (turned / total) * turns * 2 * Math.PI;
    const a = theta0 + da;
    // Blend from the starting spot to the point on the leaning circle.
    const px = x + (r * Math.cos(a) - x) * pull;
    const py = y + (r * Math.sin(a) * Math.cos(tilt) - y) * pull;
    const pz = r * Math.sin(a) * Math.sin(tilt) * pull;
    const near = camera / (camera - pz);
    const stretch = 1 + 1.5 * fall ** 2;
    const red = clamp01((fall - 0.2) / 0.6);
    return {
      transform:
        `translate(${px * near - x}px, ${py * near - y}px) ` +
        `scale(${near * (1 - (1 - small) * pull) * (1 - 0.7 * fall)}) ` +
        `perspective(${camera}px) rotateX(${tilt * 0.8 * pull}rad) ` +
        // Stretch along the pull, in the plane of the circle.
        `rotate(${a}rad) scale(${stretch}, ${1 / stretch}) rotate(${-a}rad) ` +
        `rotate(${da * 0.2}rad)`,
      filter: `sepia(${red}) saturate(${1 + 4 * red}) hue-rotate(${-40 * red}deg) brightness(${1 - 0.5 * red})`,
      opacity: 1 - clamp01((fall - 0.7) / 0.3),
    };
  });
}

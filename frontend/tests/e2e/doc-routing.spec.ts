import { test, expect } from "@playwright/test";

test.use({ baseURL: "http://localhost:8080" });

test.describe("Doc URL rewriting (.htaccess)", () => {
  test("falls through to the Astro app for an extensionless legacy-doc path with no matching static file", async ({
    request,
  }) => {
    const response = await request.get("/doc/7.0/en/readme");
    const body = await response.text();
    expect(response.status()).toBe(200);
    expect(body).toContain("<title>");
    expect(body).not.toBe("7.0 readme");
  });

  test("serves the static file directly when it exists at the exact rewritten path", async ({
    request,
  }) => {
    const response = await request.get("/doc/7.0/en/ReadMe.html");
    expect(response.status()).toBe(200);
    expect(await response.text()).toBe("7.0 readme");
  });

  test("returns 404 for an unknown doc version", async ({ request }) => {
    const response = await request.get("/doc/99.9");
    expect(response.status()).toBe(404);
  });
});

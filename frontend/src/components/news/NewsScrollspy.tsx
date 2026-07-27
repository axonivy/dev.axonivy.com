import { useState, useEffect, useRef } from "react";

interface Section {
  id: string;
  title: string;
}

interface Props {
  sections: Section[];
}

export default function NewsScrollspy({ sections }: Props) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");
  const [indicator, setIndicator] = useState({ top: 0, height: 0 });
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const suppressObserverRef = useRef(false);
  const suppressTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (sections.length === 0) return;

    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !suppressObserverRef.current) {
            setActiveId(id);
          }
        },
        { rootMargin: "-20% 0% -70% 0%", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  // Measure the active item's position relative to the list
  useEffect(() => {
    const list = listRef.current;
    const item = itemRefs.current.get(activeId);
    if (!list || !item) return;

    const listTop = list.getBoundingClientRect().top;
    const itemRect = item.getBoundingClientRect();
    setIndicator({
      top: itemRect.top - listTop,
      height: itemRect.height,
    });
  }, [activeId]);

  return (
    <nav aria-label="Article sections">
      <div className="relative flex gap-3">
        {/* Track line */}
        <div className="relative w-px self-stretch">
          <div className="absolute inset-0 bg-(--n200)" />
          {/* Active indicator */}
          <div
            className="absolute w-px bg-(--p300) transition-all duration-300"
            style={{
              top: `${indicator.top}px`,
              height: `${indicator.height}px`,
            }}
          />
        </div>

        {/* Text list */}
        <ul ref={listRef} className="flex flex-col flex-1">
          {sections.map(({ id, title }) => (
            <li
              key={id}
              ref={(el) => {
                if (el) itemRefs.current.set(id, el);
                else itemRefs.current.delete(id);
              }}
            >
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  suppressObserverRef.current = true;
                  if (suppressTimeoutRef.current)
                    clearTimeout(suppressTimeoutRef.current);
                  suppressTimeoutRef.current = setTimeout(() => {
                    suppressObserverRef.current = false;
                  }, 1000);
                  const el = document.getElementById(id);
                  if (el)
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  setActiveId(id);
                  history.pushState(null, "", `#${id}`);
                }}
                className={`flex items-center py-1.5 text-sm transition-colors ${
                  activeId === id
                    ? "text-(--body) font-medium"
                    : "text-(--n800) hover:text-(--body)"
                }`}
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// jsdom does not implement matchMedia; components like ModeToggle rely on it.
window.matchMedia ??= vi
  .fn()
  .mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

// jsdom does not implement IntersectionObserver; components like ScrollSpy rely on it.
class IntersectionObserverMock {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}
window.IntersectionObserver ??=
  IntersectionObserverMock as unknown as typeof IntersectionObserver;

afterEach(() => {
  cleanup();
});

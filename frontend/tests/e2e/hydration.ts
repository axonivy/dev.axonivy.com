import { expect, type Page } from "@playwright/test";

// pages are prerendered, so content is visible before React is interactive;
// Astro removes the ssr attribute from an island once it has hydrated
export async function waitForHydration(page: Page) {
  await expect(page.locator("astro-island[ssr]")).toHaveCount(0);
}

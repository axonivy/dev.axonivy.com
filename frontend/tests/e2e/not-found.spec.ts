import { expect, test } from "@playwright/test";

test("localizes the not-found page and its home link", async ({ page }) => {
  await page.goto("/de/404");

  await expect(page).toHaveTitle("Axon Ivy Developer - Seite nicht gefunden");
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page.getByRole("heading", { name: "Hoppla!" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Zurück zur Startseite" }),
  ).toHaveAttribute("href", "/de");

  await page.goto("/404");

  await expect(page).toHaveTitle("Axon Ivy Developer - 404 Error");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(
    page.getByRole("link", { name: "Back to homepage" }),
  ).toHaveAttribute("href", "/");
});

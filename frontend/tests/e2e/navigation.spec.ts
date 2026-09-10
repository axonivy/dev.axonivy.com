import { test, expect } from "@playwright/test";

test.describe("Site navigation", () => {
  test("navigates from the homepage to Download via the navbar", async ({
    page,
  }) => {
    await page.goto("/");
    const nav = page.getByRole("banner");
    await nav.getByRole("link", { name: "Download", exact: true }).click();
    await expect(page).toHaveURL("/download");
    await expect(page.getByText("Failed to load")).toHaveCount(0);
  });

  test("navigates from the homepage to Documentation overview via the navbar", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const nav = page.getByRole("banner");
    await nav
      .getByRole("button", { name: "Documentation", exact: true })
      .hover();
    await page.getByRole("link", { name: "Overview" }).click();
    await expect(page).toHaveURL("/doc");
    await expect(page.getByText("Failed to load")).toHaveCount(0);
  });
});

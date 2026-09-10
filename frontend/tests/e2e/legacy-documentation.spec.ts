import { test, expect } from "@playwright/test";

const VERSION = "7.0";
const DATA_TIMEOUT = 15000;

test.describe("Legacy documentation", () => {
  test("loads real data from the live backend and renders the viewer", async ({
    page,
  }) => {
    await page.goto(`/doc/${VERSION}`);
    await expect(
      page.getByRole("heading", { name: `Documentation ${VERSION}` }),
    ).toBeVisible({ timeout: DATA_TIMEOUT });
    await expect(
      page.getByRole("button", { name: "ReadMe", exact: true }),
    ).toBeVisible();

    const iframe = page.locator(`iframe[title="${VERSION}"]`);
    await expect(iframe).toBeVisible();
    await expect(iframe).toHaveAttribute("src", /.+/);
  });

  test("navigates to a document, updates the URL, and the browser back button returns", async ({
    page,
  }) => {
    await page.goto(`/doc/${VERSION}`);
    const readMeButton = page.getByRole("button", {
      name: "ReadMe",
      exact: true,
    });
    await readMeButton.waitFor({ timeout: DATA_TIMEOUT });
    await readMeButton.click();
    await expect(page).toHaveURL(`/doc/${VERSION}/en/readme`);
    await expect(
      page.getByRole("button", { name: "ReadMe", exact: true }),
    ).toHaveClass(/font-semibold/);

    await page.goBack();
    await expect(page).toHaveURL(`/doc/${VERSION}`);
  });

  test("injects a parent-targeted base tag into the loaded iframe", async ({
    page,
  }) => {
    await page.goto(`/doc/${VERSION}`);
    const frame = page.frameLocator(`iframe[title="${VERSION}"]`);
    await expect(frame.locator('base[target="_parent"]')).toHaveCount(1, {
      timeout: DATA_TIMEOUT,
    });
  });
});

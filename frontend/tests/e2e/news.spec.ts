import { expect, test } from "@playwright/test";

test("renders a semantic timeline and opens release details", async ({
  page,
}) => {
  await page.goto("/news");

  const timelineItems = page.locator("ol > li");
  const detailLinks = page.getByRole("link", { name: "View Details" });
  const itemCount = await timelineItems.count();
  expect(itemCount).toBeGreaterThan(0);
  await expect(detailLinks).toHaveCount(itemCount);

  const dates = timelineItems.locator("time");
  await expect(dates).toHaveCount(itemCount);
  for (let index = 0; index < itemCount; index++) {
    await expect(dates.nth(index)).toHaveAttribute(
      "datetime",
      /\d{4}-\d{2}-\d{2}/,
    );
  }

  const firstHref = await detailLinks.first().getAttribute("href");
  expect(firstHref).toMatch(/^\/news\//);
  const allHrefs = await detailLinks.evaluateAll((links) =>
    links.map((link) => link.getAttribute("href")),
  );
  expect(new Set(allHrefs).size).toBe(itemCount);

  await detailLinks.first().click();
  await expect(page).toHaveURL(firstHref!);
  await expect(
    page.getByRole("link", { name: /^Download$/ }).last(),
  ).toHaveAttribute("href", /.+/);
  await expect(
    page.getByRole("link", { name: /Migration Guide/ }),
  ).toHaveAttribute("href", /.+/);
});

test("navigates release sections with the scroll spy", async ({ page }) => {
  await page.goto("/news");
  const detailHref = await page
    .getByRole("link", { name: "View Details" })
    .first()
    .getAttribute("href");
  await page.goto(detailHref!);

  const sectionLinks = page.locator('[data-slot="scroll-spy-link"]');
  expect(await sectionLinks.count()).toBeGreaterThan(1);
  const targetLink = sectionLinks.nth(1);
  const targetId = (await targetLink.getAttribute("href"))!.slice(1);

  await targetLink.click();
  await expect(page.locator(`#${targetId}`)).toBeInViewport();
});

import type { UiDocResponse } from "@/components/documentation/documentation";
import { expect, test, type APIRequestContext } from "@playwright/test";

async function documentationData(request: APIRequestContext) {
  const response = await request.get("/ui/doc");
  expect(response.ok()).toBeTruthy();
  return (await response.json()) as UiDocResponse;
}

test("renders only populated documentation sections", async ({
  page,
  request,
}) => {
  const data = await documentationData(request);
  await page.goto("/doc");

  await expect(
    page.getByRole("heading", { name: "LTS - Long Term Support" }),
  ).toHaveCount(data.docLinksLTS.length > 0 ? 1 : 0);
  await expect(
    page.getByRole("heading", { name: "LE - Leading Edge" }),
  ).toHaveCount(data.docLinksLE.length > 0 ? 1 : 0);
  await expect(
    page.getByRole("heading", { name: "Development build" }),
  ).toHaveCount(data.docLinksDev.length > 0 ? 1 : 0);
});

test("sorts LTS versions and assigns their lifecycle badges", async ({
  page,
  request,
}) => {
  const data = await documentationData(request);
  const expectedVersions = data.docLinksLTS
    .map(({ version }) => version)
    .sort((first, second) =>
      second.localeCompare(first, undefined, { numeric: true }),
    );

  await page.goto("/doc");
  const ltsSection = page
    .getByRole("heading", { name: "LTS - Long Term Support" })
    .locator("xpath=..");
  await expect(ltsSection.getByRole("heading", { level: 5 })).toHaveCount(
    expectedVersions.length,
  );
  expect(
    await ltsSection.getByRole("heading", { level: 5 }).allTextContents(),
  ).toEqual(expectedVersions.map((version) => `Version ${version}`));

  for (const [index, version] of expectedVersions.entries()) {
    const versionHeader = ltsSection
      .getByRole("heading", { name: `Version ${version}` })
      .locator("xpath=..");
    await expect(versionHeader).toContainText(
      index === 0 ? "Stable" : "Maintenance",
    );
  }
});

test("renders backend links and removes news from development builds", async ({
  page,
  request,
}) => {
  const data = await documentationData(request);
  const firstLts = data.docLinksLTS[0];
  const documentationLink = firstLts.links.find(({ text }) =>
    text.toLowerCase().includes("documentation"),
  );
  expect(documentationLink).toBeTruthy();

  await page.goto("/doc");
  const ltsSection = page
    .getByRole("heading", { name: "LTS - Long Term Support" })
    .locator("xpath=..");
  const versionGroup = ltsSection
    .getByRole("heading", { name: `Version ${firstLts.version}` })
    .locator("xpath=../..");
  await expect(
    versionGroup.getByRole("link", { name: "Documentation" }),
  ).toHaveAttribute("href", documentationLink!.url);

  if (data.docLinksDev.length > 0) {
    const devSection = page
      .getByRole("heading", { name: "Development build" })
      .locator("xpath=..");
    await expect(
      devSection.locator('a[href*="new-and-noteworthy"]'),
    ).toHaveCount(0);
  }
});

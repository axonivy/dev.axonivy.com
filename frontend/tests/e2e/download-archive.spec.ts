import type { ArchiveResponse } from "@/components/download/archive";
import {
  expect,
  test,
  type APIRequestContext,
  type Page,
} from "@playwright/test";

async function archiveData(request: APIRequestContext, path = "/ui/archive") {
  const response = await request.get(path);
  expect(response.ok()).toBeTruthy();
  return (await response.json()) as ArchiveResponse;
}

async function visibleTables(page: Page) {
  const tables = page.getByRole("table");
  await expect(tables).toHaveCount(1);
  return tables.first();
}

test("shows current releases and switches to dev releases", async ({
  page,
  request,
}) => {
  const current = await archiveData(request);
  const unstable = await archiveData(request, "/ui/archive/unstable");
  const expectedCurrentVersions = current.releaseInfos.map(
    (release) => release.version,
  );
  const expectedDevVersions = unstable.releaseInfos.map(
    (release) => release.version,
  );

  await page.goto("/download");
  const archiveTable = await visibleTables(page);

  await expect(archiveTable.locator("tbody tr td:first-child")).toHaveText(
    expectedCurrentVersions,
  );

  await page.getByRole("button", { name: "Dev" }).click();
  await expect(archiveTable.locator("tbody tr")).toHaveCount(
    expectedDevVersions.length,
  );
  await expect(archiveTable.locator("tbody tr td:first-child")).toHaveText(
    expectedDevVersions,
  );
});

test("shows slim artifacts and their footnote", async ({ page }) => {
  await page.goto("/download");
  const archiveTable = await visibleTables(page);
  const firstRow = archiveTable.locator("tbody tr").first();

  await expect(
    firstRow
      .locator("td")
      .nth(2)
      .getByRole("link", { name: /All Slim/ }),
  ).toBeVisible();
  await expect(
    page.getByText(/This version is similar to the 'All' product/),
  ).toBeVisible();
});

test("shows an external archive link when 'Older Versions' is selected", async ({
  page,
  request,
}) => {
  const current = await archiveData(request);
  const hasOlderVersions = Object.keys(current.categorizedVersions).includes(
    "UNSUPPORTED",
  );
  test.skip(!hasOlderVersions, "backend has no UNSUPPORTED versions right now");

  await page.goto("/download");
  await visibleTables(page);
  await page.getByRole("combobox").selectOption("older");

  await expect(
    page.getByRole("link", { name: /archive page/i }),
  ).toHaveAttribute("href", "https://archive.axonivy.com/");
  await expect(page.getByRole("table")).toHaveCount(0);
});

test("loads a selected archive version from the backend", async ({
  page,
  request,
}) => {
  const current = await archiveData(request);
  const selectedVersion = Object.entries(current.categorizedVersions)
    .filter(
      ([category]) =>
        category !== "Long Term Support" && category !== "unstable",
    )
    .flatMap(([, versions]) => versions)
    .map(({ id }) => id)
    .find((id) => id !== current.currentMajorVersion);
  if (!selectedVersion) {
    throw new Error("The backend returned no selectable archive version");
  }
  const selected = await archiveData(
    request,
    `/ui/archive/${encodeURIComponent(selectedVersion)}`,
  );
  const expectedVersions = selected.releaseInfos.map(
    (release) => release.version,
  );

  await page.goto("/download");
  await visibleTables(page);
  await page.getByRole("combobox").selectOption(selectedVersion);

  const archiveTable = await visibleTables(page);
  await expect(archiveTable.locator("tbody tr")).toHaveCount(
    expectedVersions.length,
  );
  await expect(archiveTable.locator("tbody tr td:first-child")).toHaveText(
    expectedVersions,
  );
});

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
  await expect(tables).toHaveCount(2);
  return { devTable: tables.nth(0), archiveTable: tables.nth(1) };
}

test("shows filtered engine releases in descending order", async ({
  page,
  request,
}) => {
  const current = await archiveData(request);
  const unstable = await archiveData(request, "/ui/archive/unstable");
  const expectedDevVersions = unstable.releaseInfos
    .filter((release) => release.engineArtifacts.length > 0)
    .map((release) => release.version)
    .sort((first, second) => second.localeCompare(first));
  const expectedArchiveVersions = current.releaseInfos
    .filter((release) => release.engineArtifacts.length > 0)
    .map((release) => release.version);

  await page.goto("/download");
  const { devTable, archiveTable } = await visibleTables(page);

  await expect(devTable.locator("tbody tr")).toHaveCount(
    expectedDevVersions.length,
  );
  expect(
    await devTable.locator("tbody tr td:first-child").allTextContents(),
  ).toEqual(expectedDevVersions);
  expect(
    await archiveTable.locator("tbody tr td:first-child").allTextContents(),
  ).toEqual(expectedArchiveVersions);
  await expect(devTable.locator("thead")).toHaveText(/Slim/);
  await expect(archiveTable.locator("thead")).toHaveText(/Slim/);
});

test("orders archive artifacts by their user-facing categories, routing slim artifacts to their own column", async ({
  page,
}) => {
  await page.goto("/download");
  const { archiveTable } = await visibleTables(page);
  const firstRow = archiveTable.locator("tbody tr").first();
  const artifactLabels = await firstRow
    .locator("td")
    .nth(2)
    .getByRole("link")
    .allTextContents();
  const categoryOrder = [
    "All",
    "Debian",
    "Docker",
    "Linux",
    "macOS",
    "Windows",
    "VS Code",
  ];

  expect(artifactLabels).toEqual(
    [...artifactLabels].sort(
      (first, second) =>
        categoryOrder.indexOf(first.trim()) -
        categoryOrder.indexOf(second.trim()),
    ),
  );

  const slimLinks = firstRow.locator("td").nth(3).getByRole("link");
  await expect(slimLinks.first()).toBeVisible();
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
  await expect(page.getByRole("table")).toHaveCount(1);
});

test("switches both tables to Designer without refetching", async ({
  page,
  request,
}) => {
  const current = await archiveData(request);
  const unstable = await archiveData(request, "/ui/archive/unstable");
  const expectedDevVersions = unstable.releaseInfos
    .filter((release) => release.designerArtifacts.length > 0)
    .map((release) => release.version)
    .sort((first, second) => second.localeCompare(first));
  const expectedArchiveVersions = current.releaseInfos
    .filter((release) => release.designerArtifacts.length > 0)
    .map((release) => release.version);
  const archiveRequests: string[] = [];
  page.on("request", (pageRequest) => {
    if (new URL(pageRequest.url()).pathname.startsWith("/ui/archive")) {
      archiveRequests.push(pageRequest.url());
    }
  });

  await page.goto("/download");
  const { devTable, archiveTable } = await visibleTables(page);
  const requestsBeforeSwitch = archiveRequests.length;
  const designerButton = page.getByRole("button", {
    name: "Designer Versions",
  });
  await designerButton.click();
  await expect(designerButton).toHaveClass(/bg-primary/);
  await expect(
    page.getByRole("button", { name: "Engine Versions" }),
  ).not.toHaveClass(/bg-primary/);
  await expect(devTable.locator("tbody")).not.toHaveText(/Slim/);
  await expect(archiveTable.locator("tbody")).not.toHaveText(/Slim/);

  await expect(devTable.locator("tbody tr")).toHaveCount(
    expectedDevVersions.length,
  );
  expect(
    await devTable.locator("tbody tr td:first-child").allTextContents(),
  ).toEqual(expectedDevVersions);
  expect(
    await archiveTable.locator("tbody tr td:first-child").allTextContents(),
  ).toEqual(expectedArchiveVersions);
  expect(archiveRequests).toHaveLength(requestsBeforeSwitch);
});

test("loads a selected archive version from the backend", async ({
  page,
  request,
}) => {
  const current = await archiveData(request);
  const selectedVersion = Object.values(current.categorizedVersions)
    .flat()
    .map(({ id }) => id)
    .find((id) => id !== current.currentMajorVersion && id !== "unstable");
  if (!selectedVersion) {
    throw new Error("The backend returned no selectable archive version");
  }
  const selected = await archiveData(
    request,
    `/ui/archive/${encodeURIComponent(selectedVersion)}`,
  );
  const expectedVersions = selected.releaseInfos
    .filter((release) => release.engineArtifacts.length > 0)
    .map((release) => release.version);

  await page.goto("/download");
  await visibleTables(page);
  await page.getByRole("combobox").selectOption(selectedVersion);

  const { archiveTable } = await visibleTables(page);
  await expect(archiveTable.locator("tbody tr")).toHaveCount(
    expectedVersions.length,
  );
  expect(
    await archiveTable.locator("tbody tr td:first-child").allTextContents(),
  ).toEqual(expectedVersions);
});

import { expect, test, type APIRequestContext } from "@playwright/test";

type Artifact = { name: string; url: string; permalink: string };
type DownloadRelease = {
  versionShort: string;
  designerArtifacts: Artifact[];
  engineArtifacts: Artifact[];
};
type DownloadResponse = {
  ltsCurrent: DownloadRelease[];
  ltsMaintenance: DownloadRelease[];
  le: DownloadRelease[];
};

async function downloadData(request: APIRequestContext) {
  const response = await request.get("/ui/download");
  expect(response.ok()).toBeTruthy();
  return (await response.json()) as DownloadResponse;
}

test("prioritizes Docker and updates the selected engine artifact", async ({
  page,
  request,
}) => {
  const current = (await downloadData(request)).ltsCurrent[0];
  const docker = current.engineArtifacts.find(({ name }) => name === "Docker");
  const selectableArtifact = current.engineArtifacts.find(
    ({ name }) => name !== "Docker",
  );
  expect(docker).toBeTruthy();
  expect(selectableArtifact).toBeTruthy();

  await page.goto("/download");
  const engineCard = page
    .getByText(`Axon Ivy Engine ${current.versionShort}`, { exact: true })
    .locator("xpath=ancestor::*[@data-user-os][1]");
  await expect(
    engineCard.getByRole("button", { name: "Docker" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    engineCard.getByRole("link", { name: /Install Engine .* via Docker/ }),
  ).toHaveAttribute(
    "href",
    `/download/installation/docker?downloadUrl=${docker!.url}`,
  );

  await engineCard
    .getByRole("button", { name: selectableArtifact!.name })
    .click();
  await expect(
    engineCard.getByRole("button", { name: selectableArtifact!.name }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    engineCard.getByRole("link", { name: /Download Engine/ }),
  ).toHaveAttribute("href", selectableArtifact!.url);
});

test("shows real permalinks for downloadable engine artifacts", async ({
  page,
  request,
}) => {
  const current = (await downloadData(request)).ltsCurrent[0];
  const artifactsWithPermalinks = current.engineArtifacts.filter(
    ({ permalink }) => permalink,
  );
  expect(artifactsWithPermalinks.length).toBeGreaterThan(0);

  await page.goto("/download");
  const engineCard = page
    .getByText(`Axon Ivy Engine ${current.versionShort}`, { exact: true })
    .locator("xpath=ancestor::*[@data-user-os][1]");
  await engineCard.getByRole("button", { name: "Permalinks" }).click();

  for (const artifact of artifactsWithPermalinks) {
    await expect(
      engineCard.getByRole("link", { name: artifact.permalink }),
    ).toHaveAttribute("href", artifact.permalink);
  }
});

test("uses the artifact for the VS Code installation flow", async ({
  page,
  request,
}) => {
  const current = (await downloadData(request)).ltsCurrent[0];
  const extension = current.designerArtifacts.find(
    ({ name }) => name === "VS Code Extension",
  );
  expect(extension).toBeTruthy();

  await page.goto("/download");
  const designerCard = page
    .getByText(`Axon Ivy Designer ${current.versionShort}`, { exact: true })
    .locator("xpath=ancestor::*[@data-user-os][1]");
  await expect(
    designerCard.getByRole("link", {
      name: /Install Designer using VS Code Marketplace/,
    }),
  ).toHaveAttribute("href", new RegExp(encodeURIComponent(extension!.url)));
});

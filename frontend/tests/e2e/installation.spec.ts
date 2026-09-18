import { expect, test } from "@playwright/test";

test("renders a Designer guide with its download URL and steps", async ({
  page,
}) => {
  const downloadUrl = "https://download.example/designer.zip";
  await page.goto(
    `/download/installation/designer-windows?downloadUrl=${encodeURIComponent(downloadUrl)}`,
  );

  await expect(
    page.getByRole("heading", {
      name: "Install Axon Ivy Designer for Windows",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", {
      name: "Download the Axon Ivy Designer to your desired location",
    }),
  ).toHaveAttribute("href", "#step-1");
  await expect(
    page.getByRole("link", { name: "Download Axon Ivy Designer" }),
  ).toHaveAttribute("href", downloadUrl);
  await expect(page.getByText("We're here to help")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Go to Tutorials" }),
  ).toHaveAttribute("href", "https://www.axonivy.com/tutorials");
  await expect(
    page.getByRole("link", { name: "Go to Documentation" }),
  ).toHaveAttribute("href", "/doc");
});

test("renders the Mac engine guide's hint box and 'for' suffix", async ({
  page,
}) => {
  await page.goto("/download/installation/designer-mac");
  await expect(page.getByText(/for macOs/)).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Mac Designer for Ventura and older" }),
  ).toBeVisible();
});

test("builds the engine Getting Started link from the docLink query param", async ({
  page,
}) => {
  await page.goto("/download/installation/engine?docLink=%2Fdoc%2F12.0%2Fen");
  await expect(
    page.getByRole("link", { name: "Getting Started" }),
  ).toHaveAttribute(
    "href",
    "http://localhost:4321/doc/12.0/en/engine-guide/getting-started/index.html",
  );
});

test("renders Docker-specific guidance instead of a generic substep", async ({
  page,
  context,
  browserName,
  baseURL,
}) => {
  const downloadUrl = "https://hub.docker.com/r/axonivy/axonivy-engine";
  await page.goto(
    `/download/installation/docker?downloadUrl=${encodeURIComponent(downloadUrl)}`,
  );

  await expect(
    page.getByRole("heading", { name: "Install Axon Ivy Engine for Docker" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Docker", exact: true }).first(),
  ).toHaveAttribute("href", downloadUrl);
  await expect(
    page.getByRole("link", { name: "Official guide", exact: true }),
  ).toHaveAttribute("href", "https://docs.docker.com/get-started/get-docker/");
  await expect(
    page.getByText(/docker pull axonivy\/axonivy-engine/),
  ).toBeVisible();
  const copyButton = page.getByRole("button", { name: "Copy command" });
  await expect(copyButton).toBeVisible();
  await expect(page.getByText(/^2\.1 /)).toHaveCount(0);

  if (browserName === "chromium") {
    await context.grantPermissions(["clipboard-write", "clipboard-read"], {
      origin: baseURL,
    });
    await copyButton.click();
    await expect(
      page.getByRole("button", { name: "Command copied" }),
    ).toBeVisible();
  }

  await expect(
    page.getByRole("link", { name: "Getting Started with Docker" }),
  ).toHaveAttribute(
    "href",
    "https://dev.axonivy.com/doc/12.0/en/engine-guide/getting-started/docker/index.html",
  );
});

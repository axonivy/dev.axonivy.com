import { IconCheck, IconCopy } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Base, Code } from "@/components/ui/typography";
import { CURRENT_VERSION } from "@/data/global-variables";

export function DockerCommandBlock({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  async function copyCommand() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col gap-4">
      <Base>
        <span className="font-semibold">Note:</span> This Docker image version
        defaults to the latest LTS release. To use a different version, replace{" "}
        <Code>{CURRENT_VERSION}</Code> in the commands above with your desired
        version.
      </Base>
      <div className="bg-n100 text-n900 flex items-start justify-between gap-4 rounded-md p-4">
        <code className="font-code min-w-0 flex-1 text-sm wrap-break-word whitespace-pre-line">
          {command}
        </code>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={copyCommand}
          aria-label={copied ? "Command copied" : "Copy command"}
        >
          {copied ? (
            <IconCheck className="size-4" aria-hidden="true" />
          ) : (
            <IconCopy className="size-4" aria-hidden="true" />
          )}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <Base className="text-n900">
        Now you can access your engine on{" "}
        <a href="http://localhost:8080/" className="text-primary">
          localhost:8080
        </a>
        .
      </Base>
    </div>
  );
}

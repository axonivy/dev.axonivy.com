import { IconCheck, IconCopy } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Base, Code } from "@/components/ui/typography";
import "@/translation/ui";
import type { Lang } from "@/translation/ui";
import { Trans, useTranslation } from "react-i18next";

export function DockerCommandBlock({
  command,
  currentVersion,
  lang,
}: {
  command: string;
  currentVersion: string;
  lang: Lang;
}) {
  const { t } = useTranslation(undefined, { lng: lang });
  const [copied, setCopied] = useState(false);

  async function copyCommand() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col gap-4">
      <Base>
        <Trans
          i18nKey="installation.docker.note"
          t={t}
          values={{ version: currentVersion }}
          components={{
            bold: <span className="font-semibold" />,
            code: <Code>{currentVersion}</Code>,
          }}
        />
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
          aria-label={
            copied
              ? t("installation.docker.commandCopied")
              : t("installation.docker.copyCommand")
          }
        >
          {copied ? (
            <IconCheck className="size-4" aria-hidden="true" />
          ) : (
            <IconCopy className="size-4" aria-hidden="true" />
          )}
          {copied
            ? t("installation.docker.copied")
            : t("installation.docker.copy")}
        </Button>
      </div>
      <Base className="text-n900">
        <Trans
          i18nKey="installation.docker.access"
          t={t}
          components={{
            localhost: (
              <a href="http://localhost:8080/" className="text-primary" />
            ),
          }}
        />
      </Base>
    </div>
  );
}

import {
  IconBrandApple,
  IconBrandDocker,
  IconBrandUbuntu,
  IconBrandWindows,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import type {
  ArtifactOption,
  Product,
} from "@/components/download/download-artifacts";

type ArtifactPickerProps = {
  product: Product;
  options: ArtifactOption[];
  selectedPermalink?: string;
  isDesigner: boolean;
  onSelect: (permalink: string) => void;
};

function OsIcon({ os }: { os: string }) {
  const normalized = os.toLowerCase();
  if (normalized.includes("windows")) {
    return <IconBrandWindows className="size-6 shrink-0" aria-hidden="true" />;
  }
  if (normalized.includes("macos")) {
    return <IconBrandApple className="size-6 shrink-0" aria-hidden="true" />;
  }
  if (normalized.includes("linux")) {
    return <IconBrandUbuntu className="size-6 shrink-0" aria-hidden="true" />;
  }
  if (normalized.includes("docker")) {
    return <IconBrandDocker className="size-6 shrink-0" aria-hidden="true" />;
  }
  return null;
}

function OsOptionLabel({ label }: { label: string }) {
  if (label !== "Linux / macOS") {
    return <span className="hidden font-medium sm:inline">{label}</span>;
  }

  return (
    <span className="flex items-center gap-1 font-medium">
      <IconBrandUbuntu className="size-6 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline">Linux</span>
      <span className="text-n600">/</span>
      <IconBrandApple className="size-6 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline">macOS</span>
    </span>
  );
}

export function ArtifactPicker({
  product,
  options,
  selectedPermalink,
  isDesigner,
  onSelect,
}: ArtifactPickerProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {options.map(({ artifact, label }) => {
        const isSelected = artifact.permalink === selectedPermalink;

        return (
          <Button
            key={`${product}-${artifact.name}`}
            type="button"
            aria-label={label}
            aria-pressed={isSelected}
            onClick={() => onSelect(artifact.permalink)}
            variant={isSelected ? "accent" : "outline"}
            className={`h-auto flex-row items-center justify-center gap-1 p-2 ${
              isSelected ? "border-primary" : ""
            }`}
          >
            {label === "Linux / macOS" ? (
              <OsOptionLabel label={label} />
            ) : (
              <OsIcon os={label} />
            )}
            {isDesigner && (
              <span className="hidden font-medium sm:inline">
                {artifact.name}
              </span>
            )}
            {!isDesigner && label !== "Linux / macOS" && (
              <OsOptionLabel label={label} />
            )}
          </Button>
        );
      })}
    </div>
  );
}

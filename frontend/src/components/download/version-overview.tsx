import { useState } from "react";
import { IconDashboard, IconTools } from "@tabler/icons-react";
import Archive from "@/components/download/archive";
import DevReleases from "@/components/download/dev-releases";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { ArchiveProduct } from "@/components/download/archive";
import { H3, H5 } from "@/components/ui/typography";

export default function VersionOverview() {
  const [product, setProduct] = useState<ArchiveProduct>("designer");

  return (
    <div className="bg-n50 flex flex-col gap-6 rounded-2xl p-4 md:p-10">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
        <div className="flex flex-col gap-4">
          <H3>Version and Download Options</H3>
          <H5 className="text-n900 font-normal">
            Explore some older versions and dev releases of the designer and
            engine.
          </H5>
        </div>
        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
          <Button
            size="lg"
            variant={product === "designer" ? "default" : "outline"}
            onClick={() => setProduct("designer")}
          >
            <IconTools className="size-4" /> Designer Versions
          </Button>
          <Button
            size="lg"
            variant={product === "engine" ? "default" : "outline"}
            onClick={() => setProduct("engine")}
          >
            <IconDashboard className="size-4" /> Engine Versions
          </Button>
        </div>
      </div>
      <DevReleases product={product} />
      <Separator />
      <div className="flex flex-col gap-6">
        <Archive product={product} />
      </div>
    </div>
  );
}

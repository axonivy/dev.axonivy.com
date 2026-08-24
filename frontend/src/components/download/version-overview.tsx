import { useState } from "react";
import { IconDashboard, IconTools } from "@tabler/icons-react";
import Archive from "@/components/download/archive";
import DevReleases from "@/components/download/dev-releases";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { ArchiveProduct } from "@/components/download/archive";

export default function VersionOverview() {
  const [product, setProduct] = useState<ArchiveProduct>("designer");

  return (
    <div className="flex flex-col p-4 md:p-10 bg-n50 rounded-2xl gap-6">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold">
            Version and Download Options
          </h2>
          <p className="text-lg text-n900">
            Explore some older versions and dev releases of the designer and
            engine.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
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

import Archive from "@/components/download/archive";
import { H3, H5 } from "@/components/ui/typography";

export default function VersionOverview() {
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
      </div>
      <Archive />
    </div>
  );
}

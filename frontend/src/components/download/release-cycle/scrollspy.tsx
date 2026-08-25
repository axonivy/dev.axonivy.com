import {
  ScrollSpy,
  ScrollSpyLink,
  ScrollSpyNav,
  ScrollSpySection,
  ScrollSpyViewport,
} from "@/components/ui/scroll-spy";
import { IconCircleCheck, IconBulb } from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import releaseCycleIllustration from "@/assets/release-cycle-illustration.svg";

export default function ScrollspyReleaseCycle() {
  return (
    <div className="flex flex-col">
      <ScrollSpy offset={200} className="h-auto w-full gap-8">
        <ScrollSpyNav className="sticky top-50 z-10 shrink-0 self-start bg-white pt-2.5 hidden md:flex">
          <ScrollSpyLink value="LTS">Long Term Support (LTS)</ScrollSpyLink>
          <ScrollSpyLink value="LE">Leading Edge (LE)</ScrollSpyLink>
          <ScrollSpyLink value="maintenance">Maintenance support</ScrollSpyLink>
          <ScrollSpyLink value="illustration">
            Release cycle illustration
          </ScrollSpyLink>
        </ScrollSpyNav>
        <ScrollSpyViewport className="p-4">
          <ScrollSpySection value="LTS" className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-semibold">Release cycle</h1>
              <p className="uppercase font-semibold text-n800 tracking-widest">
                How does it work?
              </p>
              <p className="text-n900">
                The releasing of the Axon Ivy Platform follows a well defined
                release cycle which clearly differs between{" "}
                <span className="font-semibold">Long Term Support (LTS)</span>{" "}
                and <span className="font-semibold">Leading Edge (LE)</span>{" "}
                versions.
              </p>
            </div>
            <Separator />
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Long Term Support (LTS)</h2>
              <p className="text-n900">
                A LTS release is the most stable version. During the maintenance
                period of an LTS release we provide several update releases
                which contains mainly bug fixes and tiny improvements.{" "}
              </p>
              <p className="text-n900">
                We always support the two latest LTS releases. This protects a
                running, productive environment - an upgrade to a new update
                release comes with minimal risk. New LTS releases will always
                start with an even major version number.
              </p>
              <div className="flex flex-row items-center gap-2">
                <IconCircleCheck className="size-4 text-primary" />
                <p className="text-n900 font-semibold">
                  Current Long Term Support versions:
                  <span className="font-normal"> 10.0 / 12.0</span>
                </p>
              </div>
            </div>
            <Separator />
          </ScrollSpySection>
          <ScrollSpySection value="LE" className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Leading Edge (LE)</h2>
              <p className="text-n900">
                As early adopter you are able to benefit already from the newest
                features with our Leading Edge release. We can only support the
                latest Leading Edge release, because of this you need to be
                ready for frequent migrations!{" "}
              </p>
              <p className="text-n900">
                Taking the leading edge road is suitable if you start new
                projects. Leading Edge releases will start with an odd version
                number.
              </p>
              <div className="flex flex-row items-center gap-2">
                <IconCircleCheck className="size-4 text-primary" />
                <p className="text-n900 font-semibold">
                  Current Leading Edge version:
                  <span className="font-normal"> 13.2</span>
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 p-4 bg-n50 rounded-md">
                <div className="flex p-2 bg-yellow-bg text-yellow rounded-md h-fit w-fit">
                  <IconBulb className="size-8" />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-semibold">When to upgrade?</p>
                  <p className="text-n900">
                    Consider upgrading to a supported LTS version or the latest
                    LE version release for ongoing updates and official support.
                    When a new LTS version is released, the third latest LTS
                    version will continue to receive support for an additional
                    3-month grace period until the end of the month, before it
                    is no longer supported, meaning no more updates or security
                    patches will be provided.
                  </p>
                </div>
              </div>
            </div>
            <Separator />
          </ScrollSpySection>
          <ScrollSpySection value="maintenance" className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">
                Extended Maintenance Support
              </h2>
              <p className="text-n900">
                For versions that have reached the end of their official support
                period, we understand that some users may still require
                assistance for their specific, unsupported version. We offer an
                Extended Maintenance Support Contract to provide continued
                support in such cases. To inquire about this contract and
                receive more information, don't hesitate to contact our support
                team at{" "}
                <a className="text-primary" href="mailto:support@axonivy.com">
                  support@axonivy.com
                </a>
                .
              </p>
            </div>
            <Separator />
          </ScrollSpySection>
          <ScrollSpySection
            value="illustration"
            className="flex flex-col gap-8"
          >
            <div className="w-full">
              <h2 className="text-xl font-semibold">
                Release cycle illustration
              </h2>
              <img
                src={releaseCycleIllustration.src}
                alt="Release cycle illustration"
                className="h-auto w-full"
              />
            </div>
          </ScrollSpySection>
        </ScrollSpyViewport>
      </ScrollSpy>
    </div>
  );
}

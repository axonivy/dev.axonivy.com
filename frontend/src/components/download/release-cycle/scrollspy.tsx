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
import releaseCycleDarkIllustration from "@/assets/release-cycle-dark-illustration.svg";
import { Base, H3, H4, H6 } from "@/components/ui/typography";

export default function ReleaseCycleScrollspy() {
  return (
    <div className="flex flex-col">
      <ScrollSpy offset={200} className="h-auto w-full gap-8">
        <ScrollSpyNav className="bg-background sticky top-40 z-10 hidden shrink-0 self-start pt-2.5 md:flex">
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
              <H3>Release cycle</H3>
              <H6>How does it work?</H6>
              <Base className="text-n900">
                The releasing of the Axon Ivy Platform follows a well defined
                release cycle which clearly differs between{" "}
                <span className="font-semibold">Long Term Support (LTS)</span>{" "}
                and <span className="font-semibold">Leading Edge (LE)</span>{" "}
                versions.
              </Base>
            </div>
            <Separator />
            <div className="flex flex-col gap-4">
              <H4>Long Term Support (LTS)</H4>
              <Base className="text-n900">
                A LTS release is the most stable version. During the maintenance
                period of an LTS release we provide several update releases
                which contains mainly bug fixes and tiny improvements.{" "}
              </Base>
              <Base className="text-n900">
                We always support the two latest LTS releases. This protects a
                running, productive environment - an upgrade to a new update
                release comes with minimal risk. New LTS releases will always
                start with an even major version number.
              </Base>
              <div className="flex flex-row items-center gap-2">
                <IconCircleCheck className="text-primary size-4" />
                <Base className="text-n900 font-semibold">
                  Current Long Term Support versions:
                  <span className="font-normal"> 10.0 / 12.0</span>
                </Base>
              </div>
            </div>
            <Separator />
          </ScrollSpySection>
          <ScrollSpySection value="LE" className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <H4>Leading Edge (LE)</H4>
              <Base className="text-n900">
                As early adopter you are able to benefit already from the newest
                features with our Leading Edge release. We can only support the
                latest Leading Edge release, because of this you need to be
                ready for frequent migrations!{" "}
              </Base>
              <Base className="text-n900">
                Taking the leading edge road is suitable if you start new
                projects. Leading Edge releases will start with an odd version
                number.
              </Base>
              <div className="flex flex-row items-center gap-2">
                <IconCircleCheck className="text-primary size-4" />
                <Base className="text-n900 font-semibold">
                  Current Leading Edge version:
                  <span className="font-normal"> 13.2</span>
                </Base>
              </div>
              <div className="bg-n50 flex flex-col gap-4 rounded-md p-4 md:flex-row">
                <div className="bg-yellow-bg text-yellow flex h-fit w-fit rounded-md p-2">
                  <IconBulb className="size-8" />
                </div>
                <div className="flex flex-col gap-2">
                  <H4>When to upgrade?</H4>
                  <Base className="text-n900">
                    Consider upgrading to a supported LTS version or the latest
                    LE version release for ongoing updates and official support.
                    When a new LTS version is released, the third latest LTS
                    version will continue to receive support for an additional
                    3-month grace period until the end of the month, before it
                    is no longer supported, meaning no more updates or security
                    patches will be provided.
                  </Base>
                </div>
              </div>
            </div>
            <Separator />
          </ScrollSpySection>
          <ScrollSpySection value="maintenance" className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <H4>Extended Maintenance Support</H4>
              <Base className="text-n900">
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
              </Base>
            </div>
            <Separator />
          </ScrollSpySection>
          <ScrollSpySection
            value="illustration"
            className="flex flex-col gap-8"
          >
            <div className="w-full">
              <H4>Release cycle illustration</H4>
              <img
                src={releaseCycleIllustration.src}
                alt="Release cycle illustration"
                className="h-auto w-full dark:hidden"
              />
              <img
                src={releaseCycleDarkIllustration.src}
                alt="Release cycle illustration"
                className="hidden h-auto w-full dark:block"
              />
            </div>
          </ScrollSpySection>
        </ScrollSpyViewport>
      </ScrollSpy>
    </div>
  );
}

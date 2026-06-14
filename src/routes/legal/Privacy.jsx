import React from "react";
import TagButton from "@/components/layout-components/Buttons/TagButton";
import { ArrowLeft2 } from "iconsax-reactjs";
import { useNavigate } from "react-router";
import {
  DynamicList,
  Paragraph,
  Section,
} from "@/components/legal/LegalComponents";

function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100vh]">
      {/* Hero */}
      <div className="bg-[#011F0F] py-8 px-100 grid gap-12 place-items-center">
        <img src="/meetroLogo.svg" alt="Meetro Logo" className="w-[109px]" />
        <section className="flex flex-col gap-8 justify-items-start w-full">
          <TagButton
            leftImg={<ArrowLeft2 />}
            text="Back"
            onClick={() => navigate(-1)}
          />
          <div className="grid gap-4">
            <h1 className="font-normal text-4xl text-[#FFFFFE] paytone">
              Privacy Policy
            </h1>
            <p className="satoshi text-sm text-[#B0B5B5] font-medium">
              At Meetro, we respect your privacy and are committed to protecting
              your personal data. This policy explains how we collect, use, and
              protect your information when you use our services.
            </p>
          </div>
        </section>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 py-8 px-100 place-left">
        <h6
          className={`satoshi font-bold text-base text-[#001010] text-left w-full`}
        >
          Effective Date: Launch date
        </h6>
        <div className="grid gap-4">
          <Section heading="What We Collect">
            <DynamicList
              items={[
                "Personal details like name, email, and profile information.",
                "Event participation and RSVPs.",
                "Device and usage data (IP, browser type, session duration).",
                "Messages and interactions (if applicable).",
              ]}
            />
          </Section>

          <Section heading="How We Use Your Information">
            <DynamicList
              items={[
                "To create and manage your account.",
                "To connect you with events, friends, and communities.",
                "To improve the app experience and provide customer support.",
                "For marketing (only with your permission).",
              ]}
            />
          </Section>

          <Section heading="Third-Party Sharing">
            <Paragraph text="We only share data with:" />
            <DynamicList
              items={[
                "Service providers (e.g., email, hosting, analytics).",
                "Legal authorities if required by law.",
              ]}
            />
          </Section>

          <Section heading="Your Rights">
            <Paragraph text="You can:" />
            <DynamicList
              items={[
                "View, edit, or delete your information.",
                "Request data export.",
                "Opt out of emails and marketing.",
              ]}
            />
          </Section>
        </div>
      </div>
    </div>
  );
}

export default Privacy;

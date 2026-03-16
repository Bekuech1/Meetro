import React from "react";
import TagButton from "@/components/layout-components/Buttons/TagButton";
import { ArrowLeft2 } from "iconsax-reactjs";
import { useNavigate } from "react-router";
import {
  DynamicList,
  Paragraph,
  Section,
} from "@/components/legal/LegalComponents";

function Terms() {
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
              Terms of Service
            </h1>
            <p className="satoshi text-sm text-[#B0B5B5] font-medium">
              By using Meetro, you agree to these terms. Please read them
              carefully before creating an account or hosting an event.
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
          <Section heading="Your Responsibilities">
            <DynamicList
              items={[
                "Provide accurate information.",
                "Don’t spam or harass others.",
                "Only post content you own or have rights to share.",
              ]}
            />
          </Section>

          <Section heading="Event Creation">
            <DynamicList
              items={[
                "You are responsible for any event you create.",
                "Meetro does not host or guarantee the quality of any event.",
              ]}
            />
          </Section>

          <Section heading="Paid Features">
            <DynamicList
              items={[
                "Some features may be paid (e.g., ticketing, advanced insights).",
                "Subscription terms will be clearly stated before payment.",
              ]}
            />
          </Section>

          <Section heading="Termination">
            <Paragraph text="We can suspend or remove accounts that violate our terms." />
          </Section>
        </div>
      </div>
    </div>
  );
}

export default Terms;

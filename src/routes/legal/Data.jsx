import React from "react";
import TagButton from "@/components/layout-components/Buttons/TagButton";
import { ArrowLeft2 } from "iconsax-reactjs";
import { useNavigate } from "react-router";
import {
  DynamicList,
  Paragraph,
  Section,
} from "@/components/legal/LegalComponents";

function Data() {
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
              Data Policy
            </h1>
            <p className="satoshi text-sm text-[#B0B5B5] font-medium">
              This policy describes what data Meetro stores, how long we keep
              it, and the controls you have over it.
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
          <Section heading="Security">
            <Paragraph text="We implement best-in-class security protocols (HTTPS, encryption, limited access) to protect your data." />
          </Section>

          <Section heading="Data Retention">
            <Paragraph text="We retain your data only as long as needed to provide our services. You can delete your account anytime." />
          </Section>

          <Section heading="Children">
            <Paragraph text="Meetro is not intended for children under 13. We do not knowingly collect data from them." />
          </Section>

          <Section heading="Cookie Policy">
            <Paragraph text="We use cookies to:" />
            <DynamicList
              items={[
                "Remember when you log in",
                "Analyze traffic and usage trends",
                "Personalize your experience",
              ]}
            />
          </Section>
        </div>
      </div>
    </div>
  );
}

export default Data;

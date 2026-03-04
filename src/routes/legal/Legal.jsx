import React from "react";
import TagButton from "@/components/layout-components/Buttons/TagButton";
import { ArrowLeft2 } from "iconsax-reactjs";
import { useNavigate, useSearchParams } from "react-router";

// ─── Typography ───────────────────────────────────────────────────────────────

const Heading = React.memo(({ text, className = "" }) => (
    <h6 className={`satoshi font-bold text-sm text-[#8A9191] ${className}`}>
        {text}
    </h6>
));

const DynamicList = React.memo(({ items = [], className = "" }) => (
    <ul className={`satoshi font-medium text-sm text-black list-disc list-inside space-y-1.5 ${className}`}>
        {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
));

const Paragraph = React.memo(({ text, className = "" }) => (
    <p className={`satoshi font-medium text-sm text-black leading-[22px] ${className}`}>
        {text}
    </p>
));

const Section = ({ heading, children }) => (
    <section className="flex flex-col gap-3">
        <Heading text={heading} />
        {children}
    </section>
);

// ─── Content Maps ─────────────────────────────────────────────────────────────

const PAGE_META = {
    privacy: {
        title: "Privacy Policy",
        subtitle:
            "At Meetro, we respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and protect your information when you use our services.",
    },
    data: {
        title: "Data Policy",
        subtitle:
            "This policy describes what data Meetro stores, how long we keep it, and the controls you have over it.",
    },
    terms: {
        title: "Terms of Service",
        subtitle:
            "By using Meetro, you agree to these terms. Please read them carefully before creating an account or hosting an event.",
    },
};

// ─── Page Bodies ──────────────────────────────────────────────────────────────

const PrivacyContent = () => (
    <div className="grid gap-4">
        <Section heading="What We Collect">
            <DynamicList items={[
                "Personal details like name, email, and profile information.",
                "Event participation and RSVPs.",
                "Device and usage data (IP, browser type, session duration).",
                "Messages and interactions (if applicable).",
            ]} />
        </Section>

        <Section heading="How We Use Your Information">
            <DynamicList items={[
                "To create and manage your account.",
                "To connect you with events, friends, and communities.",
                "To improve the app experience and provide customer support.",
                "For marketing (only with your permission).",
            ]} />
        </Section>

        <Section heading="Third-Party Sharing">
            <Paragraph text="We only share data with:" />
            <DynamicList items={[
                "Service providers (e.g., email, hosting, analytics).",
                "Legal authorities if required by law.",
            ]} />
        </Section>

        <Section heading="Your Rights">
            <Paragraph text="You can:" />
            <DynamicList items={[
                "View, edit, or delete your information.",
                "Request data export.",
                "Opt out of emails and marketing.",
            ]} />
        </Section>

    </div>
);

const DataContent = () => (
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
            <DynamicList items={[
                "Remember when you log in",
                "Analyze traffic and usage trends",
                "Personalize your experience",
            ]} />
        </Section>
    </div>
);

const TermsContent = () => (
    <div className="grid gap-4">
        <Section heading="Your Responsibilities">
            <DynamicList items={[
                "Provide accurate information.",
                "Don’t spam or harass others.",
                "Only post content you own or have rights to share.",
            ]} />
        </Section>

        <Section heading="Event Creation">
            <DynamicList items={[
                "You are responsible for any event you create.",
                "Meetro does not host or guarantee the quality of any event.",
            ]} />
        </Section>

        <Section heading="Paid Features">
            <DynamicList items={[
                "Some features may be paid (e.g., ticketing, advanced insights).",
                "Subscription terms will be clearly stated before payment.",
            ]} />
        </Section>

        <Section heading="Termination">
            <Paragraph text="We can suspend or remove accounts that violate our terms." />
        </Section>
    </div>
);

// ─── Content registry ─────────────────────────────────────────────────────────

const PAGES = {
    privacy: PrivacyContent,
    data: DataContent,
    terms: TermsContent,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

function Legal() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const activePage = searchParams.get("tab") || "privacy";

    const { title, subtitle } = PAGE_META[activePage];
    const ActiveContent = PAGES[activePage];

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
                        <h1 className="font-normal text-4xl text-[#FFFFFE] paytone">{title}</h1>
                        <p className="satoshi text-sm text-[#B0B5B5] font-medium">{subtitle}</p>
                    </div>

                </section>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-4 py-8 px-100 place-left">
                <h6 className={`satoshi font-bold text-base text-[#001010] text-left w-full`}>
                    Effective Date: Launch date
                </h6>
                <ActiveContent />
            </div>
        </div>
    );
}

export default Legal;
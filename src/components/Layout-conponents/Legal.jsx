import React, { useState, useEffect } from "react";

const Legal = ({ closeLegal, label }) => {
  const [activeComponent, setActiveComponent] = useState({label}); // Initialize with label passed as a string

  useEffect(() => {
    setActiveComponent(label); // Update activeComponent when label changes
  }, [label]);

  const renderContent = () => {
    switch (activeComponent) {
      case "Privacy":
        return <Privacy />;
      case "Data":
        return <Data />;
      case "Terms":
        return <Terms />;
      case "Cookies":
        return <Cookies />;
      default:
        return null;
    }
  };

  const getLabel = (component) => {
    switch (component) {
      case "Privacy":
        return "Privacy Policy";
      case "Data":
        return "Data Policy";
      case "Terms":
        return "Terms of Service";
      case "Cookies":
        return "Cookies Policy";
      default:
        return "Legal Information";
    }
  };

  return (
    <div className="fixed inset-0 h-screen flex flex-col gap-4 items-end justify-end z-30 bg-[#00000080]/50 backdrop-blur-[4px]">
      <img
        src="closePopup.svg"
        className="size-12 cursor-pointer mr-[18px]"
        onClick={() => {closeLegal(); }}
      />
      <div className="w-full h-[90vh] max-h-[700px] flex flex-col justify-between rounded-t-4xl bg-white/90 backdrop-blur-[32px] text-center">
        <div className="w-full h-fit rounded-t-4xl bg-[#FFFFFF] text-black text-left py-3 px-6">
          <h4 className="satoshi text-[20px] font-[700] capitalize">
            {getLabel(activeComponent)}
          </h4>
        </div>
        <div className="size-full bg-white/85 pt-1 pb-6 2xl:px-[30%] sm:[20%] px-[15%] text-left grid grid-rows-[1fr_auto]">
          <div className="w-full h-fit grid gap-2">{renderContent()}</div>

          <div className="w-full h-fit flex items-center justify-between">
            <p
              className={`text-[#8A9191] text-[12px] font-[500] capitalize cursor-pointer transition-all duration-150 ease-in-out ${activeComponent === "Terms" ? "text-black" : "text-[#8A9191]"}`}
              onClick={() => setActiveComponent("Terms")}
            >
              terms of service
            </p>
            <p
              className={`text-[#8A9191] text-[12px] font-[500] capitalize cursor-pointer transition-all duration-150 ease-in-out ${activeComponent === "Privacy" ? "text-black" : "text-[#8A9191]"}`}
              onClick={() => setActiveComponent("Privacy")}
            >
              privacy policy
            </p>
            <p
              className={`text-[#8A9191] text-[12px] font-[500] capitalize cursor-pointer transition-all duration-150 ease-in-out ${activeComponent === "Data" ? "text-black" : "text-[#8A9191]"}`}
              onClick={() => setActiveComponent("Data")}
            >
              data policy
            </p>
            <p
              className={`text-[#8A9191] text-[12px] font-[500] capitalize cursor-pointer transition-all duration-150 ease-in-out ${activeComponent === "Cookies" ? "text-black" : "text-[#8A9191]"}`}
              onClick={() => setActiveComponent("Cookies")}
            >
              cookies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;

const Privacy = () => {
  return (
    <>
      <Heading text="Effective Date: Launch date" />

      <Paragraph text="At Meetro, we respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and protect your information when you use our services." />

      <Container>
        <Heading text="what we collect" />
        <DynamicList
          items={[
            "Personal details like name, email, and profile information",
            "Event participation and RSVPs",
            "Device and usage data (IP, browser type, session duration)",
            "Messages and interactions (if applicable)",
          ]}
        />
      </Container>

      <Container>
        <Heading text="How We Use Your Information" />
        <DynamicList
          items={[
            "To create and manage your account",
            "To connect you with events, friends, and communities",
            "To improve the app experience and provide customer support",
            "For marketing (only with your permission)",
          ]}
        />
      </Container>

      <Container>
        <Heading text="Third-Party Sharing" />
        <Paragraph text="We only share data with:" />
        <DynamicList
          items={[
            "Service providers (e.g., email, hosting, analytics)",
            "Legal authorities if required by law",
          ]}
        />
      </Container>

      <Container>
        <Heading text="your rights" />
        <Paragraph text="You can:" />
        <DynamicList
          items={[
            "View, edit, or delete your information",
            "Request data export",
            "Opt out of emails and marketing",
          ]}
        />
      </Container>
    </>
  );
};

const Data = () => {
  return (
    <>
    <Heading text="Effective Date: Launch date" />
    <Paragraph text="We use your data to personalize your experience and improve Meetro’s features." />

      <Container>
        <Heading text="security" />
        <Paragraph text="We implement best-in-class security protocols (HTTPS, encryption, limited access) to protect your data." />
      </Container>

      <Container>
        <Heading text="data retention" />
        <Paragraph text="We retain your data only as long as needed to provide our services. You can delete your account anytime." />
      </Container>

      <Container>
        <Heading text="children" />
        <Paragraph text="Meetro is not intended for children under 13. We do not knowingly collect data from them." />
      </Container>
    </>
  );
};

const Terms = () => {
  return (
    <>
    <Heading text="Effective Date: Launch date" />

<Paragraph text="Welcome to Meetro! By using our app or website, you agree to these terms:" />

<Container>
  <Heading text="your responsibilities" />
  <DynamicList
    items={[
      "Provide accurate information",
      "Don't spam or harass others",
      "Only post content you own or have rights to share",
    ]}
  />
</Container>

<Container>
  <Heading text="event creation" />
  <DynamicList
    items={[
      "You are responsible for any event you create",
      "Meetro does not host or guarantee the quality of any event",
    ]}
  />
</Container>

<Container>
  <Heading text="paid features" />
  <DynamicList
    items={[
      "Some features may be paid (e.g., ticketing, advanced insights)",
      "Subscription terms will be clearly stated before payment",
    ]}
  />
</Container>

<Container>
  <Heading text="termination" />
  <Paragraph text="We can suspend or remove accounts that violate our terms." />
</Container>
</>
  );
};

const Cookies = () => {
  return (
    <>
    <Container>
  <Heading text="we use cookies to:" />
  <DynamicList
    items={[
      "Remember you when you log in",
      "Analyze traffic and usage trends",
      "Personalize your experience",
    ]}
  />
</Container>
</>
  );
};

const Heading = ({ text, className }) => {
  return (
    <h6
      className={`satoshi font-[700] text-[12px] text-[#8A9191] capitalize ${className}`}
    >
      {text}
    </h6>
  );
};

const DynamicList = ({ items = [], className }) => {
  return (
    <ul className={`satoshi font-[500] text-[12px] text-black ${className}`}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

const Paragraph = ({ text, className }) => {
  return (
    <p className={`satoshi font-[500] text-[12px] text-black ${className}`}>
      {text}
    </p>
  );
};

const Container = ({ children }) => {
  return <div className="grid w-full h-fit gap-1">{children}</div>;
};

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Component data moved outside to prevent recreating on each render
const FOOTER_LINKS = [
  { key: "Terms", label: "Terms of Service" },
  { key: "Privacy", label: "Privacy Policy" },
  { key: "Data", label: "Data Policy" },
  { key: "Cookies", label: "Cookies" },
];

const COMPONENT_LABELS = {
  Privacy: "Privacy Policy",
  Data: "Data Policy", 
  Terms: "Terms of Service",
  Cookies: "Cookies Policy",
};

const PRIVACY_DATA = {
  items: [
    {
      title: "what we collect",
      content: [
        "Personal details like name, email, and profile information",
        "Event participation and RSVPs", 
        "Device and usage data (IP, browser type, session duration)",
        "Messages and interactions (if applicable)",
      ]
    },
    {
      title: "How We Use Your Information",
      content: [
        "To create and manage your account",
        "To connect you with events, friends, and communities", 
        "To improve the app experience and provide customer support",
        "For marketing (only with your permission)",
      ]
    },
    {
      title: "Third-Party Sharing",
      description: "We only share data with:",
      content: [
        "Service providers (e.g., email, hosting, analytics)",
        "Legal authorities if required by law",
      ]
    },
    {
      title: "your rights",
      description: "You can:",
      content: [
        "View, edit, or delete your information",
        "Request data export",
        "Opt out of emails and marketing",
      ]
    }
  ]
};

const TERMS_DATA = {
  items: [
    {
      title: "your responsibilities",
      content: [
        "Provide accurate information",
        "Don't spam or harass others",
        "Only post content you own or have rights to share",
      ]
    },
    {
      title: "event creation", 
      content: [
        "You are responsible for any event you create",
        "Meetro does not host or guarantee the quality of any event",
      ]
    },
    {
      title: "paid features",
      content: [
        "Some features may be paid (e.g., ticketing, advanced insights)",
        "Subscription terms will be clearly stated before payment",
      ]
    }
  ]
};

// Animation variants
const containerVariants = {
  hidden: { 
    opacity: 0,
    y: "100%",
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
      mass: 0.8,
      duration: 0.6
    }
  },
  exit: {
    opacity: 0,
    y: "100%", 
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, delay: 0.1 }
  }
};

const Legal = ({ closeLegal, label }) => {
  const [activeComponent, setActiveComponent] = useState(label);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setActiveComponent(label);
  }, [label]);

  const currentLabel = useMemo(() => COMPONENT_LABELS[activeComponent], [activeComponent]);

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
        return <div>Content not available.</div>;
    }
  };

  const handleClose = () => {
    setIsExiting(true);
    // Delay the actual close to allow exit animation to complete
    setTimeout(() => {
      closeLegal();
    }, 400); // Slightly longer than exit animation
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 h-screen flex flex-col gap-[10px] items-end justify-end z-30 bg-[#00000080]/50 backdrop-blur-[4px]"
        variants={backdropVariants}
        initial="hidden"
        animate={isExiting ? "exit" : "visible"}
        exit="exit"
        onClick={handleBackdropClick}
      >
        <motion.img
          src="/closePopup.svg"
          alt="Close"
          className="size-12 cursor-pointer mr-[18px]"
          onClick={handleClose}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isExiting ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
          transition={{ delay: isExiting ? 0 : 0.2, duration: 0.3 }}
          whileHover={{ scale: isExiting ? 0.8 : 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
        
        <motion.div 
          className="w-full h-[600px] flex flex-col justify-between rounded-t-4xl bg-white/90 backdrop-blur-[32px] text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isExiting ? "exit" : "visible"}
          exit="exit"
        >
          {/* Header */}
          <div className="w-full h-fit rounded-t-4xl bg-[#FFFFFF] text-black text-left py-3 px-6">
            <h4 className="satoshi text-[20px] font-[700] capitalize">
              {currentLabel}
            </h4>
          </div>

          {/* Content */}
          <div className="w-full h-full bg-white/85 pt-3 pb-6 xl:px-[35%] md:px-[20%] px-[5%] text-left flex flex-col justify-between">
            <div className="w-full h-[480px] max-h-[65vh] overflow-y-auto scrollbar-hide">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeComponent}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer Links */}
            <div className="w-full h-fit flex items-center justify-between pt-3 pb-4">
              {FOOTER_LINKS.map(({ key, label }) => (
                <motion.p
                  key={key}
                  className={`text-[14px] font-[500] capitalize cursor-pointer transition-all duration-150 ease-in-out ${
                    activeComponent === key ? "text-black" : "text-[#8A9191]"
                  }`}
                  onClick={() => setActiveComponent(key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {label}
                </motion.p>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Optimized content components using shared data structures
const Privacy = () => (
  <div className="grid gap-2">
    <Heading text="Effective Date: Launch date" />
    <Paragraph text="At Meetro, we respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and protect your information when you use our services." />
    
    {PRIVACY_DATA.items.map((item, index) => (
      <Container key={index}>
        <Heading text={item.title} />
        {item.description && <Paragraph text={item.description} />}
        <DynamicList items={item.content} />
      </Container>
    ))}
  </div>
);

const Data = () => (
  <div className="grid gap-2">
    <Heading text="Effective Date: Launch date" />
    <Paragraph text="We use your data to personalize your experience and improve Meetro's features." />

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
  </div>
);

const Terms = () => (
  <div className="grid gap-2">
    <Heading text="Effective Date: Launch date" />
    <Paragraph text="Welcome to Meetro! By using our app or website, you agree to these terms:" />

    {TERMS_DATA.items.map((item, index) => (
      <Container key={index}>
        <Heading text={item.title} />
        <DynamicList items={item.content} />
      </Container>
    ))}

    <Container>
      <Heading text="termination" />
      <Paragraph text="We can suspend or remove accounts that violate our terms." />
    </Container>
  </div>
);

const Cookies = () => (
  <div className="grid gap-2">
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
  </div>
);

// Memoized components for better performance
const Heading = React.memo(({ text, className = "" }) => (
  <h6 className={`satoshi font-[700] text-[14px] text-[#8A9191] capitalize ${className}`}>
    {text}
  </h6>
));

const DynamicList = React.memo(({ items = [], className = "" }) => (
  <ul className={`satoshi font-[500] text-[14px] text-black ${className}`}>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
));

const Paragraph = React.memo(({ text, className = "" }) => (
  <p className={`satoshi font-[500] text-[14px] text-black ${className}`}>
    {text}
  </p>
));

const Container = React.memo(({ children }) => (
  <div className="grid w-full h-fit gap-2">{children}</div>
));

export default Legal;
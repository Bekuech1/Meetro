import React, { useState, useCallback } from "react";
import Button from "./Button";
import { Link } from "react-router"; // 👇 Imported Link from React Router

const SOCIAL_LINKS = [
  {
    name: "instagram",
    icon: "/ig",
    label: "Instagram",
    url: "https://instagram.com/meetro.live",
  },
  {
    name: "twitter",
    icon: "/x",
    label: "Twitter",
    url: "https://twitter.com/meetro.live",
  },
  {
    name: "facebook",
    icon: "/fb",
    label: "Facebook",
    url: "https://facebook.com/meetro.live",
  },
  {
    name: "linkedin",
    icon: "/in",
    label: "LinkedIn",
    url: "https://linkedin.com/company/meetro",
  },
];

// 👇 1. Updated this array to include the actual URL paths we created
const LEGAL_LINKS = [
  { key: "Terms", label: "Terms of Service", url: "/terms" },
  { key: "Privacy", label: "Privacy Policy", url: "/privacy" },
  { key: "Data", label: "Data Policy", url: "/data" },
  // { key: 'Cookies', label: 'Cookies', url: '/legal?tab=cookies' } // Add this back if you create a cookies tab!
];

const Footer = () => {
  // 👇 2. Removed all the modal state! Only kept the social hover state.
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const handleSocialHover = useCallback((socialName, isHovering) => {
    setHoveredSocial(isHovering ? socialName : null);
  }, []);

  return (
    <footer
      className="bg-[#01160B] md:px-[60px] px-4 py-[64px]"
      id="footer"
      role="contentinfo"
    >
      <div className="grid md:flex border-b border-white/10 pb-10 gap-[40px] md:justify-between">
        {/* Brand Section */}
        <div className="grid gap-6 h-fit w-fit mx-auto md:mx-0">
          <img
            src="/meetroLogo.svg"
            alt="Meetro Logo"
            className="mx-auto md:mx-0"
            width="120"
            height="40"
          />
          <a
            href="mailto:connect@meetro.live"
            className="font-[500] md:text-[18px] md:leading-[28px] text-[14px] leading-5 text-[#B0B5B5] paytone hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#AFFC41] focus:ring-offset-2 focus:ring-offset-[#01160B] rounded"
            aria-label="Contact us via email"
          >
            connect@Meetro.live
          </a>

          {/* Social Media Links */}
          <nav
            className="size-fit flex items-center gap-3 mx-auto md:mx-0"
            aria-label="Social media links"
          >
            {SOCIAL_LINKS.map(({ name, icon, label, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="size-fit cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#AFFC41] focus:ring-offset-2 focus:ring-offset-[#01160B] rounded p-1 -m-1"
                onMouseEnter={() => handleSocialHover(name, true)}
                onMouseLeave={() => handleSocialHover(name, false)}
                onFocus={() => handleSocialHover(name, true)}
                onBlur={() => handleSocialHover(name, false)}
                aria-label={`Follow us on ${label}`}
              >
                <img
                  src={
                    hoveredSocial === name
                      ? `${icon}-color.svg`
                      : `${icon}-gray.svg`
                  }
                  className="size-[22px] transition-all duration-200"
                  alt=""
                  loading="lazy"
                />
              </a>
            ))}
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="w-fit h-fit flex gap-4 mx-auto md:mx-0">
          <a
            href="https://chat.whatsapp.com/FLUaeqHc6oAIXNJeHilDhQ"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join our WhatsApp community"
          >
            <Button name="Join Community" color="bg-white" />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid md:flex md:justify-between py-10 gap-6">
        <p className="md:text-[14px] font-[500] md:leading-[20px] text-[10px] leading-[14px] text-[#B0B5B5] mx-auto md:mx-0 satoshi">
          © {new Date().getFullYear()} Meetro All rights reserved
        </p>

        {/* 👇 3. Updated this section to use React Router <Link> tags */}
        <nav
          className="flex md:gap-6 gap-2 mx-auto md:mx-0"
          aria-label="Legal information"
        >
          {LEGAL_LINKS.map(({ key, label, url }) => (
            <Link
              key={key}
              to={url}
              className="md:text-[14px] font-[500] md:leading-[20px] text-[10px] leading-[14px] text-[#B0B5B5] capitalize satoshi cursor-pointer hover:text-white transition-colors duration-200 rounded px-1 py-0.5"
              aria-label={`Open ${label}`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <img
        src="/meetroFooter.svg"
        alt="Meetro footer decoration"
        className="w-full"
        loading="lazy"
      />

      {/* 👇 4. Removed the entire Legal Modal block from down here! */}
    </footer>
  );
};

export default Footer;

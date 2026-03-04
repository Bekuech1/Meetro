import React from "react";
import { Link } from "react-router";

function Footer() {
  return (
    <React.Fragment>
      <div className="min-[680px]:bottom-[68px] pointer-events-none bg-gradient-to-b from-[#E8E8E8]/0 z-10 w-full fixed left-0 bottom-0 hidden min-[680px]:block h-21 to-[#E8E8E8]/80"></div>
      <div className="bg-[#F0F0F0] sticky bottom-0 z-20 hidden min-[680px]:block">
        <div className="max-w-[1440px] visbycf text-sm text-[#8A9191] font-medium py-6 px-4 md:px-[60px] mx-auto w-full gap-4 flex-wrap flex flex-row items-center justify-between">
          <p>© {new Date().getFullYear()} Meetro All rights reserved</p>
          <ul className="flex items-center gap-6">
            <li>
              <Link to="/legal?tab=terms" className="transition-colors duration-200 hover:text-[#4A5B5C]">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/legal?tab=privacy" className="transition-colors duration-200 hover:text-[#4A5B5C]">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/legal?tab=data" className="transition-colors duration-200 hover:text-[#4A5B5C]">
                Data Policy
              </Link>
            </li>
            <li>
              <Link to="/legal?tab=cookies" className="transition-colors duration-200 hover:text-[#4A5B5C]">
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Footer;

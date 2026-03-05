import { Link, useLocation } from "react-router";
import { twMerge } from "tailwind-merge";

function Footer() {
  const { pathname } = useLocation();
  return (
    <div
      className={twMerge(
        "bg-[#F0F0F0] md:block hidden min-[680px]:block",
        pathname === "/home" && "pb-20"
      )}
    >
      <div className="max-w-[1440px] visbycf text-sm text-[#8A9191] font-medium py-5 px-4 md:px-[60px] mx-auto w-full gap-4 flex-wrap flex flex-row items-center justify-between">
        <p>© {new Date().getFullYear()} Meetro All rights reserved</p>
        <ul className="flex items-center gap-6">
          <li>
            <Link
              to="#"
              className="transition-colors duration-200 hover:text-[#4A5B5C]"
            >
              Terms of Service
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="transition-colors duration-200 hover:text-[#4A5B5C]"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="transition-colors duration-200 hover:text-[#4A5B5C]"
            >
              Data Policy
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;

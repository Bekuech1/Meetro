import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="border-t bg-[#0A2A0A] text-white">
      <div className="container py-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8AE637"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a9 9 0 0 0-9 9c0 3.6 3.96 7.814 9 12 5.04-4.186 9-8.4 9-12a9 9 0 0 0-9-9zm0 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
              </svg>
              <span className="text-[#8AE637] font-medium">Meetro</span>
            </div>
            <p className="text-sm text-gray-400">support@Meetro.com</p>
          </div>

          <Button className="rounded-full bg-white text-[#0A2A0A] hover:bg-gray-100">
            Join Community
          </Button>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-gray-800 pt-8 md:flex-row md:items-center">
          <p className="text-sm text-gray-400">
            © 2024 Meetro All rights reserved
          </p>

          <div className="flex gap-4">
            <Link href="#" className="text-sm text-gray-400 hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white">
              Data Policy
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white">
              Cookies
            </Link>
          </div>
        </div>

        <div className=" bg-[#0A2A0A]">
          <div className="container">
            <h1 className="text-[15rem] font-bold leading-none opacity-10 text-[#8AE637]">
              Meetro
            </h1>
          </div>
        </div>
      </div>
    </footer>
  );
}

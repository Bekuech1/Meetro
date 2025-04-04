import { Search, Globe, Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#0A2A0A] text-white">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
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
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#"
              className="flex items-center gap-1 text-sm font-medium opacity-70 hover:opacity-100"
            >
              <Search className="h-4 w-4" />
              Discover
            </Link>
            <Link
              href="#"
              className="flex items-center gap-1 text-sm font-medium opacity-70 hover:opacity-100"
            >
              <Globe className="h-4 w-4" />
              Communities
            </Link>
            <Link
              href="#"
              className="flex items-center gap-1 text-sm font-medium opacity-70 hover:opacity-100"
            >
              <Bell className="h-4 w-4" />
              Connect
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-[200px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="FCT"
              className="w-full rounded-full bg-[#1A3A1A] pl-8 pr-4 text-sm text-white placeholder:text-gray-400 focus-visible:ring-[#8AE637]"
            />
            <ChevronDown className="absolute right-2.5 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Globe className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8 border border-white/20">
              <AvatarFallback className="bg-[#1A3A1A] text-white">
                NO
              </AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="sm"
              className="ml-2 rounded-full bg-[#8AE637] text-black hover:bg-[#7AD627] hover:text-black"
            >
              Create Event
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

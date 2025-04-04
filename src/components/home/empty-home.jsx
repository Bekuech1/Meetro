import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EmptyHome() {
  return (
    <main className="flex-1 bg-gradient-to-b from-[#FFF5FA] to-[#F8E8F0] h-[95vh]">
      <div className="container py-8">
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px] rounded-full border-purple-200 bg-white">
              <SelectValue placeholder="All Events" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="past">Past</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="march">
            <SelectTrigger className="w-[150px] rounded-full border-purple-200 bg-white">
              <SelectValue placeholder="March, 2025" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="march">March, 2025</SelectItem>
              <SelectItem value="april">April, 2025</SelectItem>
              <SelectItem value="may">May, 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-[#4A2D5F]">
              Looks like there&apos;s nothing happening right now. Why not be
              the first to create an event?
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
}

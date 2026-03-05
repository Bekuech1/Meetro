import { clsx } from "clsx";
import { format, isValid, parse } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDate = (value, formatStr = "MMM d   h:mm a") => {
  if (!value) return "";
  const date = new Date(value);
  return format(date, formatStr);
};

export function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now - past;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (weeks < 5) return `${weeks}w ago`;
  if (months < 12) return `${months}mo ago`;
  return `${years}y ago`;
}

export const parseDate = rawDate => {
  if (!rawDate || typeof rawDate !== "string") return null;
  // Remove weekday like "Sat, " or "Saturday, "
  const cleanedDateStr = rawDate.replace(/^([A-Za-z]+,?\s*)/, "").trim();
  // Try parsing with comma format first (e.g. "October 29, 2025")
  let parsed = parse(cleanedDateStr, "MMMM d, yyyy", new Date());
  // If invalid, try without comma ("October 29 2025")
  if (!isValid(parsed)) {
    parsed = parse(cleanedDateStr, "MMMM d yyyy", new Date());
  }
  return isValid(parsed) ? parsed : null;
};

export const randomProfileImage = () => {
  const randomIndex = Math.floor(Math.random() * 4) + 1;
  return `/Profile-${randomIndex}.svg`;
};

// Group events by date
export const groupEventsByDate = eventsList => {
  const grouped = {};
  eventsList.forEach(event => {
    const date = new Date(event.startDate);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const dayNum = String(date.getDate()).padStart(2, "0");
    const monthName = date.toLocaleDateString("en-US", { month: "long" });
    const eventDate = `${dayName}, ${dayNum} ${monthName}`;
    if (!grouped[eventDate]) {
      grouped[eventDate] = [];
    }
    grouped[eventDate].push(event);
  });
  return grouped;
};
// Helper function to calculate time remaining
export function calculateTimeRemaining(eventDate) {
  const now = new Date();
  const eventTime = new Date(eventDate);

  // Handle invalid date
  if (isNaN(eventTime)) return "Invalid date";

  const diff = eventTime - now;

  if (diff <= 0) return "Event has started";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  // More granular display logic
  if (days > 0) {
    return hours > 0 ? `${days}d ${hours}h` : `${days}d`;
  } else if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return "Starting soon";
  }
}

export const formatNaira = (amount, fractionDigits = 0) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount);
};

export function formatCurrency(amount) {
  if (isNaN(amount)) return "Invalid amount";
  return "₦ " + Number(amount).toLocaleString("en-NG");
}

const format12Hour = () => {
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12; // converts 0 → 12
  const mm = String(minute).padStart(2, "0");
  return `${displayHour}:${mm} ${period}`;
};

export const timeOptions = () => {
  const times = [];
  let id = 1;

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      times.push({ id: id++, name: format12Hour(hour, minute) });
    }
  }

  return times;
};

export const states = [
  { id: 1, name: "Abia" },
  { id: 2, name: "Adamawa" },
  { id: 3, name: "Akwa Ibom" },
  { id: 4, name: "Anambra" },
  { id: 5, name: "Bauchi" },
  { id: 6, name: "Bayelsa" },
  { id: 7, name: "Benue" },
  { id: 8, name: "Borno" },
  { id: 9, name: "Cross River" },
  { id: 10, name: "Delta" },
  { id: 11, name: "Ebonyi" },
  { id: 12, name: "Edo" },
  { id: 13, name: "Ekiti" },
  { id: 14, name: "Enugu" },
  { id: 15, name: "Gombe" },
  { id: 16, name: "Imo" },
  { id: 17, name: "Jigawa" },
  { id: 18, name: "Kaduna" },
  { id: 19, name: "Kano" },
  { id: 20, name: "Katsina" },
  { id: 21, name: "Kebbi" },
  { id: 22, name: "Kogi" },
  { id: 23, name: "Kwara" },
  { id: 24, name: "Lagos" },
  { id: 25, name: "Nasarawa" },
  { id: 26, name: "Niger" },
  { id: 27, name: "Ogun" },
  { id: 28, name: "Ondo" },
  { id: 29, name: "Osun" },
  { id: 30, name: "Oyo" },
  { id: 31, name: "Plateau" },
  { id: 32, name: "Rivers" },
  { id: 33, name: "Sokoto" },
  { id: 34, name: "Taraba" },
  { id: 35, name: "Yobe" },
  { id: 36, name: "Zamfara" },
];

export const categories = {
  "Community Meetups": "text-[#0A84FF]",
  "Nightlife & Parties": "text-[#011F0F]",
  "Music & Concerts": "text-[#4A3A74]",
  "Networking & Conferences": "text-[#077D8A]",
  "Festivals & Cultural Events": "text-[#496A1B]",
  "Food & Drink Events": "text-[#9B1C46]",
  "Tech & Innovation": "text-[#011F0F]",
  "Art & Exhibitions": "text-[#CF7E00]",
  "Outdoor & Adventure": "text-[#B25000]",
  "Gaming & Esports": "text-[#269E44]",
  "Charity & Fundraisers": "text-[#8125AF]",
};

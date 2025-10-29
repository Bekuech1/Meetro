import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

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

export function formatCurrency(amount) {
  if (isNaN(amount)) return "Invalid amount";
  return "₦ " + Number(amount).toLocaleString("en-NG");
}

const format12Hour = (hour, minute) => {
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

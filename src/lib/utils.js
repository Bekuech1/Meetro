import { clsx } from "clsx";
import { format, isValid, parse } from "date-fns";
import { useMemo } from "react";
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

export const groupEvents = events =>
  useMemo(() => {
    // If there are no events, return an empty object early
    if (!events || events.length === 0) return {};

    // Object to hold grouped events
    const grouped = {};

    // Get today's date and reset time to midnight for accurate comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Loop through each event
    for (const event of events) {
      // Convert event.date into a Date object
      const parsed = parseDate(event.date);
      if (!parsed) continue; // Skip invalid or unparsable dates

      // Reset the event date's time to midnight
      parsed.setHours(0, 0, 0, 0);

      // Skip events that are before today's date
      if (parsed < today) continue;

      // Format the date into a key string
      const key = format(parsed, "yyyy-MM-dd");

      // If this date hasn't been seen before, initialize an empty array
      if (!grouped[key]) grouped[key] = [];

      // Add the current event to its date group
      grouped[key].push(event);
    }

    // Sort the grouped object by date (earliest → latest)
    return Object.keys(grouped)
      .sort((a, b) => new Date(a) - new Date(b))
      .reduce((acc, date) => {
        acc[date] = grouped[date]; // Rebuild the object in sorted order
        return acc;
      }, {});

    // Re-run only when events changes
  }, [events]);

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

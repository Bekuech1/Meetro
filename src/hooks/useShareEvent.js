import { useState } from "react";

export const useShareEvent = defaultEvent => {
  const [copied, setCopied] = useState(false);

  const eventUrl = defaultEvent
    ? `${window.location.origin}/events/${defaultEvent.slug}?shared=true`
    : "";

  const handleShare = async () => {
    if (!defaultEvent) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: defaultEvent.title,
          text: `Check out this event: ${defaultEvent.title}`,
          url: eventUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  };

  const handleCopy = async () => {
    if (!defaultEvent) return;
    try {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Error copying to clipboard:", err);
    }
  };
  return { copied, handleShare, handleCopy };
};

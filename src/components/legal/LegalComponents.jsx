import React from "react";

// ─── Typography ───────────────────────────────────────────────────────────────

const Heading = React.memo(({ text, className = "" }) => (
  <h6 className={`satoshi font-bold text-sm text-[#8A9191] ${className}`}>
    {text}
  </h6>
));

export const DynamicList = React.memo(({ items = [], className = "" }) => (
  <ul
    className={`satoshi font-medium text-sm text-black list-disc list-inside space-y-1.5 ${className}`}
  >
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
));

export const Paragraph = React.memo(({ text, className = "" }) => (
  <p
    className={`satoshi font-medium text-sm text-black leading-[22px] ${className}`}
  >
    {text}
  </p>
));

export const Section = ({ heading, children }) => (
  <section className="flex flex-col gap-3">
    <Heading text={heading} />
    {children}
  </section>
);

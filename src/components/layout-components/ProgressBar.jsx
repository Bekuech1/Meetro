import React from "react";
import TagButton from "./Buttons/TagButton";
import { Heart, Star1 } from "iconsax-reactjs";

const ProgressBar = ({
  variant = "target-goal",
  current = 0,
  target = 1,
  amount = 0,
  title = "",
  color = "#518A00",
  height = 8,
  showLabel = true,
}) => {
  const formatAmount = val => {
    if (val >= 1_000_000) return `₦${(val / 1_000_000).toFixed(1)}M`;
    if (val >= 1_000) return `₦${(val / 1_000).toFixed(0)}K`;
    return `₦${val.toLocaleString()}`;
  };

  if (variant === "target-goal") {
    const percentage = Math.min(Math.round((current / target) * 100), 100);
    return (
      <div className="grid satoshi gap-2 p-3 rounded-2xl border border-[#E5E7E3]">
        <div className="flex justify-between mb-8 items-center">
          <span className="text-base font-medium text-[#001010]">
            Target Goal
          </span>
          <span className="text-lg font-bold text-[#7A60BF]">
            {formatAmount(target)}
          </span>
        </div>
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height, backgroundColor: "#518A001A" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%`, backgroundColor: color }}
          />
        </div>
        {showLabel && (
          <div className="flex justify-between items-center text-xs font-medium">
            <span className="text-base font-medium text-[#001010]">
              {formatAmount(current)}
            </span>
            <span className="text-base font-medium text-[#011F0F]">
              {formatAmount(target)}
            </span>
          </div>
        )}
      </div>
    );
  }

  // variant === 'minimum-amount' or 'amount'
  return (
    <div className="grid gap-2 p-3 rounded-2xl border border-[#E5E7E3]">
      <div className="flex justify-between items-center">
        <span className="text-base font-medium text-[#001010]">
          Chip in{" "}
          {variant === "minimum-amount" ? "Minimum amount" : title || "Amount"}
        </span>
        <span className="text-lg font-bold text-[#7A60BF]">
          {formatAmount(amount)}
        </span>
      </div>
      <TagButton
        leftImg={
          variant === "minimum-amount" ? (
            <Heart variant="Bold" size={12} />
          ) : (
            <Star1 variant="Bold" size={12} />
          )
        }
        text={
          variant === "minimum-amount"
            ? "Give what feels right"
            : "Required to join the fun"
        }
        variant="light-purple"
        className="satoshi pointer-events-none"
        size="sm"
      />
    </div>
  );
};

export default ProgressBar;

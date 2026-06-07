import TagButton from "../Buttons/TagButton";
import { categories } from "@/lib/utils";
import { twMerge } from "tailwind-merge";

function EventCategories({ eventCategories, isSmall = false }) {
  return (
    <div>
      {eventCategories.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {eventCategories.map((cat, index) => (
            <TagButton
              key={index}
              size={isSmall ? "sm" : "md"}
              className={twMerge(
                "pointer-events-none satoshi",
                categories[cat] ? categories[cat] : "text-[#001010]"
              )}
              text={cat}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default EventCategories;

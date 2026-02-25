import IconButton from "../layout-components/Buttons/IconButton";
import React, { useState } from "react";
import { SearchNormal1, CloseCircle } from "iconsax-reactjs";

function TableSearch({
  placeholder = "Search",
  value,
  onChange,
  handleSearch,
  onClear,
  ...rest
}) {
  // State to control mobile search input visibility
  const [isOpen, setIsOpen] = useState(false);

  // Handle clearing the search input
  const handleClear = () => {
    if (onClear) {
      onClear();
    }
  };

  return (
    <React.Fragment>
      {/* Mobile view */}
      <div className="sm:hidden">
        {isOpen ? (
          <div className="flex gap-2 items-center max-w-[191px] pl-2.5 pr-1  py-1 h-7.5 border relative border-white rounded-[8px] bg-[#f0f0f0]/90">
            <input
              type="text"
              placeholder={placeholder}
              autoFocus
              value={value}
              onChange={onChange}
              className="flex-1 border-0 outline-0 min-w-0 bg-transparent placeholder:font-bold text-sm satoshi placeholder:text-[#B0B5B5]"
              {...rest}
            />
            <IconButton
              icon={<CloseCircle className="size-4" />}
              variant="tertiary"
              className="size-5 border-transparent rounded-[6px]"
              onClick={handleClear}
            />
          </div>
        ) : (
          <IconButton
            icon={<SearchNormal1 className="size-4" />}
            variant="tertiary"
            className="size-7 border-transparent rounded-ful"
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>

      {/* Desktop view */}
      <div className="hidden sm:block p-1.5 pl-9.5 pt-1 border relative border-white max-w-[191px] rounded-[12px] bg-[#f0f0f0]/90">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full border-0 outline-0 bg-transparent placeholder:font-bold text-sm inline-block satoshi placeholder:text-[#B0B5B5]"
          {...rest}
        />
        <IconButton
          icon={<SearchNormal1 className="size-4" />}
          variant="tertiary"
          className="size-6 sm:size-6 absolute left-1.5 border-transparent top-1/2 -translate-y-1/2 rounded-[6px]"
          onClick={handleSearch}
        />
      </div>
    </React.Fragment>
  );
}

export default TableSearch;

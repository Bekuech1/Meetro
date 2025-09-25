import { createContext, useState, useContext } from "react";

// ---------------------------------------------------------
// Create a context to share tab state (active tab + setter)
// across all Tabs components (List + Panel).
// ---------------------------------------------------------
const TabContext = createContext();

// ---------------------------------------------------------
// Tailwind-based size presets for the tab buttons
// ---------------------------------------------------------
const sizes = {
  sm: "font-medium text-[10px] leading-[14px] py-[2px] px-[8px]",
  md: "text-[12px] leading-[18px] font-medium px-3 py-[6px]",
  lg: "px-3 py-2 font-bold text-sm",
};

// ---------------------------------------------------------
// Tabs root component
// Provides context and keeps track of the active tab
// ---------------------------------------------------------
function Tabs({ defaultTab, children }) {
  // Store the current active tab in local state
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="satoshi">{children}</div>
    </TabContext.Provider>
  );
}

// ---------------------------------------------------------
// Hook for consuming the tab context
// Will throw an error if used outside of <Tabs />
// ---------------------------------------------------------
const useTabs = () => {
  const context = useContext(TabContext);
  if (!context) throw new Error("Tab context was used outside provider");
  return context;
};

// ---------------------------------------------------------
// Tab List (row of buttons)
// Renders a group of tab buttons and handles switching tabs
// ---------------------------------------------------------
// Example usage for "list" prop:
// const tabs = [
//   { id: "overview", label: "Overview" },
//   { id: "tags", label: "Tags" },
//   { id: "settings", label: "Settings" },
//   { id: "analytics", label: "Analytics" },
// ];

function List({ list, size = "md" }) {
  const { setActiveTab, activeTab } = useTabs();

  return (
    <div>
      {/* Container for tab buttons */}
      <div className="p-[2px] bg-[#E5E7E3] rounded-full inline-flex items-center">
        {list?.map((item, i) => (
          <button
            key={i}
            // Highlight active tab, dim inactive ones
            className={`${
              activeTab === item.id
                ? "bg-white text-[#011F0F]"
                : "text-[#B0B5B5]"
            } ${sizes[size]} cursor-pointer rounded-full`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <br />
    </div>
  );
}

// ---------------------------------------------------------
// Tab Panel (content area)
// Only renders its children if its "name" matches the active tab
// ---------------------------------------------------------
function Panel({ name, children }) {
  const { activeTab } = useTabs();
  if (activeTab !== name) return null; // Hide inactive panels
  return children; // Render active panel content
}

// ---------------------------------------------------------
// Attach sub-components to Tabs for declarative API
// Usage: <Tabs.List />, <Tabs.Panel />
// ---------------------------------------------------------
Tabs.List = List;
Tabs.Panel = Panel;

export default Tabs;

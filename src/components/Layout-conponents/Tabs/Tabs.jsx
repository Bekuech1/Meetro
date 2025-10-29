import { createContext, useState, useContext } from "react";
import TagButton from "../Buttons/TagButton";

// ---------------------------------------------------------
// Create a context to share tab state (active tab + setter)
// across all Tabs components (List + Panel).
// ---------------------------------------------------------
const TabContext = createContext();

// ---------------------------------------------------------
// Tailwind-based size presets for the tab buttons
// ---------------------------------------------------------

// ---------------------------------------------------------
// Tabs root component
// Provides context and keeps track of the active tab
// ---------------------------------------------------------
function Tabs({ defaultTab, children, className = "" }) {
  // Store the current active tab in local state
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`satoshi ${className}`}>{children}</div>
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

function List({ list, size = "md", btnStyles = "" }) {
  const { setActiveTab, activeTab } = useTabs();

  return (
    <div>
      {/* Container for tab buttons */}
      <div className="p-[2px] bg-[#E5E7E3] rounded-full inline-flex items-center">
        {list?.map((item, i) => (
          <TagButton
            key={i}
            text={item.label}
            variant="tertiary"
            size={size === "sm" ? "xs" : size}
            className={`${item.id !== activeTab ? "!bg-transparent !text-[#B0B5B5] !border-transparent" : "hover:!bg-white"} satoshi min-w-[87px]`}
            onClick={() => setActiveTab(item.id)}
          />
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

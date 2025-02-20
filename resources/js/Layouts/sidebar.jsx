import React, { useState } from "react";
import sidebarItems from "../lib/sidebarItems.jsx";
import SideBarItem from "./sidebarItems"; // Ensure the correct import
import { Wallet } from "lucide-react";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(null); // Track which menu is open

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle dropdown
  };

  return (
    <aside className="w-64 bg-[#497D74] text-white min-h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Wallet className="h-8 w-8" />
          RechargeAdmin
        </h1>
      </div>

      <nav className="mt-10">
        {sidebarItems.map((item, index) => (
          <SideBarItem
            key={item.text}
            sidebaritem={item}
            isActive={activeIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

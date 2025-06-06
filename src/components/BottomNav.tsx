//src/components/BottomNav.tsx

"use client";

import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState("home");

  const navItems = [
    { id: "home", icon: <GoHomeFill size={24} />, label: "Home" },
    { id: "history", icon: <BsClockHistory size={20} />, label: "History" },
    {
      id: "notifications",
      icon: <AiOutlineBell size={24} />,
      label: "Notifications"
    },
    { id: "menu", icon: <Menu size={24} />, label: "Menu" }
  ];

  return (
    <nav className="nav-tabs p-2 flex justify-between">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          aria-label={item.label}
          aria-current={activeTab === item.id ? "page" : undefined}
          className={cn(
            "google-tab p-2 rounded-2xl",
            activeTab === item.id
              ? "bg-blue-900 text-google-blue"
              : "text-gray-400"
          )}
        >
          {item.icon}
          <span className="sr-only">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;

import React from "react";
import { Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion"; // For smooth animation

export default function SideBarItem({ sidebaritem, isActive, onClick }) {
  const { icon, text, route, children = [] } = sidebaritem;

  return (
    <div className="w-full">
      <button
        onClick={onClick} // Only toggles dropdown, does not navigate
        className={`flex items-center justify-between w-full px-6 py-3 text-gray-300 hover:bg-[#296e62] hover:text-white transition-colors
          ${isActive ? "bg-[#29665c] text-white" : ""}
        `}
      >
        <div className="flex items-center gap-3">
          {icon} {/* ✅ Renders icon correctly */}
          {route ? (
            <Link href={route} className="w-full block">
              <span>{text}</span>
            </Link>
          ) : (
            <span>{text}</span> // If no route, just show text
          )}
        </div>
        {children.length > 0 && <span>{isActive ? "▲" : "▼"}</span>}
      </button>

      {/* Animate dropdown */}
      <AnimatePresence>
        {isActive && children.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#2a5e55] overflow-hidden"
          >
            {children.map((child, idx) => (
              <Link
                key={idx}
                href={child.route}
                className="block px-8 py-2 text-gray-300 hover:text-white hover:bg-[#1d524a] transition-colors"
              >
                {child.text}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

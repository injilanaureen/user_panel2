import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";

export default function SideBarItem({ sidebaritem, isActive, onClick }) {
  const { icon, text, route, children = [] } = sidebaritem;
  const [openSubmenu, setOpenSubmenu] = useState(null);

  return (
    <div className="w-full">
      <button
        onClick={children.length > 0 ? onClick : null}
        className={`flex items-center justify-between w-full px-6 py-3 text-gray-300 hover:bg-[#296e62] hover:text-white transition-colors
          ${isActive ? "bg-[#29665c] text-white" : ""}
        `}
      >
        <div className="flex items-center gap-3">
          {icon}
          {route && children.length === 0 ? (
            <Link href={route} className="w-full block">
              <span>{text}</span>
            </Link>
          ) : (
            <span>{text}</span>
          )}
        </div>
        {children.length > 0 && <span>{isActive ? "▲" : "▼"}</span>}
      </button>

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
              <div key={idx} className="w-full">
                {child.children && child.children.length > 0 ? (
                  <button
                    onClick={() => setOpenSubmenu(openSubmenu === idx ? null : idx)}
                    className="flex items-center justify-between w-full px-8 py-2 text-gray-300 hover:text-white hover:bg-[#1d524a] transition-colors"
                  >
                    <span>{child.text}</span>
                    <span>{openSubmenu === idx ? "▲" : "▼"}</span>
                  </button>
                ) : (
                  <Link
                    href={child.route}
                    className="block px-8 py-2 text-gray-300 hover:text-white hover:bg-[#1d524a] transition-colors"
                  >
                    {child.text}
                  </Link>
                )}

                <AnimatePresence>
                  {openSubmenu === idx && child.children && child.children.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-[#1b4a42] overflow-hidden"
                    >
                      {child.children.map((subChild, subIdx) => (
                        <Link
                          key={subIdx}
                          href={subChild.route}
                          className="block px-10 py-2 text-gray-300 hover:text-white hover:bg-[#154039] transition-colors"
                        >
                          {subChild.text}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

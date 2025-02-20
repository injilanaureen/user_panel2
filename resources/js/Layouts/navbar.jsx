import React, { useState, useRef, useEffect } from "react";
import { usePage, Link } from "@inertiajs/react";

import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Lock, User, Settings, Bell, Search } from "lucide-react"; // Icons

import NotificationItem from "./notificationitem";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = usePage().props; // Fetch user details from Inertia
    console.log(user);  

    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="flex justify-between items-center px-6 py-3 bg-tertiary-color shadow-md relative">
            {/* Navbar Title */}

            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-[#497D74]"
                />
            </div>
   
           

            {/* Profile and notification Section */}

            <div className="flex gap-6 items-center">
                <div className="relative">
                    <button
                        onClick={() =>
                            setIsNotificationOpen(!isNotificationOpen)
                        }
                        className="p-2 hover:bg-gray-100 rounded-full relative"
                    >
                        <Bell className="h-8 w-8 text-gray-600" />

                        <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>

                    {isNotificationOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                            <div className="p-4 border-b">
                                <h3 className="font-semibold">Notifications</h3>
                            </div>

                            <div className="p-2">
                                <NotificationItem
                                    title="New Transaction"
                                    description="₹1,500 recharge successful"
                                    time="2 min ago"
                                />

                                <NotificationItem
                                    title="System Update"
                                    description="New features available"
                                    time="1 hour ago"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile Section */}
                <div className="relative" ref={dropdownRef}>
                    {/* Profile Avatar (Click to Open Dropdown) */}
                    <div
                        className="cursor-pointer flex items-center"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <Avatar className="size-9 border-2 border-white hover:scale-105 transition">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>SS</AvatarFallback>
                        </Avatar>
                    </div>

                    {/* Animated Dropdown */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut",
                                }}
                                className="absolute right-0 mt-5 w-60 bg-white shadow-lg rounded-lg overflow-hidden z-10"
                            >
                                {/* Profile Info Section */}
                                {/* Profile Info Section */}
                                <div className="p-3 text-center bg-secondary-color text-white">
                                    <Avatar className="size-12 mx-auto border-2 border-white">
                                        <AvatarImage
                                            src={
                                                user?.avatar ||
                                                "https://github.com/shadcn.png"
                                            }
                                        />
                                        <AvatarFallback>
                                            {user?.name?.charAt(0) || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <p className="mt-1 text-sm font text-[#29665c] font-semibold">
                                        {user?.name || "User"}
                                    </p>
                                </div>

                                {/* Dropdown Options */}
                                <ul className=" text-gray-800 text-sm">
                                    <li className="px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer">
                                        <User size={18} />
                                        <Link
                                            href=
                                                "/profile/edit"
                                        
                                        >
                                            View Profile
                                        </Link>
                                    </li>
                                    <li className="px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer">
                                        <Lock size={18} />
                                        <Link
                                            href=
                                                "/change-password"
                                        
                                        >
                                            Change Password
                                        </Link>
                                    </li>
                                    <li className="px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer">
                                        <Settings size={18} />
                                        <Link href={route("profile.settings")}>
                                            Settings
                                        </Link>
                                    </li>
                                    <li className="px-4 py-2 text-gray-500 border-t text-xs">
                                        Last Login: {user?.last_login_at}
                                        <br />
                                        Last IP:{" "}
                                        {user?.last_login_ip || "Not Given"}
                                    </li>
                                    <li className="px-4 py-2 flex items-center space-x-2 hover:bg-red-100 cursor-pointer text-red-600 border-t">
                                        <LogOut size={18} />
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    );
}

import Sidebar from "@/Layouts/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { usePage } from "@inertiajs/react";
import Navbar from "@/Layouts/navbar";

export default function MainLayout({ children }) {
  const { url } = usePage(); // Detect route changes
  const { user } = usePage().props;


  return (
    <div className="flex w-full">
{/* <h1>Welcome, {user?.user?.name || "Guest"}!</h1>      Sidebar */}
      <Sidebar />
     <div className=" flex flex-col flex-1 w-full">
      {/* Navbar */}
      <Navbar/>

      {/* Animated Main Content */}
      <div className="p-4 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={url} // Triggers animation when route changes
            initial={{ opacity: 0, x: 50, filter: "blur(10px)" }} // Start blurred and shifted right
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} // Fade in and move to position
            exit={{ opacity: 0, x: -50, filter: "blur(10px)" }} // Fade out and move left
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="w-full"
            >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
            </div>
    </div>
  );
}

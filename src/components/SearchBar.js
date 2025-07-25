"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function SearchBar({ query }) {
  const [search, setSearch] = useState("Find my projects, work, or blogs...");
  const [showSearch, setShowSearch] = useState(false);
  const dropdownRef = useRef(null);
  const searches = [
    { search: "Adi's projects", param: "Adi-projects" },
    { search: "blogs", param: "blogs" },
    { search: "life experiences", param: "experience" },
    { search: "why hire Adi", param: "why-hire-a-Adi" }
  ];
  const path = usePathname();

  const [tooltip, setTooltip] = useState(false);

  useEffect(() => {
    setShowSearch(false);
  }, [search, path]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSearch(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`flex flex-col items-center w-full gap-y-6 font-ropaSans ${
        path === "/" && "relative"
      }`}
      style={{ zIndex: 80 }}
    >
      {path === "/" && (
        <h2 className="text-white text-6xl lg:text-7xl xl:text-8xl absolute -top-20 lg:-top-28">
          (Adi)Search
        </h2>
      )}

      <div
        ref={dropdownRef} // Attach ref to the dropdown container
        className={`flex flex-col items-center shadow-lg ${
          (path !== "/" && "md:absolute w-full top-6 left-48 md:w-2/5 ") ||
          "absolute w-11/12 md:w-2/3 lg:w-2/5"
        } ${showSearch ? "rounded-3xl" : "rounded-full"} py-2 bg-accent-color`}
      >
        <div className="flex items-center w-full px-4">
          <div
            className="bg-no-repeat w-5 h-5 bg-cover"
            style={{
              backgroundImage: showSearch
                ? "url(icons/arrow.svg)"
                : "url(icons/search.svg)",
            }}
            onClick={() => setShowSearch(!showSearch)}
          />
          <div
            className={`flex-grow px-4 py-2 bg-accent-color focus:outline-none ${
              search === "Find my projects, work, or blogs..." ? "text-accent-text" : "text-white"
            }`}
            onClick={() => setShowSearch(!showSearch)}
          >
            {(query && searches.find((item) => item.param === query)?.search) ||
              search}
          </div>

          <div className="flex flex-row justify-center items-center gap-x-2">
            <Link
              className="bg-no-repeat w-5 h-5 bg-cover"
              href={"https://calendar.app.google/8HH1pzxPXiKVxPLQ7"}
              target="_blank"
              onMouseEnter={() => setTooltip(!tooltip)}
              onMouseLeave={() => setTooltip(!tooltip)}
              style={{ backgroundImage: "url(icons/calendar.svg)" }}
            />
            <div
              className={`bg-[#15131B] hidden md:${
                tooltip ? "block" : "hidden"
              } text-white absolute p-2 rounded-xl px-4 text-xs text-nowrap border border-accent-text border-opacity-40 top-12`}
            >
              book a call
            </div>
          </div>
        </div>

        {showSearch && (
          <AnimatePresence>
            <motion.div
              className="w-full overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="border-b border-accent-text mx-4" />
              <h2 className="px-4 font-semibold text-md text-accent-text mt-2">
                Trending searches
              </h2>
              {searches.map((item, idx) => (
                <Link
                  className="px-4 flex flex-row items-center w-full gap-x-2 text-[#E5DFFF] py-2 rounded-lg hover:bg-white hover:bg-opacity-5 transition duration-200"
                  href={`/search?q=${encodeURIComponent(item.param)}`}
                  key={idx}
                  onClick={() => setShowSearch(false)}
                >
                  <div
                    className="bg-no-repeat w-5 h-3 bg-cover"
                    style={{ backgroundImage: "url(icons/trending.svg)" }}
                  />
                  {item.search}
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

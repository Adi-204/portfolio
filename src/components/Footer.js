"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";


export default function Footer() {
  const currentYear = new Date().getFullYear();
  const path = usePathname();
  const [tooltip, setTooltip] = useState(false)
  return (
    <div className="bg-dark-purple-300 flex flex-col w-full text-accent-text font-ropaSans justify-center gap-y-4 py-4 relative">

      <div className="flex flex-row w-full justify-between px-4">
        <div className="flex flex-row gap-x-6">
          <div className="flex items-center px-4">
            <div className="cursor-pointer" onMouseEnter={() => setTooltip(!tooltip)} onMouseLeave={() => setTooltip(!setTooltip)} >India</div>
          </div>
          <div className="cursor-pointer">{currentYear} © Adi Boghawala</div>
        </div>

        {path == "/search" && (
          <Link
            href="/about"
            className="hover:opacity-70 transform transition-all duration-300"
          >
            About
          </Link>
        )}
      </div>
    </div>
  );
}

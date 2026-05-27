"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const PROJECT_LINKS = [
  { href: "/projects/nonlinear-systems/", label: "Nonlinear Systems" },
  { href: "/#projects", label: "Geophysics" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";
  const projectAnchors = pathname?.includes("/projects/nonlinear-systems");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-5">
        <Link href="/" className="font-semibold tracking-tight text-text hover:text-accentBlue">
          richerals
        </Link>
        <nav className="flex items-center gap-5 text-sm text-muted" aria-label="Main">
          <Link href="/" className={isHome ? "text-text" : "hover:text-text"}>
            Home
          </Link>
          <Link href="/#about" className="hover:text-text">
            About
          </Link>
          <div className="relative">
            <button
              type="button"
              className="hover:text-text"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
            >
              Projects ▾
            </button>
            {open && (
              <div className="absolute right-0 top-full mt-1 min-w-[200px] rounded border border-border bg-surface py-1 shadow-lg">
                {PROJECT_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block px-3 py-2 hover:bg-border/50 hover:text-text"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/#contact" className="hover:text-text">
            Contact
          </Link>
          {projectAnchors && (
            <>
              <span className="text-border">|</span>
              <Link href="#simulation" className="hover:text-text">
                Simulation
              </Link>
              <Link href="#potential" className="hover:text-text">
                Energy
              </Link>
              <Link href="#math" className="hover:text-text">
                Model
              </Link>
              <Link href="#chaos" className="hover:text-text">
                Basin
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { primaryNav, clinic } from "@/content/clinic";
import { BookButton } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileOpen, setMobileOpen] = useState(false);
  const frame = useRef<number>(0);

  const sample = useCallback(() => {
    setScrolled(window.scrollY > 40);
    // Determine the theme of the section directly behind the header.
    const x = Math.round(window.innerWidth / 2);
    const y = 74;
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    let node: HTMLElement | null = el;
    let found: string | null = null;
    while (node) {
      const t = node.dataset?.navTheme;
      if (t) {
        found = t;
        break;
      }
      node = node.parentElement;
    }
    setTheme(found === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(sample);
    };
    // Sample after paint so section attributes exist.
    const t = window.setTimeout(sample, 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame.current);
    };
  }, [sample, pathname]);

  const isLight = theme === "light";
  const textColor = isLight ? "text-charcoal" : "text-text-light";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[90] flex justify-center">
        <div
          className={`mt-3 flex w-[min(1360px,94vw)] items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ease-soft sm:px-5 ${
            scrolled
              ? isLight
                ? "glass-light shadow-[0_8px_30px_-14px_rgba(21,24,25,0.25)]"
                : "glass shadow-[0_8px_30px_-14px_rgba(0,0,0,0.5)]"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className={`group flex items-center gap-2.5 ${textColor}`}
            aria-label={`${clinic.name} — home`}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-current/40 font-serif text-sm">
              S
            </span>
            <span className="hidden font-serif text-[15px] leading-tight sm:block">
              Dr. Sibi&rsquo;s Dental
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {primaryNav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-1.5 text-[13px] transition-colors ${textColor} ${
                    active ? "opacity-100" : "opacity-70 hover:opacity-100"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <BookButton
              variant="gold"
              source="header"
              className="hidden !min-h-[42px] !px-5 !py-2 text-[13px] sm:inline-flex"
            >
              Book Appointment
            </BookButton>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-current/30 lg:hidden ${textColor}`}
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

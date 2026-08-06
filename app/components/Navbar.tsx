"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoginButton from "./LoginButton";
import Image from "next/image";

interface NavItem {
  id: number;
  label: string;
  href: string;
}

interface NavbarProps {
  logoText?: string;
  logoImage?: string; // URL or path to logo image
  navItems?: NavItem[];
  fixed?: boolean;
  initialTransparent?: boolean;
}

export default function TouristNavbar({
  logoText = "Valparai Helpline",
  logoImage = "/valparai_logo_3.png", // Default logo path - change this to your actual logo path
  navItems = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "Destinations", href: "/resorts" },
    { id: 3, label: "Packages", href: "/packages" },
    { id: 4, label: "Blog", href: "/blog" },
    { id: 5, label: "Gallery", href: "/gallery" },
    { id: 6, label: "Contact", href: "/contact" },
  ],
  fixed = true,
  initialTransparent = true,
}: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTransparent, setIsTransparent] = useState(initialTransparent);

  useEffect(() => {
    if (!initialTransparent) return;
    const onScroll = () => setIsTransparent(window.scrollY < 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [initialTransparent]);

  const isActive = (href: string) => pathname === href;

  return (
    <nav
      className={`
        ${fixed ? "fixed" : "relative"} top-0 left-0 z-50 w-full
        transition-all duration-300
        ${
          isTransparent
            ? "bg-white/10 backdrop-blur-xl"
            : "bg-black/70 backdrop-blur-xl shadow-lg"
        }
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3">

        {/* Logo - Fixed width to prevent shifting */}
        <div className="flex items-center gap-2 min-w-[140px]">
          <a href="/" className="flex items-center gap-2">
            {/* Logo Image Input */}
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-teal-400 to-emerald-300 flex items-center justify-center overflow-hidden">
              <Image
                src={logoImage}
                alt="Logo"
                width={36}
                height={36}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-sm md:text-base tracking-widest font-semibold text-white whitespace-nowrap">
              {logoText}
            </span>
          </a>
        </div>

        {/* Desktop Nav - Centered with flex-1 */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-6 text-xs uppercase tracking-widest">
          {navItems.map(item => (
            <a
              key={item.id}
              href={item.href}
              className={`
                relative transition-all whitespace-nowrap
                ${
                  isActive(item.href)
                    ? "text-teal-300"
                    : "text-white/80 hover:text-white"
                }
              `}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-teal-300" />
              )}
            </a>
          ))}
        </div>

        {/* Desktop CTA - Fixed width to prevent shifting */}
        <div className="hidden md:flex items-center gap-2 min-w-[140px] justify-end">
          <LoginButton />
          <button className="px-3 py-1.5 text-[10px] tracking-widest rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 text-black font-semibold hover:scale-105 transition whitespace-nowrap">
            Book Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white text-xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          fixed top-0 right-0 h-screen w-[75%] max-w-xs
          bg-black/90 backdrop-blur-xl
          transform transition-transform duration-300
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col gap-6 mt-24 px-8">
          {navItems.map(item => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`
                text-sm uppercase tracking-widest py-2
                ${
                  isActive(item.href)
                    ? "text-teal-300 border-l-2 border-teal-300 pl-3"
                    : "text-white/80"
                }
              `}
            >
              {item.label}
            </a>
          ))}

          <div className="mt-6 space-y-3">
            <button className="w-full py-2 rounded-md bg-gradient-to-r from-teal-400 to-emerald-400 text-black text-sm font-semibold tracking-widest">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
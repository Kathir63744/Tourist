// app/components/Navbar.tsx
"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoginButton from "./LoginButton";
import Image from "next/image";
import Link from "next/link";

interface NavItem {
  id: number;
  label: string;
  href: string;
}

interface NavbarProps {
  logoText?: string;
  logoImage?: string;
  navItems?: NavItem[];
  fixed?: boolean;
  initialTransparent?: boolean;
}

export default function TouristNavbar({
  logoText = "Valparai Helpline",
  logoImage = "/zoy_tours_whatsapp_dp.png",
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
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!initialTransparent) return;
    const onScroll = () => setIsTransparent(window.scrollY < 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [initialTransparent]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
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
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-5 py-2 sm:py-3">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-gradient-to-tr from-teal-400 to-emerald-300 flex items-center justify-center overflow-hidden flex-shrink-0">
                {!imageError ? (
                  <Image
                    src={logoImage}
                    alt="Valparai Helpline Logo"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                    priority
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <span className="text-white font-bold text-lg sm:text-xl">
                    V
                  </span>
                )}
              </div>
              <span className="text-xs sm:text-sm md:text-base tracking-widest font-semibold text-white whitespace-nowrap">
                {logoText}
              </span>
            </Link>
          </div>

          {/* Desktop Nav - Centered */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-5 xl:gap-6 text-xs uppercase tracking-widest">
            {navItems.map((item) => (
              <Link
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
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0 justify-end">
            <LoginButton />
            <button className="px-3 py-1.5 text-[10px] tracking-widest rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 text-black font-semibold hover:scale-105 transition whitespace-nowrap">
              Book Now
            </button>
          </div>

          {/* Mobile / Tablet Toggle */}
          <button
            className="lg:hidden text-white text-xl p-2 hover:bg-white/10 rounded-lg transition relative z-[60]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 bg-black/50 backdrop-blur-sm z-[55]
          transition-opacity duration-300 lg:hidden
          ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div
        className={`
          fixed top-0 right-0 h-screen w-[80%] max-w-sm
          bg-black/95 backdrop-blur-xl z-[55]
          transform transition-transform duration-300 ease-in-out
          lg:hidden overflow-y-auto
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Close button area / spacing */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-white text-2xl p-2 hover:bg-white/10 rounded-lg transition"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-4 px-6 pb-8">
          {/* Nav Links */}
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  text-sm uppercase tracking-widest py-3 px-3 rounded-lg transition
                  ${
                    isActive(item.href)
                      ? "text-teal-300 bg-teal-400/10 border-l-2 border-teal-300"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 my-2" />

          {/* CTA Buttons */}
          <div className="space-y-3">
            <div onClick={() => setIsMenuOpen(false)}>
              <LoginButton />
            </div>
            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-teal-400 to-emerald-400 text-black text-sm font-semibold tracking-widest hover:scale-[1.02] transition">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
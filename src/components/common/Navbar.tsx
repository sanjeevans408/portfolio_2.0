import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-cyan-300/10 bg-[#05090f]/85 backdrop-blur-xl">
      <nav className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6 md:px-8">
        <a href="#" className="font-mono font-bold text-base text-cyan-300 hover:text-emerald-300 transition">
          &lt;sanjeevan.dev /&gt;
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-5 lg:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-xs text-zinc-300 hover:text-emerald-300 transition duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-b border-white/10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block px-8 py-4 border-b border-white/5 hover:text-cyan-400 transition"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

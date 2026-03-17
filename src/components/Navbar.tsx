import { motion } from "motion/react";
import { Youtube, Instagram, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine if we should use the transparent/on-video styling
  const isTransparent = !isScrolled && location.pathname === "/";

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 flex justify-between items-center ${
          isTransparent 
            ? "bg-transparent border-transparent text-white" 
            : "bg-white border-b-2 border-black text-black"
        }`}
      >
        <Link to="/" className="font-display text-3xl tracking-tighter uppercase block">rubioinsideout</Link>

        <div className="hidden md:flex gap-8 font-mono text-sm uppercase tracking-widest font-bold">
          <Link to="/handstands" className="transition-colors hover:opacity-70">Handstands</Link>
          <a href="/#videos" className="transition-colors hover:opacity-70">Videos</a>
          <Link to="/services" className="transition-colors hover:opacity-70">Services</Link>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://youtube.com/@schtefel" 
            target="_blank" 
            rel="noreferrer" 
            className={`p-2 transition-all duration-300 border ${
              isTransparent ? "border-transparent hover:border-white" : "border-transparent hover:bg-black hover:text-white hover:border-black"
            }`}
          >
            <Youtube size={20} />
          </a>
          <a 
            href="https://www.instagram.com/rubioinsideout/" 
            target="_blank" 
            rel="noreferrer" 
            className={`p-2 transition-all duration-300 border ${
              isTransparent ? "border-transparent hover:border-white" : "border-transparent hover:bg-black hover:text-white hover:border-black"
            }`}
          >
            <Instagram size={20} />
          </a>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 border-2 border-black transition-colors ${isTransparent ? "bg-white text-black" : "bg-white text-black"} brutal-shadow`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden text-black"
        >
          <div className="flex flex-col gap-8 font-display text-5xl uppercase tracking-tighter">
            <Link to="/handstands" onClick={() => setIsMenuOpen(false)}>Handstands</Link>
            <a href="/#videos" onClick={() => setIsMenuOpen(false)}>Videos</a>
            <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
          </div>
        </motion.div>
      )}
    </>
  );
}

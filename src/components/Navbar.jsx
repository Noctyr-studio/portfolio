
import { useState } from "react";
import logo from "../assets/logo.png";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    
    <header className="sticky top-0 z-50 border-b border-white/5 bg-neutral-950/70 glass">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-3 py-2">
        
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-3">
          <span className="inline-block h-12 w-12 rounded-xl overflow-hidden">
            <img src={logo} alt="Noctyr Studio" />
          </span>
          <span className="text-lg m-1 font-semibold tracking-wide">
            Noctyr Studio
          </span>
        </a>

        {/* Desktop menu */}
        <ul className="hidden gap-6 text-md md:flex">
          <li><a className="hover:text-white/90 text-white/70" href="#Home">Home</a></li>
          <li><a className="hover:text-white/90 text-white/70" href="#Projects">Projects</a></li>
          <li><a className="hover:text-white/90 text-white/70" href="#Stack">Stack</a></li>
          <li><a className="hover:text-white/90 text-white/70" href="#Activity">Activity</a></li>
          <li><a className="hover:text-white/90 text-white/70" href="#Contact">Contact</a></li>
        </ul>

        {/* Botón mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden rounded-xl border border-white/10 px-3 py-1 text-sm text-white/80"
        >
          Menu
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/5 bg-neutral-950/95 md:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-3 grid grid-cols-2 gap-3 text-sm">
            <li><a className="block rounded-lg px-3 py-2 hover:bg-white/5" href="#Home">Home</a></li>
            <li><a className="block rounded-lg px-3 py-2 hover:bg-white/5" href="#Projects">Projects</a></li>
            <li><a className="block rounded-lg px-3 py-2 hover:bg-white/5" href="#Stack">Stack</a></li>
            <li><a className="block rounded-lg px-3 py-2 hover:bg-white/5" href="#Activity">Activity</a></li>
     
            <li className="col-span-2">
              <a className="block rounded-lg px-3 py-2 hover:bg-white/5" href="#Contact">
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;
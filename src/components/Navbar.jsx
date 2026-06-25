
import { useState } from "react";
import logo from "../assets/logo.png";

function Navbar({
  setShowAuth,
  setAuthMode,
  user,
  setUser,
}) {
  const [open, setOpen] = useState(false);

  function handleLogout() {
  localStorage.removeItem("token");
  setUser(null);
}
  return (
  <header className="relative">
    <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
      {/* Logo */}
      <div className="flex flex-shrink-0 items-center gap-3">
        <span className="inline-block h-12 w-12 overflow-hidden rounded-xl">
          <img src={logo} alt="Noctyr Studio" />
        </span>

        <span className="whitespace-nowrap text-lg font-semibold">
          Noctyr Studio
        </span>
      </div>

      {/* Menú desktop */}
      <ul className="hidden items-center gap-8 md:flex">
        <li><a href="#Home">Home</a></li>
        <li><a href="#Projects">Projects</a></li>
        <li><a href="#Stack">Stack</a></li>
        <li><a href="#Activity">Activity</a></li>
        <li><a href="#Contact">Contact</a></li>
      </ul>

      {/* Usuario desktop */}
      <div className="hidden flex-shrink-0 items-center gap-4 md:flex">
        {user ? (
          <>
            <span className="hidden whitespace-nowrap text-green-400 lg:block">
              {user.email}
            </span>

            <button
              onClick={handleLogout}
              className="text-white/70 hover:text-red-400"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setAuthMode("login");
                setShowAuth(true);
              }}
            >
              Login
            </button>

            <button
              onClick={() => {
                setAuthMode("register");
                setShowAuth(true);
              }}
            >
              Register
            </button>
          </>
        )}
      </div>

      {/* Botón mobile */}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="rounded-xl border border-white/10 px-3 py-1 md:hidden"
      >
        {open ? "Close" : "Menu"}
      </button>
    </nav>

    {/* Dropdown mobile */}
    {open && (
      <div
        id="mobile-menu"
        className="md:hidden border-y border-white/10 bg-black/95 px-6 py-5 backdrop-blur-md"
      >
        <ul className="flex flex-col items-center gap-5">
          <li>
            <a href="#Home" onClick={() => setOpen(false)}>
              Home
            </a>
          </li>

          <li>
            <a href="#Projects" onClick={() => setOpen(false)}>
              Projects
            </a>
          </li>

          <li>
            <a href="#Stack" onClick={() => setOpen(false)}>
              Stack
            </a>
          </li>

          <li>
            <a href="#Activity" onClick={() => setOpen(false)}>
              Activity
            </a>
          </li>

          <li>
            <a href="#Contact" onClick={() => setOpen(false)}>
              Contact
            </a>
          </li>
        </ul>

        <div className="mt-6 border-t border-white/10 pt-5">
          {user ? (
            <div className="flex flex-col items-center gap-4">
              <span className="break-all text-sm text-green-400">
                {user.email}
              </span>

              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="text-white/70 hover:text-red-400"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setAuthMode("login");
                  setShowAuth(true);
                  setOpen(false);
                }}
              >
                Login
              </button>

              <button
                onClick={() => {
                  setAuthMode("register");
                  setShowAuth(true);
                  setOpen(false);
                }}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    )}
  </header>
);
}

export default Navbar;
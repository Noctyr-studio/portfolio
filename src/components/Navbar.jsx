
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
    <nav className="mx-auto max-w-5xl flex items-center justify-between px-6 py-3">

  {/* Logo */}
  <div className="flex items-center gap-3 flex-shrink-0">
    <span className="inline-block h-12 w-12 rounded-xl overflow-hidden">
      <img src={logo} alt="Noctyr Studio" />
    </span>

    <span className="text-lg font-semibold whitespace-nowrap">
      Noctyr Studio
    </span>
  </div>

  {/* Menú */}
  <ul className="hidden md:flex items-center gap-8">
    <li><a href="#Home">Home</a></li>
    <li><a href="#Projects">Projects</a></li>
    <li><a href="#Stack">Stack</a></li>
    <li><a href="#Activity">Activity</a></li>
    <li><a href="#Contact">Contact</a></li>
  </ul>

  {/* Usuario */}
  <div className="hidden md:flex items-center gap-4 flex-shrink-0">
    {user ? (
      <>
        <span className="hidden lg:block text-green-400 whitespace-nowrap">
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

  {/* Mobile */}
  <button
    onClick={() => setOpen(!open)}
    className="md:hidden rounded-xl border border-white/10 px-3 py-1"
  >
    Menu
  </button>

</nav>
  )
}

export default Navbar;
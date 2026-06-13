


import Navbar from "./components/Navbar";
import Hero  from "./components/Hero";
import Projects from "./components/Projects";
import Tech from "./components/Tech";
import Github from "./components/Github";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Auth from "./components/Auth";

import { useEffect, useState } from "react";




function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    fetch("http://localhost:8787/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.email) {
          setUser(data);
        }
      })
      .catch(console.error);
  }, []);
  
  return (
    <>
      <Navbar
        user={user}
        setUser={setUser}
        setShowAuth={setShowAuth}
        setAuthMode={setAuthMode}
      />

      {showAuth && (
        <Auth
          mode={authMode}
          onClose={() => setShowAuth(false)}
          setUser={setUser}
        />
      )}
      <Hero/>
      <Projects />
      <Tech />
      <Github/>
      <Contact/>
      <Footer/>
    </>
  );
}

export default App;



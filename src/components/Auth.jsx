

import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  return (
    password.length >= 8 &&
    /[A-Za-z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

export default function Auth({ mode = "login", onClose, setUser }) {
  const [isLogin, setIsLogin] = useState(mode === "login");

  /// "auth" | "forgot"
  const [authView, setAuthView] = useState("auth");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [turnstileToken, setTurnstileToken] = useState("");

  const [forgotSent, setForgotSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // 👁️ Password visibility button
  function PasswordToggle({ visible, onClick }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-zinc-400
          hover:text-white
          transition
          text-lg
        "
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? "🙈" : "👁️"}
      </button>
    );
  }

  // 🔐 LOGIN / REGISTER
  async function handleSubmit(e) {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert("Invalid email");
      return;
    }

    if (!isValidPassword(password)) {
      alert(
        "Password must be at least 8 characters, include a letter, a number and a special character"
      );
      return;
    }

    // Confirm password only applies to register
    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!turnstileToken) {
      alert("Please complete the captcha");
      return;
    }

    const endpoint = isLogin
      ? `${API_URL}/login`
      : `${API_URL}/register`;

    setLoading(true);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          turnstileToken,
        }),
      });

      console.log("Status:", res.status);

      const data = await res.json();

      console.log("Response:", data);

      if (data.success) {
        alert(
          isLogin
            ? "Login successful"
            : "Account created"
        );

        if (data.token) {
          localStorage.setItem("token", data.token);

          const meRes = await fetch(
            `${API_URL}/me`,
            {
              headers: {
                Authorization: `Bearer ${data.token}`,
              },
            }
          );

          const userData = await meRes.json();

          setUser(userData);
        }

        onClose();
      } else {
        alert(data.error || "Error");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  }

  // 📧 FORGOT PASSWORD
  async function handleForgotPassword(e) {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert("Invalid email");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await res.json();

      console.log("Forgot password response:", data);

      if (res.ok && data.success) {
        setForgotSent(true);
      } else {
        alert(data.error || "Unable to send reset email");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  }

  // 🔄 Go back to Login
  function goToLogin() {
    setAuthView("auth");
    setIsLogin(true);
    setForgotSent(false);
    setPassword("");
    setConfirmPassword("");
    setTurnstileToken("");
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-start
        justify-center
        bg-black/90
        backdrop-blur-sm
        overflow-y-auto
        p-6
        pt-10
        pb-10
      "
      onClick={onClose}
    >

      {/* Glow Effects */}

      <div
        className="
          absolute
          right-0
          top-1/4
          w-[500px]
          h-[500px]
          rounded-full
          bg-green-500/10
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-1/2
          -translate-x-1/2
          w-[600px]
          h-[600px]
          rounded-full
          bg-orange-500/10
          blur-3xl
        "
      />

      <div
        className="
          absolute
          top-0
          left-0
          w-[400px]
          h-[400px]
          rounded-full
          bg-violet-500/10
          blur-3xl
        "
      />

      {/* Card */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-sm
          rounded-3xl
          border
          border-white/10
          bg-neutral-950/80
          backdrop-blur-xl
          p-6
        "
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close */}

        <button
          onClick={onClose}
          className="
            absolute
            top-1
            right-2
            text-zinc-400
            hover:text-white
            transition
            text-xl
          "
        >
          ✕
        </button>

        {/* ============================= */}
        {/* FORGOT PASSWORD */}
        {/* ============================= */}

        {authView === "forgot" ? (
          <>
            <h1 className="text-3xl font-bold text-center mb-4">
              Reset Password
            </h1>

            {forgotSent ? (
              <div className="text-center space-y-5">

                <p className="text-zinc-300 leading-relaxed">
                  If an account exists with that email,
                  we sent you a password reset link.
                </p>

                <p className="text-sm text-zinc-500">
                  Check your inbox and follow the link
                  to create a new password.
                </p>

                <button
                  type="button"
                  onClick={goToLogin}
                  className="
                    w-full
                    rounded-xl
                    bg-violet-600
                    py-3
                    font-semibold
                    transition
                    hover:bg-violet-500
                  "
                >
                  Back to Login
                </button>

              </div>
            ) : (
              <>
                <p className="text-center text-zinc-400 mb-8">
                  Enter your email and we'll send you
                  a password reset link.
                </p>

                <form
                  className="space-y-5"
                  onSubmit={handleForgotPassword}
                >

                  <div>
                    <label className="block mb-2 text-zinc-400">
                      Email
                    </label>

                    <input
                      type="email"
                      value={email}
                      placeholder="your@email.com"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.04]
                        px-4
                        py-3
                        outline-none
                        transition
                        duration-200
                        hover:border-white/20
                        hover:bg-white/[0.06]
                        focus:border-violet-500
                        focus:bg-white/[0.06]
                        focus:ring-2
                        focus:ring-violet-500/20
                      "
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      w-full
                      rounded-xl
                      bg-violet-600
                      py-3
                      font-semibold
                      transition
                      hover:bg-violet-500
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                    "
                  >
                    {loading
                      ? "Sending..."
                      : "Send Reset Link"}
                  </button>

                  <button
                    type="button"
                    onClick={goToLogin}
                    className="
                      w-full
                      text-zinc-400
                      hover:text-white
                      transition
                      text-sm
                    "
                  >
                    ← Back to Login
                  </button>

                </form>
              </>
            )}
          </>
        ) : (

          <>
            {/* Tabs */}

            <div className="flex mb-8 rounded-xl overflow-hidden border border-white/10">

              <button
                onClick={() => {
                  setIsLogin(true);
                  setTurnstileToken("");
                }}
                className={`
                  flex-1
                  py-3
                  transition
                  ${
                    isLogin
                      ? "bg-violet-600 text-white"
                      : "bg-transparent text-zinc-400"
                  }
                `}
              >
                Login
              </button>

              <button
                onClick={() => {
                  setIsLogin(false);
                  setTurnstileToken("");
                }}
                className={`
                  flex-1
                  py-3
                  transition
                  ${
                    !isLogin
                      ? "bg-violet-600 text-white"
                      : "bg-transparent text-zinc-400"
                  }
                `}
              >
                Register
              </button>

            </div>

            <h1 className="text-4xl font-bold text-center mb-8">
              {isLogin
                ? "Welcome Back"
                : "Create Account"}
            </h1>

            <form
              className="space-y-5"
              onSubmit={handleSubmit}
            >

              {/* Email */}

              <div>
                <label className="block mb-2 text-zinc-400">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  placeholder="your@email.com"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    px-4
                    py-3
                    outline-none
                    transition
                    duration-200
                    hover:border-white/20
                    hover:bg-white/[0.06]
                    focus:border-violet-500
                    focus:bg-white/[0.06]
                    focus:ring-2
                    focus:ring-violet-500/20
                  "
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />
              </div>

              {/* Password */}

              <div>
                <label className="block mb-2 text-zinc-400">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="••••••••"
                    value={password}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-white/[0.04]
                      px-4
                      py-3
                      pr-12
                      outline-none
                      transition
                      duration-200
                      hover:border-white/20
                      hover:bg-white/[0.06]
                      focus:border-violet-500
                      focus:bg-white/[0.06]
                      focus:ring-2
                      focus:ring-violet-500/20
                    "
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                  />

                  <PasswordToggle
                    visible={showPassword}
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  />

                </div>
              </div>

              {/* Confirm Password */}

              {!isLogin && (
                <div>
                  <label className="block mb-2 text-zinc-400">
                    Confirm Password
                  </label>

                  <div className="relative">

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="••••••••"
                      value={confirmPassword}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.04]
                        px-4
                        py-3
                        pr-12
                        outline-none
                        transition
                        duration-200
                        hover:border-white/20
                        hover:bg-white/[0.06]
                        focus:border-violet-500
                        focus:ring-2
                        focus:ring-violet-500/20
                      "
                      onChange={(e) =>
                        setConfirmPassword(
                          e.target.value
                        )
                      }
                    />

                    <PasswordToggle
                      visible={showConfirmPassword}
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                    />

                  </div>
                </div>
              )}

              {/* Forgot Password */}

              {isLogin && (
                <div className="text-right -mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthView("forgot");
                      setForgotSent(false);
                    }}
                    className="
                      text-sm
                      text-violet-400
                      hover:text-violet-300
                      transition
                    "
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* CAPTCHA */}

              <div
                className="
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  flex
                  items-center
                  justify-center
                  py-4
                "
              >
                <Turnstile
                siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                onSuccess={(token) => {
                  console.log("Turnstile token:", token);
                  setTurnstileToken(token);
                }}
                onExpire={() => {
                  console.log("Turnstile token expired");
                  setTurnstileToken("");
                  alert("Captcha expired. Please complete it again.");
                }}
                onError={() => {
                  console.error("Turnstile error");
                  setTurnstileToken("");
                  alert("Captcha error. Please try again.");
                }}
              />
              </div>

              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  bg-violet-600
                  py-3
                  font-semibold
                  transition
                  hover:bg-violet-500
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {loading
                  ? "Please wait..."
                  : isLogin
                    ? "Login"
                    : "Create Account"}
              </button>

            </form>
          </>
        )}

      </div>
    </div>
  );
}

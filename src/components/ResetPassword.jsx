
import { useState } from "react";

function isValidPassword(password) {
  return (
    password.length >= 8 &&
    /[A-Za-z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

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

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  // 🔑 Get reset token from URL
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    if (!isValidPassword(password)) {
      setError(
        "Password must be at least 8 characters, include a letter, a number and a special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            newPassword: password,
          }),
        }
      );

      const data = await res.json();

      console.log("Reset password response:", data);

      if (res.ok && data.success) {
        setSuccess(true);

        // Remove token from browser URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      } else {
        setError(
          data.error || "Unable to reset password."
        );
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function goToLogin() {
    window.location.href = "/";
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
      >

        {success ? (
          <>
            <h1 className="text-3xl font-bold text-center mb-4">
              Password Updated
            </h1>

            <div className="text-center space-y-5">

              <p className="text-zinc-300 leading-relaxed">
                Your password has been successfully changed.
              </p>

              <p className="text-sm text-zinc-500">
                You can now log in using your new password.
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
                Back to Home
              </button>

            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center mb-4">
              Reset Password
            </h1>

            <p className="text-center text-zinc-400 mb-8">
              Enter your new password below.
            </p>

            {!token ? (
        <div className="text-center space-y-5">

            <div
            className="
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                px-4
                py-3
                text-sm
                text-red-400
            "
            >
            Invalid or missing reset token.
            </div>

            <p className="text-sm text-zinc-500">
            Please request a new password reset link.
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
            Back to Home
            </button>

        </div>
        ) : (
        <>
            {error && (
            <div
                className="
                mb-5
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                px-4
                py-3
                text-sm
                text-red-400
                text-center
                "
            >
                {error}
            </div>
            )}

            <form
            className="space-y-5"
            onSubmit={handleSubmit}
            >

            {/* New Password */}

            <div>
                <label className="block mb-2 text-zinc-400">
                New Password
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
                    disabled={loading}
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
                    disabled:opacity-50
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

            <div>
                <label className="block mb-2 text-zinc-400">
                Confirm New Password
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
                    disabled={loading}
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
                    disabled:opacity-50
                    "
                    onChange={(e) =>
                    setConfirmPassword(e.target.value)
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
                ? "Updating..."
                : "Update Password"}
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
                ← Back to Home
            </button>

            </form>
        </>
        )}
          </>
        )}

      </div>
    </div>
  );
}
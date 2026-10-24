import React from "react";
import { useForm } from "react-hook-form";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await api.post("/auth/login", formData);
      const { user, accessToken } = response.data.data;
      login(user, accessToken);
      navigate("/");
    } catch (error) {
      setError("root", {
        message:
          error.response?.data?.message ||
          "Authentication failed. Please verify your email and password.",
      });
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#fff8f4]">
      <div className="w-full max-w-md bg-white p-8 md:p-12 rounded border border-[#ede0d7] shadow-xs relative">
        {/* Editorial Top Identity */}
        <div className="text-center space-y-2 mb-8">
          <span className="font-sans-luxury text-[10px] uppercase tracking-[0.28em] text-[#72252e] font-bold">
            Client Portal • Account Access
          </span>
          <h1 className="font-editorial text-3xl md:text-4xl text-[#121110] uppercase tracking-wider">
            Sign In
          </h1>
          <p className="font-sans-luxury text-xs text-[#7c766f] max-w-xs mx-auto">
            Access your private lookbook, order consignments, and bespoke measurements.
          </p>
        </div>

        {/* Global Error Banner */}
        {errors.root && (
          <div className="mb-6 p-3 bg-[#fee2e2] border border-[#fecaca] text-[#991b1b] text-xs font-sans-luxury rounded">
            {errors.root.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-sans-luxury uppercase tracking-wider font-semibold text-[#121110]">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#7c766f] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="name@example.com"
                {...register("email", {
                  required: "Email is required",
                })}
                className={`w-full bg-[#f9ece2]/50 text-[#201a15] text-xs font-sans-luxury pl-10 pr-4 py-3 rounded border focus:outline-none transition-colors ${
                  errors.email
                    ? "border-[#ba1a1a] bg-[#fff5f5]"
                    : "border-[#ede0d7] focus:border-[#121110] focus:bg-white"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-[#ba1a1a] font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-sans-luxury uppercase tracking-wider font-semibold text-[#121110]">
                Security Password
              </label>
              <button
                type="button"
                onClick={() => alert("Password reset link will be sent to your email.")}
                className="text-[10px] uppercase font-sans-luxury tracking-wider text-[#7c766f] hover:text-[#121110] underline"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#7c766f] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                })}
                className={`w-full bg-[#f9ece2]/50 text-[#201a15] text-xs font-sans-luxury pl-10 pr-4 py-3 rounded border focus:outline-none transition-colors ${
                  errors.password
                    ? "border-[#ba1a1a] bg-[#fff5f5]"
                    : "border-[#ede0d7] focus:border-[#121110] focus:bg-white"
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-[11px] text-[#ba1a1a] font-medium">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-[#121110] text-white text-xs font-sans-luxury uppercase tracking-[0.2em] font-bold rounded hover:bg-[#72252e] transition-colors flex items-center justify-center gap-2 active:scale-[0.99] disabled:bg-[#cdc5bd] shadow-xs"
          >
            {isSubmitting ? (
              <span>Signing in...</span>
            ) : (
              <>
                <span>Sign In to Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link to Register */}
        <div className="mt-8 pt-6 border-t border-[#ede0d7] text-center text-xs font-sans-luxury text-[#7c766f]">
          <p>
            New to Aurelia &amp; Noir?{" "}
            <Link
              to="/register"
              className="text-[#121110] font-bold uppercase tracking-wider underline underline-offset-4 hover:text-[#72252e]"
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* Security badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-[#7c766f] uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
          <span>Encrypted Client Session</span>
        </div>
      </div>
    </div>
  );
};

export default Login;

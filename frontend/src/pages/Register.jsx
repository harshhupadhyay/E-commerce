import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { User, Mail, Lock, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

const Register = () => {
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
      const response = await api.post("/auth/register", formData);
      const { user, accessToken } = response.data.data;
      login(user, accessToken);
      navigate("/");
    } catch (error) {
      setError("root", {
        message:
          error.response?.data?.message ||
          "Registration failed. An account with this email may already exist.",
      });
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#fff8f4]">
      <div className="w-full max-w-md bg-white p-8 md:p-12 rounded border border-[#ede0d7] shadow-xs relative">
        {/* Editorial Top Identity */}
        <div className="text-center space-y-2 mb-8">
          <span className="font-sans-luxury text-[10px] uppercase tracking-[0.28em] text-[#72252e] font-bold">
            Haute Édition • Membership
          </span>
          <h1 className="font-editorial text-3xl md:text-4xl text-[#121110] uppercase tracking-wider">
            Create Account
          </h1>
          <p className="font-sans-luxury text-xs text-[#7c766f] max-w-xs mx-auto">
            Create an account to access seasonal capsules, order tracking, and bespoke tailoring.
          </p>
        </div>

        {/* Global Error Banner */}
        {errors.root && (
          <div className="mb-6 p-3 bg-[#fee2e2] border border-[#fecaca] text-[#991b1b] text-xs font-sans-luxury rounded">
            {errors.root.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-sans-luxury uppercase tracking-wider font-semibold text-[#121110]">
              Full Legal Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#7c766f] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Eleanor Vance"
                {...register("name", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className={`w-full bg-[#f9ece2]/50 text-[#201a15] text-xs font-sans-luxury pl-10 pr-4 py-3 rounded border focus:outline-none transition-colors ${
                  errors.name
                    ? "border-[#ba1a1a] bg-[#fff5f5]"
                    : "border-[#ede0d7] focus:border-[#121110] focus:bg-white"
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-[11px] text-[#ba1a1a] font-medium">{errors.name.message}</p>
            )}
          </div>

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
            <label className="block text-[11px] font-sans-luxury uppercase tracking-wider font-semibold text-[#121110]">
              Create Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#7c766f] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="Minimum 6 characters"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
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

          {/* Privileges Note */}
          <div className="p-3 bg-[#fef1e8] rounded border border-[#ede0d7] text-[11px] text-[#4b4640] flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-[#9e7d47] shrink-0 mt-0.5" />
            <span>Includes complimentary express shipping and 30-day global doorstep returns.</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-[#121110] text-white text-xs font-sans-luxury uppercase tracking-[0.2em] font-bold rounded hover:bg-[#72252e] transition-colors flex items-center justify-center gap-2 active:scale-[0.99] disabled:bg-[#cdc5bd] shadow-xs pt-3"
          >
            {isSubmitting ? (
              <span>Creating Client Record...</span>
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link to Login */}
        <div className="mt-8 pt-6 border-t border-[#ede0d7] text-center text-xs font-sans-luxury text-[#7c766f]">
          <p>
            Already an atelier client?{" "}
            <Link
              to="/login"
              className="text-[#121110] font-bold uppercase tracking-wider underline underline-offset-4 hover:text-[#72252e]"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

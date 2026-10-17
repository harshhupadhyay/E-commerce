import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

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
          "Registration failed. Please try again.",
      });
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <div>
          <input
            type="text"
            placeholder="Full Name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div>
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        {/* Server / Root Error */}
        {errors.root && <p>{errors.root.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Register"}
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;

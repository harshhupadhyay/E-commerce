import { useForm } from "react-hook-form";
import api from "../services/api";
import {useAuth} from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (formData) => {
    try {

      const response = await api.post("/auth/login", formData);
      console.log(response.data);

      const { user, accessToken } = response.data.data;
      login(user, accessToken);
      navigate('/')


    } catch (error) {

      setError("root", {
        message:
          error.response?.data?.message ||
          "Login failed. Please try again.",
      });
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        {errors.root && <p>{errors.root.message}</p>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
      </form>
    </div>
  );
};

export default Login;

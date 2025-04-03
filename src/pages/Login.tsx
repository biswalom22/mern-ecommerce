import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import { useAuth } from "../context/AuthContext";
import backgroundImg from "../assets/background-img.jpg";

const Login = () => {
  const loginSchema = z.object({
    identifier: z.string().min(1, "Email or phone is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  type LoginFormData = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { token, user } = await loginUser({
        identifier: data.identifier,
        password: data.password,
      });
      localStorage.setItem("token", token);
      login(token, user);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center bg-light"
      style={{
        background: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "400px",
          background: "rgba(255, 255, 255, 0.6)",
          borderRadius: "10px",
        }}
      >
        <h2 className="text-center mb-3">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email or Phone</label>
            <input
              type="text"
              className="form-control"
              {...register("identifier")}
              placeholder="Enter email or phone"
            />
            {errors.identifier && (
              <div className="text-danger">{errors.identifier.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              {...register("password")}
              placeholder="Enter password"
            />
            {errors.password && (
              <div className="text-danger">{errors.password.message}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <div className="text-center mt-3 cursor-pointer">
          <a
            className="text-decoration-none"
            onClick={() => navigate("/signup")}
          >
            Don't have an account? Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

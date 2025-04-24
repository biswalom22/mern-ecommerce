import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import backgroundImg from "../assets/background-img.jpg";
import { registerUser } from "@/api";
import { useRouter } from "next/router";

const Signup = () => {
  const signupSchema = z.object({
    name: z.string().min(1, "Name is required"),
    emailOrPhone: z.string().min(1, "Email or phone is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  type SignupFormData = z.infer<typeof signupSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const [error, setError] = React.useState("");
  const router = useRouter();

  const onSubmit = async (data: SignupFormData) => {
    try {
      const { name, emailOrPhone, password } = data;
      await registerUser({ name, emailOrPhone, password });
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: `url(${backgroundImg})`,
        backgroundSize: "cover",
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
        <h2 className="text-center mb-4">Sign Up</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" {...register("name")} />
            {errors.name && (
              <div className="text-danger">{errors.name.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Email or Phone</label>
            <input
              type="text"
              className="form-control"
              {...register("emailOrPhone")}
            />
            {errors.emailOrPhone && (
              <div className="text-danger">{errors.emailOrPhone.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              {...register("password")}
            />
            {errors.password && (
              <div className="text-danger">{errors.password.message}</div>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100">
            Sign Up
          </button>
          <p className="text-center mt-3 cursor-pointer">
            Already have an account?{" "}
            <span
              className="text-primary"
              role="button"
              onClick={() => router.push("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

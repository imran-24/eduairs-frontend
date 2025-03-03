import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiUrl } from "../../../utils";
import Input from "../../components/input";
import Spiner from "../../components/spiner";

// Zod validation schema
const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email").min(5, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z.string().min(6, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/register`, data);
      console.log(response.data);
      localStorage.setItem('token', response.data.token);

      window.location.assign('/dashboard');

      // Redirect or handle success logic
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex place-items-center max-w-md w-full mx-auto h-full">
      <div className="flex flex-col gap-4 w-full p-6 border rounded-lg shadow">
        <div>
          <h2 className="text-lg">Register</h2>
          <p className="text-xs font-medium text-neutral-500">Create your own account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          {/* Name Field */}
          <div>
            <Input id="name" label="Name" register={register} required type="text" />
            {errors.name && <p className="text-red-500 text-xs font-medium">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <Input id="email" label="Email" register={register} required type="email" />
            {errors.email && <p className="text-red-500 text-xs font-medium">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <Input  id="password" label="Password" register={register} required type="password" />
            {errors.password && <p className="text-red-500 text-xs font-medium">{errors.password.message}</p>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <Input id="confirm_password" label="Confirm Password" register={register} required type="password" />
            {errors.confirm_password && <p className="text-red-500 text-xs font-medium">{errors.confirm_password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-black p-1 text-white h-9 rounded-lg hover:bg-black/80 disabled:bg-black/50 transition-colors"
            disabled={loading}
          >
            {loading ? <Loader2 className="text-white animate-spin mx-auto"/> : "Register"}
          </button>
        </form>

        {/* Already have an account? */}
        <div className="flex items-center space-x-2 font-medium text-xs">
          <p className="text-gray-700">Already have an account?</p>
          <a href="/login" className="text-indigo-500 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

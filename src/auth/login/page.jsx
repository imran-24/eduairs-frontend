import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiUrl } from "../../../utils";
import Input from "../../components/input";
import { Loader2 } from "lucide-react";

// Zod schema for form validation
const schema = z.object({
  email: z.string().email("Invalid email").min(5, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const [loading, setLoading] = useState(false); // Loading state

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(`${apiUrl}/login`, data);
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      
      window.location.assign('/dashboard');

      // Handle login success (e.g., store token, redirect, etc.)
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex place-items-center max-w-md w-full mx-auto h-full">
      <div className="flex flex-col gap-4 w-full p-6 border rounded-lg shadow">
        <div>
          <h2 className="text-lg">Login</h2>
          <p className=" text-neutral-500 text-xs font-medium">Welcome back</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <div>
            <Input
            type="email"
            id={'email'}
            label={'Email'}
            register={register}
            required
            />
            {errors.email && <p className="text-red-500 text-xs font-medium ">{errors.email.message}</p>}
          </div>

          <div>
          <Input
            type="password"
            id={'password'}
            label={'Password'}
            register={register}
            required
            />
            {errors.password && <p className="text-red-500 text-xs font-medium">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-black p-1 text-white h-9 rounded-lg hover:bg-black/80 disabled:bg-black/50 transition-colors"
            disabled={loading}
          >
            {loading ? <Loader2 className="text-white animate-spin mx-auto"/> : "Login"}
          </button>
        </form>

        <div className="flex items-center space-x-2 font-medium text-xs">
          <p className="text-gray-700">Don't have an account?</p>
          <a href="/register" className="text-indigo-500  hover:underline">
            Create account
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

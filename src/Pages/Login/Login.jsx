// Fetch API
import axios from "axios";

// React and React Router
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// React Hook Form and zod validation
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

// React Hot Toast for notifications
import toast from "react-hot-toast";

// Loader component for loading state
import { Circles } from "react-loader-spinner";
import { UserInfoContext } from "../../Context/UserInfo/UserInfoContextProvider";

const Login = () => {
  // State
  const [loading, setLoading] = useState(false);
  const { addToken } = useContext(UserInfoContext);

  // navigate
  const navigate = useNavigate();

  // Validation schema using zod
  const schema = z.object({
    email: z.string().email("Email not valid").min(1, "Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be less than 20 characters")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must contain at least one letter and one number"
      ),
  });

  // useForm hook from react-hook-form for form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const signup = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        values
      );      
      addToken(data.token);
      localStorage.setItem("token", data.token);
      toast.success(data.message);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20">
      <h1 className="text-blue-700 dark:text-blue-300 text-3xl font-bold mb-10">
        Linked Posts
      </h1>
      <form
        onSubmit={handleSubmit(signup)}
        className="p-10 flex flex-col gap-4 w-3/4 ring-2 ring-blue-50 dark:ring-blue-950 rounded-lg shadow-lg shadow-blue-50 dark:shadow-blue-950"
      >
        <h4 className="text-blue-700 dark:text-blue-300 text-xl">Login Now</h4>
        {/* email */}
        <input
          name="email"
          type="email"
          placeholder="Type your email.."
          className="input input-md w-full *:focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 "
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
        {/* password */}
        <input
          name="password"
          type="password"
          placeholder="Type your password.."
          className="input input-md w-full *:focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 "
          {...register("password")}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}

        {/* submit button */}
        <button className="btn btn-primary btn-md">
          {loading ? (
            <Circles
              height="20"
              width="20"
              color="white"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            "Signin"
          )}
        </button>
        <p className="text-sm text-blue-700 dark:text-blue-300 ">
          Not registered?
          <Link
            to="/register"
            className="text-blue-500 dark:text-blue-400 pl-1"
          >
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

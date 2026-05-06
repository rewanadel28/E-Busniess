// Fetch API
import axios from "axios";

// React and React Router
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// React Hook Form for form handling
import { useForm } from "react-hook-form";

// React Hot Toast for notifications
import toast from "react-hot-toast";

// Loader component for loading state
import { Circles } from "react-loader-spinner";

const Register = () => {
  // State
  const [loading, setLoading] = useState(false);

  // navigate
  const navigate = useNavigate();

  // useForm hook from react-hook-form for form handling
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const signup = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        values
      );
      toast.success(data.message);
      setLoading(false);
      navigate("/login");
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
        <h4 className="text-blue-700 dark:text-blue-300 text-xl">
          Register now
        </h4>
        {/* name */}
        <input
          name="name"
          type="text"
          placeholder="Type your name.."
          className="input input-md w-full *:focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 "
          {...register("name", {
            required: {
              value: true,
              message: "Name is required",
            },
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
            maxLength: {
              value: 20,
              message: "Name must be less than 20 characters",
            },
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Name must contain only letters and spaces",
            },
          })}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
        {/* email */}
        <input
          name="email"
          type="email"
          placeholder="Type your email.."
          className="input input-md w-full *:focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 "
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Email not valide",
            },
          })}
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
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
            minLength: {
              value: 8,
              message: "Password must be at least 6 characters",
            },
            maxLength: {
              value: 20,
              message: "Password must be less than 20 characters",
            },
            pattern: {
              value:
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
              message:
                "Password must contain at least one letter and one number",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
        {/* rePassword */}
        <input
          name="rePassword"
          type="password"
          placeholder="confirm password"
          className="input input-md w-full *:focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 "
          {...register("rePassword", {
            required: {
              value: true,
              message: "Confirm password is required",
            },
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
        />
        {errors.rePassword && (
          <span className="text-red-500 text-sm">
            {errors.rePassword.message}
          </span>
        )}
        {/* dateOfBirth */}
        <input
          name="dateOfBirth"
          type="date"
          placeholder="Select date"
          className="input w-full *:focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 "
          {...register("dateOfBirth", {
            required: {
              value: true,
              message: "Date of birth is required",
            },
            validate: (value) => {
              const today = new Date();
              const selectedDate = new Date(value);
              const age = today.getFullYear() - selectedDate.getFullYear();
              return age >= 18 || "You must be at least 18 years old";
            },
          })}
        />
        {errors.dateOfBirth && (
          <span className="text-red-500 text-sm">
            {errors.dateOfBirth.message}
          </span>
        )}
        {/* gender */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="male"
              id="male"
              className="radio radio-sm *:focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 "
              {...register("gender", {
                required: {
                  value: true,
                  message: "gender is required",
                },
              })}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="female"
              id="female"
              className="radio radio-md *:focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 "
              {...register("gender", {
                required: {
                  value: true,
                  message: "gender is required",
                },
              })}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        {errors.gender && (
          <span className="text-red-500 text-sm">{errors.gender.message}</span>
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
            "Register"
          )}
        </button>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 dark:text-blue-400">
            login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

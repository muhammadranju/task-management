import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/slices/authSlice";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const Register = () => {
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (token !== null) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(registerUser(form)).unwrap();
      toast.success("Registration successful!");
      setForm({ username: "", email: "", password: "" });

      // Redirect user to login after successful registration
      setTimeout(() => {
        navigate("/auth/login");
      }, 1500);
    } catch (error) {
      if (error === "User already exists") {
        toast.error("Email already exists");
      } else {
        toast.error("Something went wrong! Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-6">
      <Helmet>
        <title>Register | Task Manager</title>
      </Helmet>

      <div className="flex justify-center items-center lg:mt-64 mt-20">
        <div className="w-96 max-w-lg bg-slate-800 rounded-lg overflow-hidden shadow-lg">
          <div className="p-8">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl text-center font-semibold text-slate-100 leading-tight">
                Create an account
              </h1>
              <p className="text-sm text-slate-200 text-center mt-2">
                Already have an account?
                <Link
                  to="/auth/login"
                  className="text-blue-500 hover:underline font-medium ml-1"
                >
                  Login
                </Link>
              </p>
            </div>

            {/* Register Form */}
            <form
              id="registerForm"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Username Input */}
              <div className="bg-slate-800 rounded-lg max-w-md mx-auto py-2">
                <div className="relative bg-inherit">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="peer bg-transparent h-12 w-full rounded-lg text-slate-100 placeholder-transparent ring-2 ring-slate-300 px-4 focus:ring-sky-500 focus:outline-none focus:border-sky-600 transition-all"
                    placeholder="Enter your username"
                    required
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                  />
                  <label
                    htmlFor="username"
                    className="absolute cursor-text left-4 -top-3 text-sm text-slate-600 bg-slate-800 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                  >
                    Username
                  </label>
                </div>
              </div>

              {/* Email Input */}
              <div className="bg-slate-800 rounded-lg max-w-md mx-auto py-2">
                <div className="relative bg-inherit">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="peer bg-transparent h-12 w-full rounded-lg text-slate-100 placeholder-transparent ring-2 ring-slate-300 px-4 focus:ring-sky-500 focus:outline-none focus:border-sky-600 transition-all"
                    placeholder="Enter your email"
                    required
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                  <label
                    htmlFor="email"
                    className="absolute cursor-text left-4 -top-3 text-sm text-slate-600 bg-slate-800 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                  >
                    Email
                  </label>
                </div>
              </div>

              {/* Password Input */}
              <div className="bg-slate-800 rounded-lg max-w-md mx-auto py-2">
                <div className="relative bg-inherit">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="peer bg-transparent h-12 w-full rounded-lg text-slate-100 placeholder-transparent ring-2 ring-slate-300 px-4 focus:ring-sky-500 focus:outline-none focus:border-sky-600 transition-all"
                    placeholder="Enter your password"
                    required
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                  <label
                    htmlFor="password"
                    className="absolute cursor-text left-4 -top-3 text-sm text-slate-600 bg-slate-800 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                  >
                    Password
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full p-3 font-bold bg-slate-100 text-black rounded-lg hover:bg-slate-300 focus:outline-none transition-colors"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

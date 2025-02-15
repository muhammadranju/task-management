import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../../utils/slices/authSlice";
import { Helmet } from "react-helmet";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "" });
  const token = localStorage.getItem("token");

  if (token !== null) {
    return <Navigate to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-6">
      <Helmet>
        <title>Login | Task Manager</title>
      </Helmet>

      <div className="flex justify-center items-center lg:mt-64 mt-20">
        <div className="w-96 max-w-lg bg-slate-800 rounded-lg overflow-hidden shadow-lg">
          <div className="p-8">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl text-center font-semibold text-slate-100 leading-tight">
                Welcome back!
              </h1>
              <p className="text-sm text-slate-200 text-center mt-2">
                Don&#39;t have an account?
                <Link
                  to="/auth/register"
                  className="text-blue-500 hover:underline font-medium"
                >
                  Register
                </Link>
              </p>
            </div>

            {/* Login Form */}

            <form id="loginForm" onSubmit={handleSubmit} className="space-y-4">
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
                    Enter your email
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
                {error && <p className="text-red-500">{error.message}</p>}
              </div>
              {/* Remember Me and Forgot Password */}
              <div className="flex justify-between items-center">
                <Link
                  to="/auth/forgot-password"
                  className="text-sm text-blue-500 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full p-3 font-bold bg-slate-100 text-black rounded-lg hover:bg-slate-300 focus:outline-none transition-colors"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

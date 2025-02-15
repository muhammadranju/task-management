import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../utils/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(forgotPassword(email));

    if (error?.status === 404) {
      toast.error("Email not found");
      return;
    } else {
      toast.success("Password reset link sent to email");
      setEmail("");
      navigate("/auth/password-message");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-6">
      {/* <Header /> */}
      <Helmet>
        <title>Forgot Password | Task Manager</title>
      </Helmet>

      <div className="flex justify-center items-center lg:mt-64 mt-20">
        <div className="w-96 max-w-lg bg-slate-800 rounded-lg overflow-hidden shadow-lg">
          <div className="p-8">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl text-center font-semibold text-slate-100 leading-tight">
                Forgot Password
              </h1>
              <p className="text-sm text-slate-200 text-center mt-2">
                You have already remembered your password?
                <Link
                  to="/auth/login"
                  className="text-blue-500 hover:underline font-medium"
                >
                  Login
                </Link>
              </p>
            </div>

            {/* Forgot Password Form */}
            <form id="loginForm" onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-slate-800 rounded-lg max-w-md mx-auto py-2">
                <div className="relative bg-inherit">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="peer bg-transparent h-12 w-full rounded-lg text-slate-100 placeholder-transparent ring-2 ring-slate-300 px-4 focus:ring-sky-500 focus:outline-none focus:border-sky-600 transition-all"
                    placeholder="Enter your email"
                    required=""
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label
                    htmlFor="email"
                    className="absolute cursor-text left-4 -top-3 text-sm text-slate-600 bg-slate-800 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                  >
                    Email
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full p-3 font-bold bg-slate-100 text-black rounded-lg hover:bg-slate-300 focus:outline-none transition-colors"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../utils/slices/authSlice";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ token, newPassword })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Password successfully reset");
        setTimeout(() => navigate("/auth/login"), 2000);
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-6">
      {/* <Header /> */}
      <Helmet>
        <title>Reset Password | Task Manager</title>
      </Helmet>

      <div className="flex justify-center items-center lg:mt-64 mt-20">
        <div className="w-96 max-w-lg bg-slate-800 rounded-lg overflow-hidden shadow-lg">
          <div className="p-8">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl text-center font-semibold text-slate-100 leading-tight">
                Reset Your Password
              </h1>
            </div>

            {/* Login Form */}
            <form id="loginForm" onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-slate-800 rounded-lg max-w-md mx-auto py-2">
                <div className="relative bg-inherit">
                  <input
                    type="text"
                    id="password"
                    name="password"
                    className="peer bg-transparent h-12 w-full rounded-lg text-slate-100 placeholder-transparent ring-2 ring-slate-300 px-4 focus:ring-sky-500 focus:outline-none focus:border-sky-600 transition-all"
                    placeholder="Enter your password"
                    required=""
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <label
                    htmlFor="password"
                    className="absolute cursor-text left-4 -top-3 text-sm text-slate-600 bg-slate-800 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                  >
                    New Password
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full p-3 font-bold bg-slate-100 text-black rounded-lg hover:bg-slate-300 focus:outline-none transition-colors"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

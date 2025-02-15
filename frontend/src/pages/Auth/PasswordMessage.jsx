import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const PasswordMessage = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-5">
      <Helmet>
        <title>Link Sended | Task Manager</title>
      </Helmet>

      <div className="flex justify-center items-center lg:mt-64 mt-20">
        <div className="w-[400px] max-w-xl bg-slate-800 rounded-lg overflow-hidden shadow-lg">
          <div className="p-8">
            {/* Header Section */}
            <div className="mb-3 flex flex-col items-center gap-y-1 justify-between">
              <img src="/logo.png" alt="logo" className="w-16 h-16 mb-5" />
              <h1 className="text-2xl text-center font-bold text-slate-100 leading-tight">
                Password Reset Link Sent!
              </h1>
              <p className="text-sm text-slate-200 text-center mt-2 mb-5 ">
                Check your email for the password reset link.
              </p>
              <Link to="/auth/login">
                <button className="w-full p-3 font-bold bg-slate-100 text-black rounded-lg hover:bg-slate-300 focus:outline-none transition-colors">
                  Go to Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordMessage;

import App from "../App";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Login from "../pages/Auth/Login";
import PasswordMessage from "../pages/Auth/PasswordMessage";
import Register from "../pages/Auth/Register";
import ResetPassword from "../pages/Auth/ResetPassword";
import Tasks from "../pages/Tasks/Tasks";
import { createBrowserRouter } from "react-router-dom";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Tasks />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/auth/reset-password/:token",
        element: <ResetPassword />,
      },
      {
        path: "/auth/password-message",
        element: <PasswordMessage />,
      },
    ],
  },
]);

export default Router;

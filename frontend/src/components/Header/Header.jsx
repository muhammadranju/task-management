/* eslint-disable react/prop-types */
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CgProfile } from "react-icons/cg";
import { FaChevronDown } from "react-icons/fa";
import { MdAccountBox } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../utils/slices/authSlice";

const Header = ({ setProfileModel }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (token === null || user === null) {
    return navigate("/auth/login");
  }

  const handelLogout = () => {
    dispatch(logout());
    return navigate("/auth/login");
  };

  return (
    <header className="w-full max-w-6xl bg-slate-800 text-white p-4 rounded-2xl shadow-lg mb-6 flex justify-between items-center">
      <Link to={"/"}>
        <div className="flex items-center gap-x-1">
          <img src="./logo.png" alt="logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold">Task Manager</h1>
        </div>
      </Link>

      {token ? (
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex items-center space-x-2 bg-slate-700 text-slate-100 px-4 py-2 rounded-lg hover:bg-slate-600">
              <span>Profile</span>
              <FaChevronDown className="w-4 h-4" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right text-slate-100 bg-slate-800 divide-y divide-slate-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-4 py-3 ">
                <p className="text-sm flex items-center ">
                  <MdAccountBox className="mr-2 text-xl" />
                  {user?.username}
                </p>
              </div>
              <div className="py-2 px-2 space-y-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setProfileModel(true)}
                      className={`${
                        active ? "bg-slate-700" : ""
                      } flex items-center px-4 py-2 w-full text-left rounded-md text-sm `}
                    >
                      <CgProfile className="mr-2 text-xl" />
                      Profile
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handelLogout}
                      className={`${
                        active ? "bg-red-600" : ""
                      }  px-4 py-2 w-full text-left text-sm  rounded-md bg-red-500 flex items-center`}
                    >
                      <TbLogout className="mr-2 text-xl" />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <>
          {" "}
          <Link to="/auth/login">
            <button className="flex items-center bg-slate-100 text-black font-bold px-4 py-2 rounded-lg hover:bg-slate-300">
              {/* <FaPlus className="mr-2" />  */}
              Login
            </button>
          </Link>
        </>
      )}
    </header>
  );
};

export default Header;

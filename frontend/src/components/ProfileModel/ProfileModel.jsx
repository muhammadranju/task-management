/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../utils/slices/authSlice";

const ProfileModel = ({ setProfileModel }) => {
  const [activeProfileTab, setActiveProfileTab] = useState(true);
  const [activeUpdateTab, setActiveUpdateTab] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ userProfile State
  const [userProfile, setUserProfile] = useState({
    username: user?.username,
    email: user?.email,
  });

  // ✅ Redux dispatch
  const dispatch = useDispatch();

  // ✅ Error State
  const { error: userError } = useSelector((state) => state.auth);

  // ✅ Update Profile Function
  const handelUpdateProfile = async () => {
    const profile = await dispatch(updateProfile(userProfile));
    if (userError?.status === 400) {
      return toast.error(userError?.message);
    }

    if (!userError) {
      localStorage.removeItem("user", JSON.stringify(user));
      setUserProfile(profile?.payload.data.user);
      localStorage.setItem("user", JSON.stringify(userProfile));
      setProfileModel(false);
      return toast.success("Profile updated successfully");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-slate-800 p-6 rounded-lg w-96 text-slate-100 relative">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => (
              setActiveProfileTab(true), setActiveUpdateTab(false)
            )}
            className="text-base p-1 font-bold flex items-center"
          >
            Profile <ImProfile className="ml-2 text-xl" />
          </button>
          <button
            onClick={() => (
              setActiveUpdateTab(true), setActiveProfileTab(false)
            )}
            className="text-base p-1 font-bold flex items-center"
          >
            Update
            <FaEdit className="ml-2 text-xl" />
          </button>
        </div>
        <button
          onClick={() => setProfileModel(false)}
          className="absolute right-0 top-0"
        >
          <IoIosCloseCircleOutline className="mb-2 text-2xl" />
        </button>
        {
          /* Profile Tab */
          activeUpdateTab && (
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full p-2 mb-2 bg-slate-700  border border-slate-500 rounded-lg"
                defaultValue={user?.username}
                onChange={(e) =>
                  setUserProfile({
                    ...userProfile,
                    username: e.target.value,
                  })
                }
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 mb-2 bg-slate-700  border border-slate-500 rounded-lg"
                defaultValue={user?.email}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, email: e.target.value })
                }
              />

              <button
                onClick={handelUpdateProfile}
                className="w-full bg-slate-100 text-black font-bold py-2 rounded-lg hover:bg-slate-300"
              >
                Update Profile
              </button>
            </div>
          )
        }
        {
          /* Update Tab */
          activeProfileTab && (
            <div className="flex flex-col ">
              <h4 className="text-lg font-bold ">
                Welcome back, {user?.username}
              </h4>
              <p className="text-lg flex items-center text-slate-400">
                <CgProfile className="mr-2 text-xl" />
                {user?.username}
              </p>
              <p className="text-lg flex items-center text-slate-400">
                <MdOutlineEmail className="mr-2 text-xl" />
                {user?.email}
              </p>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default ProfileModel;

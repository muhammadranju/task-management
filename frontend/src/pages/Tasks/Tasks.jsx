import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import AddTasks from "../../components/AddTasks/AddTasks";
import GetTasks from "../../components/GetTasks/GetTasks";
import Header from "../../components/Header/Header";
import ProfileModel from "../../components/ProfileModel/ProfileModel";
import TaskSkeleton from "../../components/TaskSkeleton/TaskSkeleton";
import UpdateTask from "../../components/UpdateTask/UpdateTask";
import {
  fetchTasks,
  setCurrentPage,
  setSearchQuery,
} from "../../utils/slices/taskSlice";

export default function TaskManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileModel, setProfileModel] = useState(false);
  const [openTaskUpdateModal, setOpenTaskUpdateModal] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState(true);
  const [activeUpdateTab, setActiveUpdateTab] = useState(false);
  const [getTask, setGetTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Token from localStorage
  const token = localStorage.getItem("token");

  // ✅ taskFrom State
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    status: "pending",
    dueDate: "",
  });

  // ✅ Pagination
  const TASKS_PER_PAGE = 4;

  // ✅ Redux dispatch
  const dispatch = useDispatch();
  const { tasks, searchQuery, loading, currentPage, totalPages } = useSelector(
    (state) => state.tasks
  );

  // ✅ Fetch Tasks on Component Mount
  useEffect(() => {
    dispatch(fetchTasks({ page: currentPage, limit: TASKS_PER_PAGE })); // Fetch tasks when component mounts
  }, [dispatch, searchQuery, currentPage, isLoading]);

  if (token === null) {
    return <Navigate to="/auth/login" />;
  }

  // ✅ Update Task Function
  const filteredTasks = tasks.tasks?.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center">
      {/* Helmet */}
      <Helmet>
        <title>Home | Task Manager</title>
      </Helmet>

      {/* Header Section */}
      <Header setProfileModel={setProfileModel} />
      <div className="w-full max-w-3xl bg-slate-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Tasks</h2>
        {/* Search and Add Task */}
        <div className="flex justify-between mb-4 gap-x-2">
          <div className="flex items-center bg-slate-700 p-2 rounded-lg  lg:w-3/4">
            <FaSearch className="text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full bg-transparent outline-none text-white"
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
          </div>
          {/* Add Task Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="lg:flex items-center bg-slate-100 text-black font-bold px-4 lg:py-2 rounded-lg hover:bg-slate-300 hidden "
          >
            <FaPlus className="mr-2" /> Add Task
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="lg:hidden flex items-center bg-slate-100 text-black font-bold px-4 lg:py-2 rounded-lg hover:bg-slate-300"
          >
            <FaPlus className="mr-2" /> Add
          </button>
        </div>

        {/* Task List */}
        {loading && (
          <div className="space-y-2">
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
          </div>
        )}

        {loading ? (
          <></>
        ) : filteredTasks?.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4 text-center">
              No tasks found
            </h2>
            <p className="text-center text-gray-500 mb-4">
              Try searching for something else
              <br />
              or create a new task
            </p>
          </div>
        ) : (
          // ✅ GetTasks Component
          <GetTasks
            filteredTasks={filteredTasks}
            setGetTask={setGetTask}
            setOpenTaskUpdateModal={setOpenTaskUpdateModal}
            setTaskForm={setTaskForm}
            setIsLoading={setIsLoading}
          />
        )}

        {/* ✅ Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            disabled={currentPage === 1}
            className="disabled:opacity-50 bg-slate-100 text-black font-bold px-4 py-2 rounded-lg hover:bg-slate-300"
          >
            Prev
          </button>
          <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            disabled={currentPage >= totalPages}
            className="disabled:opacity-50 bg-slate-100 text-black font-bold px-4 py-2 rounded-lg hover:bg-slate-300"
          >
            Next
          </button>
        </div>
      </div>

      {/* Profile Modal */}
      {profileModel && (
        <ProfileModel
          activeProfileTab={activeProfileTab}
          activeUpdateTab={activeUpdateTab}
          setActiveProfileTab={setActiveProfileTab}
          setActiveUpdateTab={setActiveUpdateTab}
          setProfileModel={setProfileModel}
        />
      )}

      {/* Task Modal */}
      {isModalOpen && (
        <AddTasks
          setIsModalOpen={setIsModalOpen}
          setTaskForm={setTaskForm}
          taskForm={taskForm}
          setIsLoading={setIsLoading}
        />
      )}
      {/* Update Task Modal */}
      {openTaskUpdateModal && (
        <UpdateTask
          taskForm={taskForm}
          setTaskForm={setTaskForm}
          setOpenTaskUpdateModal={setOpenTaskUpdateModal}
          getTask={getTask}
          setGetTask={setGetTask}
          key={getTask?._id}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  );
}

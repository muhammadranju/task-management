/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { updateTask } from "../../utils/slices/taskSlice";

const UpdateTask = ({
  setOpenTaskUpdateModal,
  setGetTask,
  setTaskForm,
  getTask,
  taskForm,
  setIsLoading,
}) => {
  const dispatch = useDispatch();
  const handelUpdateTask = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await dispatch(
        updateTask({ taskId: getTask?._id, updatedData: taskForm })
      );
    } catch (error) {
      console.error("Update Task Error:", error);
    } finally {
      toast.success("Task updated successfully");
      setOpenTaskUpdateModal(false);
      setGetTask(null);
      setTaskForm(null);
      setIsLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={handelUpdateTask}
        className="bg-slate-800 p-6 rounded-lg w-96 text-slate-100 relative"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold ">Update Task</h2>
        </div>
        <button
          onClick={() => (
            setOpenTaskUpdateModal(false), setGetTask(null), setTaskForm(null)
          )}
          className="absolute right-0 top-0"
        >
          <IoIosCloseCircleOutline className="mb-2 text-2xl" />
        </button>
        <input
          type="text"
          placeholder="Task Title"
          className="w-full p-2 mb-2 bg-slate-700  border border-slate-500 rounded-lg"
          defaultValue={getTask?.title}
          onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
        />
        <textarea
          placeholder="Task Description"
          className="w-full p-2 mb-2 bg-slate-700  border border-slate-500 rounded-lg"
          defaultValue={getTask?.description}
          onChange={(e) =>
            setTaskForm({ ...taskForm, description: e.target.value })
          }
        ></textarea>
        <select
          defaultValue={getTask?.status}
          onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}
          className="w-full p-2 mb-2 bg-slate-700  border border-slate-500 rounded-lg"
        >
          {/* {console.log()} */}

          {getTask?.status === "pending" ? (
            <>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </>
          ) : (
            <>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </>
          )}
          {/* <option value="Pending"></option>
                     <option value="Completed">Completed</option> */}
        </select>
        <input
          type="date"
          className="w-full p-2 mb-2 bg-slate-700  border border-slate-500 rounded-lg"
          defaultValue={getTask?.dueDate}
          onChange={(e) =>
            setTaskForm({ ...taskForm, dueDate: e.target.value })
          }
        />
        <button className="w-full bg-slate-100 text-black font-bold py-2 rounded-lg hover:bg-slate-300">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;

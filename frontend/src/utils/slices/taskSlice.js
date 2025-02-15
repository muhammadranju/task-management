import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/tasks`;

// Fetch all tasks for authenticated user
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async ({ page, limit }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      if (!token) return thunkAPI.rejectWithValue("User not authenticated");

      const response = await axios.get(
        `${BASE_URL}?page=${page}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return {
        tasks: response.data.data,
        totalPages: response.data.totalPages, // ✅ Added total pages from backend
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch tasks"
      );
    }
  }
);

// Add a new task
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (taskData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      if (!token) return thunkAPI.rejectWithValue("User not authenticated");

      const response = await axios.post(BASE_URL, taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.data; // Newly created task
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to add task"
      );
    }
  }
);

// Find a task
export const fetchSingleTask = createAsyncThunk(
  "tasks/getTask",
  async (taskId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      if (!token) return thunkAPI.rejectWithValue("User not authenticated");

      const response = await axios.get(`${BASE_URL}/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data; // Single task
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to delete task"
      );
    }
  }
);

// Delete a task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      if (!token) return thunkAPI.rejectWithValue("User not authenticated");

      await axios.delete(`${BASE_URL}/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return taskId; // Return deleted task ID to remove it from state
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to delete task"
      );
    }
  }
);

// Update an existing task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, updatedData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      if (!token) return thunkAPI.rejectWithValue("User not authenticated");

      const response = await axios.put(`${BASE_URL}/${taskId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data; // Updated task
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to update task"
      );
    }
  }
);

// Redux Slice
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    searchQuery: "", // ✅ Added searchQuery state
    loading: false,
    error: null,
    currentPage: 1, // ✅ Added pagination state
    totalPages: 1, // ✅ Tracks total pages
  },
  reducers: {
    // ✅ Added setSearchQuery reducer to update search state
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload; // ✅ Updates current page
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.totalPages = action.payload.totalPages; // ✅ Store total pages from response
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Task (Optimistic UI Update)
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(fetchSingleTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleTask.fulfilled, (state, action) => {
        state.loading = false;
        state.singleTask = action.payload;
      })
      .addCase(fetchSingleTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Task (Remove from State)
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update Task (Find and update in State)
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// ✅ Export setSearchQuery action
export const { setSearchQuery, setCurrentPage } = taskSlice.actions;
export default taskSlice.reducer;

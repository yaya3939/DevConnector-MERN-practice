import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { alertAsync } from "./alert";
import { noAuthenticated } from "./auth";
import axios from "axios";

export const getCurrentProfile = createAsyncThunk(
  "profile/getCurrent/matchFulfilled/Profile",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/profile/me");
      return res.data;
    } catch (err) {
      const error = err.response;
      return rejectWithValue({
        status: error.status,
        statusText: error.statusText,
      });
    }
  }
);

export const getProfiles = createAsyncThunk(
  "profile/getProfiles/Profile",
  async (arg, { rejectWithValue, dispatch }) => {
    dispatch(clearProfile());
    try {
      const res = await axios.get("/api/profile");
      return res.data;
    } catch (err) {
      const error = err.response;
      return rejectWithValue({
        status: error.status,
        statusText: error.statusText,
      });
    }
  }
);

export const getProfileById = createAsyncThunk(
  "profile/getUserProfile/matchFulfilled/Profile",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/profile/user/${userId}`);
      return res.data;
    } catch (err) {
      const error = err.response;
      return rejectWithValue({
        status: error.status,
        statusText: error.statusText,
      });
    }
  }
);

export const getGithubRepos = createAsyncThunk(
  "profile/getGithubRepos/Profile",
  async (username, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/profile/github/${username}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createProfile = createAsyncThunk(
  "profile/CreateProfile/matchFulfilled/Profile",
  async (formData, { rejectWithValue, dispatch, getState }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/profile", formData, config);

      const myprofile = getState().profile.myprofile;

      dispatch(
        alertAsync(
          myprofile === null ? "Profile Created" : "Profile Updated",
          "success",
          5000
        )
      );

      dispatch(getCurrentProfile());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addE = createAsyncThunk(
  "profile/addE/matchFulfilled/Profile",
  async ({ field, formData }, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put(`/api/profile/${field}`, formData, config);

      dispatch(alertAsync(`${field} added`, "success", 5000));

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteE = createAsyncThunk(
  "profile/deleteE/matchFulfilled/Profile",
  async ({ field, id }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(`/api/profile/${field}/${id}`);

      dispatch(alertAsync(`${field} removed`, "success", 5000));

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "profile/deleteAccount",
  async (arg, { rejectWithValue, dispatch }) => {
    if (window.confirm("Are you sure? This can NOT be undone!")) {
      try {
        await axios.delete(`/api/profile`);
        dispatch(clearProfile());
        dispatch(noAuthenticated());
        dispatch(alertAsync("Your account has been permanantly deleted", 5000));
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  }
);

const initialState = {
  myprofile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile(state, action) {
      state.myprofile = null;
      state.loading = false;
      state.repos = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCurrentProfile.rejected, (state, action) => {
        return {
          ...state,
          myprofile: null,
          error: action.payload,
          loading: false,
        };
      })
      .addCase(getProfiles.fulfilled, (state, action) => {
        state.profiles = action.payload;
        state.loading = false;
      })
      .addCase(getGithubRepos.fulfilled, (state, action) => {
        state.repos = action.payload;
        state.loading = false;
      })
      .addMatcher(
        (action) => action.type.endsWith("matchFulfilled/Profile/fulfilled"),
        (state, action) => {
          return {
            ...state,
            myprofile: action.payload,
            error: {},
            loading: false,
          };
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("Profile/rejected"),
        (state, action) => {
          return {
            ...state,
            error: action.payload,
            loading: false,
          };
        }
      );
  },
});

export const { clearProfile } = profileSlice.actions;

export default profileSlice.reducer;

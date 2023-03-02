import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearProfile } from "./profile";
import axios from "axios";

import setAuthToken from "../utils/setAuthToken";

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (arg, { rejectWithValue, dispatch }) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const response = await axios.get("/api/auth");
      return response.data;
    } catch (err) {
      dispatch(noAuthenticated());
      return rejectWithValue(err.response.data);
    }
  }
  //if no params, it will always be fulfilled, if no reje..., it will always be rejected
  //i even can't insert notation above under the params??!! it will make proxy for get route don't work!!
);

export const registerUser_matcher = createAsyncThunk(
  "auth/registerUser_auth",
  async (userInfo, { rejectWithValue, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(userInfo);

    try {
      const response = await axios.post("/api/users", body, config);
      return response.data;
    } catch (err) {
      dispatch(noAuthenticated());
      return rejectWithValue(err.response.data);
    }
  }
);

export const login_matcher = createAsyncThunk(
  "auth/login_auth",
  async (userInfo, { rejectWithValue, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(userInfo);

    try {
      const response = await axios.post("/api/auth", body, config);
      return response.data;
    } catch (err) {
      dispatch(noAuthenticated());
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    noAuthenticated(state, action) {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("auth/fulfilled"),
        (state, action) => {
          localStorage.setItem("token", action.payload.token);
          return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            loading: false,
          };
        }
      );
    // .addMatcher(
    //   (action) => action.type.endsWith("/rejected"),
    //   same func as noAuthenticated(), so use dispatch finally
    // );
    // 只能register一次，一旦fullfilled，之后注册多少次，reduc dev tool都不会再显示ergisterUser的action,也不会更改state，但依然会post到database里
  },
});

export const { noAuthenticated } = authSlice.actions;
export default authSlice.reducer;

export const selectAuthenticated = (state) => state.auth.isAuthenticated;

export const logout = () => (dispatch) => {
  dispatch(noAuthenticated());
  dispatch(clearProfile());
};

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { alertAsync } from "./alert";

import axios from "axios";

export const getPosts = createAsyncThunk(
  "post/getPosts/Post",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/posts");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      dispatch(alertAsync("Post Removed", "success", 5000));
      return { postId };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addPost = createAsyncThunk(
  "post/addPost",
  async (formData, { rejectWithValue, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/posts", formData, config);
      dispatch(alertAsync("Post Created", "success", 5000));
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getPost = createAsyncThunk(
  "post/getPost",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/posts/${postId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addLike = createAsyncThunk(
  "post/addLike/Post",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/posts/like/${postId}`);
      return { likes: res.data, postId };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const removeLike = createAsyncThunk(
  "post/removeLike/Post",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/posts/unlike/${postId}`);
      return { likes: res.data, postId };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addComment = createAsyncThunk(
  "post/addComment/Post",
  async ({ postId, formData }, { rejectWithValue, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `/api/posts/comment/${postId}`,
        formData,
        config
      );
      dispatch(alertAsync("Comment Added", "success", 5000));
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const deleteComment = createAsyncThunk(
  "post/deleteComment/Post",
  async ({ postId, commentId }, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
      dispatch(alertAsync("Comment Removed", "success", 5000));
      return commentId;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
        state.loading = false;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        // state.posts.push(action.payload);
        state.posts = [action.payload, ...state.posts];
        state.loading = false;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.post = action.payload;
        state.loading = false;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.post.comments = state.post.comments.filter(
          (comment) => comment._id !== action.payload
        );
        state.loading = false;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.post.comments = action.payload;
        state.loading = false;
      })
      .addMatcher(
        (action) => action.type.endsWith("Like/Post/fulfilled"),
        (state, action) => {
          state.posts = state.posts.map((post) =>
            post._id === action.payload.postId
              ? { ...post, likes: action.payload.likes }
              : post
          );
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("Post/rejected"),
        (state, action) => {
          state.error = action.payload;
          state.loading = false;
        }
      );
  },
});

export default postSlice.reducer;

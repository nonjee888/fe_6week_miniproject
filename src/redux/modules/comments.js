import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/api";
import { __getDetailPosts } from "./posts";

export const createComment = createAsyncThunk(
  "comments/CreateComments",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const data = await instance.post("/api/auth/comments/", payload.review);
      // thunkAPI.dispatch(__getDetailPosts(payload.id));
      console.log(data);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeComment = createAsyncThunk(
  "comments/RemoveComments",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const data = await instance.delete(
        `/api/auth/comments/${payload}`,
        payload
      );
      return payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/UpdateComments",
  async (payload, thunkAPI) => {
    console.log(payload);
    try {
      const data = await instance.put(`/api/auth/comments/${payload.id}`, {
        postId: payload.postId,
        content: payload.content,
      });
      return data.data; //존재하지않는 게시글 id입니다. data.data.data = null
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const comments = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [createComment.pending]: (state) => {
      state.isLoading = true;
    },
    [createComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    [createComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [removeComment.pending]: (state) => {
      state.isLoading = true;
    },
    [removeComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      let index = state.comments.findIndex(
        (comment) => comment.id === action.payload
      );
      console.log(index);
      state.comments.splice(index, 1);
    },
    [removeComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [updateComment.pending]: (state) => {
      state.isLoading = true;
    },
    [updateComment.fulfilled]: (state, action) => {
      state.comments.push(action.payload);
      state.isLoading = false;
    },
    [updateComment.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export default comments;

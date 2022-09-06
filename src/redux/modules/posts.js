import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const __getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    try {
      const data = await axios.get("http://52.79.247.187:8080/api/posts");

      return thunkAPI.fulfillWithValue(data.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getDetailPosts = createAsyncThunk(
  "detailPosts/getDetailPosts",
  async (payload, thunkAPI) => {
    // console.log(payload);
    try {
      const data = await axios.get(
        `http://52.79.247.187:8080/api/posts/${payload}`
      );
      // console.log(data);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//http://52.79.247.187:8080/api/posts"

export const posts = createSlice({
  name: "post",
  initialState: {
    posts: [],
    detail: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    createPost(state, action) {
      state.posts.push(action.payload);
      axios.post("http://52.79.247.187:8080/api/auth/posts", action.payload);
    },
    removePost(state, action) {
      console.log(state, action);
      let index = state.posts.findIndex((post) => post.id === action.payload);

      state.posts.splice(index, 1);
      axios.delete(
        `http://52.79.247.187:8080/api/auth/posts/${action.payload.id}`,
        {
          headers: {
            Authorization: action.payload.token,
            RefreshToken: action.payload.fresh,
          },
        }
      );
    },
    updatePost(state, action) {
      let index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      state.posts.splice(index, 1, action.payload);
      axios.patch(
        `http://52.79.247.187:8080/api/auth/posts/${action.payload.id}`,
        {
          headers: {
            Authorization: action.payload.token,
            RefreshToken: action.payload.fresh,
          },
        }
      );
    },
    likePost(state, action) {
      let index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      state.posts[index].count += 1;
      axios.patch(
        `http://52.79.247.187:8080/api/auth/posts/${action.payload.id}`,
        action.payload,
        {
          headers: {
            Authorization: action.payload.token,
            RefreshToken: action.payload.fresh,
          },
        }
      );
    },
  },
  extraReducers: (builder) => {
    // console.log(builder);
    builder
      .addCase(__getPosts.pending, (state) => {
        state.isLoading = true;
        console.log("pending");
      })
      .addCase(__getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
        console.log(action.payload);
      })
      .addCase(__getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log("rejected");
      });

    builder
      .addCase(__getDetailPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getDetailPosts.fulfilled, (state, action) => {
        // console.log(__getDetailPosts);
        state.isLoading = false;
        state.detail = action.payload;
      })
      .addCase(__getDetailPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export let { createPost, removePost, updatePost, likePost } = posts.actions;

export default posts;

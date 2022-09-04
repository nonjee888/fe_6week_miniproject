import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const __getPosts = createAsyncThunk(
  "posts/getPosts",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/posts");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const posts = createSlice({
  name: "post",
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    createPost(state, action) {
      state.posts.push(action.payload);
      axios.post("http://localhost:3001/posts", action.payload);
    },
    removePost(state, action) {
      let index = state.posts.findIndex((post) => post.id === action.payload);
      state.posts.splice(index, 1);
      axios.delete(`http://localhost:3001/posts/${action.payload}`);
    },
    updatePost(state, action) {
      let index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      state.posts.splice(index, 1, action.payload);
      axios.patch(`http://localhost:3001/posts/${action.payload.id}`);
    },
    likePost(state, action) {
      let index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      state.posts[index].count += 1;
      axios.patch(
        `http://localhost:3001/posts/${action.payload.id}`,
        action.payload
      );
    },
  },
  extraReducers: {
    [__getPosts.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getPosts.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.posts = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__getPosts.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export let { createPost, removePost, updatePost, likePost } = posts.actions;

export default posts;

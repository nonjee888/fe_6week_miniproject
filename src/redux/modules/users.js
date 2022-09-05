import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setCookie } from "../../shared/cookie";
import axios from "axios";

// import { setRefreshTokenToCookie } from "../../shared/cookie"; //체크

export const __userLogin = createAsyncThunk(
  "user/userLogin",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(
        "http://52.79.247.187:8080/api/member/login",
        payload
      );
      console.log(data);
      if (data.data.success) {
        setCookie("isLogin", data.headers.authorization);
        setCookie("ACCESS_TOKEN", data.headers.authorization, 0.5);
        setCookie("REFRESH_TOKEN", data.headers.refreshtoken); //체크
      }
      localStorage.setItem("nickname", data.data.data.nickname);
      //   localStorage.setItem("REFRESH_TOKEN", data.headers.authorization);
      return thunkAPI.fulfillWithValue(data.data.data.nickname);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const users = createSlice({
  name: "users",
  initialState: {
    data: [],
    success: false,
    error: null,
    isLoading: false,
  },

  reducers: {},

  extraReducers: {
    [__userLogin.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__userLogin.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.users = action.payload; //
    },
    [__userLogin.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export let { userSignup } = users.actions;

export default users;

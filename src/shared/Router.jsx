import {Route, Routes} from "react-router-dom";
import React from "react";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Mypage from "../pages/Mypage";
import Post from "../pages/Post";
import Signup from "../pages/Signup";

function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>} exact/>
        <Route path="/signup" element={<Signup/>} exact/>
        <Route path="/write" element={<Post/>} exact/>
        <Route path="/view/:id" element={<Detail/>} exact/>
        <Route path="/main" element={<Main/>} exact/>
        <Route path="/mypage" element={<Mypage/>}  />
        <Route path="*" element={<div>없는 페이지입니다.</div>}/>
      </Routes>
    </div>
  );
}

export default Router;







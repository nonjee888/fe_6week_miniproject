import React from "react";
import Posts from "../posts/Posts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getPosts } from "../../redux/modules/posts";
import { getCookie } from "../../shared/cookie";

const List = () => {
  let token = getCookie("ACCESS_TOKEN");
  let fresh = getCookie("REFRESH_TOKEN");
  console.log(fresh, token);
  let dispatch = useDispatch();
  //데이터받아오기
  const user = localStorage.getItem("nickname");
  const { isLoading, error, posts } = useSelector((state) => state?.posts);
  useEffect(() => {
    dispatch(__getPosts());
  }, [dispatch]);
  if (isLoading) {
    return <div>로딩 중입니다</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      {posts?.map((post) => (
        <Posts post={post} key={post.id} />
      ))}
    </div>
  );
};
export default List;

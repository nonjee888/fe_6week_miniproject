import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getPosts } from "../../redux/modules/posts";
import Posts from "../posts/Posts";
import { getCookie } from "../../shared/cookie";

const List = () => {
  //토큰 저장되는지 확인하기
  let token = getCookie("ACCESS_TOKEN");
  let fresh = getCookie("REFRESH_TOKEN");
  console.log(fresh);

  let dispatch = useDispatch();
  const { isLoading, error, posts } = useSelector((state) => state?.posts);
  // console.log(posts);
  useEffect(() => {
    dispatch(__getPosts());
  }, [dispatch]);
  // console.log(posts);
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

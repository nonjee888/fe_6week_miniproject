import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getPosts } from "../../redux/modules/posts";

import Posts from "../posts/Posts";

const List = () => {
  let dispatch = useDispatch();
  const { isLoading, error, posts } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(__getPosts());
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩 중입니다</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }
  let postList = posts.filter((post) => {
    return post !== null;
  });
  return (
    <div>
      {postList.map((post) => (
        <Posts post={post} key={post.id} />
      ))}
    </div>
  );
};

export default List;

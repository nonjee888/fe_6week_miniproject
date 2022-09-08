import React from "react";
import styled from "styled-components";
import Posts from "../posts/Posts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../shared/cookie";
import { __getPosts } from "../../redux/modules/posts";

const Mylist = () => {
  let nickname = localStorage.getItem("nickname");
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let token = getCookie("ACCESS_TOKEN");
  let fresh = getCookie("FRESH_TOKEN");
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
  console.log(posts);
  let postList = posts.filter((post) => {
    return post.nickname == nickname;
  });
  return (
    <MyContainer>
      <StP>내 게시글 보기</StP>
      {postList.map((post) => (
        <Posts post={post} key={post.id} />
      ))}
    </MyContainer>
  );
};

export default Mylist;

const MyContainer = styled.div`
  width: 1150px;
  height: 900px;
  margin: auto;
  border-radius: 10px;
`;
const StP = styled.div`
  margin-left: 500px;
  margin-top: 50px;
`;

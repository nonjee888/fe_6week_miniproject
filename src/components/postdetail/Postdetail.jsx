import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { __getDetailPosts } from "../../redux/modules/posts";
import { likePost, removePost } from "../../redux/modules/posts";
import Postmodal from "../postmodal/Postmodal";

const Postdetail = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [modal, setModal] = useState(false);
  const { isLoading, error, posts } = useSelector((state) => state?.posts);
  console.log();
  // let post = posts.find((post) => {
  //   return String(post.id) === id;
  // });

  useEffect(() => {
    dispatch(__getDetailPosts());
  }, [dispatch]);
  if (isLoading) {
    return <div>...로딩중</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const close = () => {
    setModal(false);
  };
  return (
    <>
      {modal ? <Postmodal post={posts} close={close} /> : null}

      <PostBox className="modal">
        <UndoButton onClick={() => navigate("/")}>이전으로</UndoButton>
        <InnerBox>
          <div>
            <h2>{posts?.data?.data?.data?.nickname}</h2>
          </div>
          <div>
            <p>{posts?.data?.data?.data?.title}</p>
          </div>
          <div>
            <p>{posts?.data?.data?.data?.imgUrl}</p>
          </div>
          <div>
            <p>{posts?.data?.data?.data?.content}</p>
          </div>
          <div>
            <p>{posts?.data?.data?.data?.likes}</p>
          </div>
          <div>
            <Button
              onClick={() => {
                dispatch(likePost(posts?.nickname));
              }}
            >
              💙
            </Button>

            <Button
              onClick={() => {
                setModal(true);
              }}
            >
              수정
            </Button>

            <Button
              onClick={() => {
                dispatch(removePost(posts?.nickname));
                navigate("/main", { replace: true });
              }}
            >
              삭제
            </Button>
          </div>
        </InnerBox>
      </PostBox>
    </>
  );
};

export default Postdetail;

const PostBox = styled.div`
  width: 600px;
  height: 400px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  margin-top: 40px;
  margin-left: 300px;
`;
const UndoButton = styled.button`
  margin-top: 30px;
  margin-left: 30px;
  width: 80px;
  height: 35px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;
const Button = styled.button`
  margin-top: 100px;
  margin-left: 10px;
  width: 50px;
  height: 35px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;
const InnerBox = styled.div`
  width: 500px;
  height: 300px;
  margin-left: 40px;
  margin-top: 20px;
  display: block;
`;

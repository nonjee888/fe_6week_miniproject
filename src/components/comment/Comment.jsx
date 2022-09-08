import React from "react";
import styled from "styled-components";
import { getCookie } from "../../shared/cookie";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/modules/comments";
import { __getDetailPosts, __getPosts } from "../../redux/modules/posts";
import Ment from "../ment/Ment";

const Comment = () => {
  let token = getCookie("ACCESS_TOKEN");
  let fresh = getCookie("REFRESH_TOKEN");
  let dispatch = useDispatch();
  const initialState = {
    postId: 0,
    content: "",
  };
  let [ment, setMent] = useState("");
  let [review, setReview] = useState(initialState);
  let { id } = useParams();
  let postId = id;
  console.log(postId);
  let payload = {
    token: token,
    fresh: fresh,
    review: review,
  };
  const { isLoading, error, detail } = useSelector((state) => state?.posts);
  console.log(detail);
  useEffect(() => {
    dispatch(__getDetailPosts(id));
  }, []);
  if (isLoading) {
    return <div>...로딩중</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      <Divin>
        <div>
          <Input
            type="text"
            value={ment}
            onChange={(e) => {
              setMent(e.target.value);
              setReview({
                ...review,
                postId: Number(id),
                content: e.target.value,
              });
            }}
          />
          <Button
            onClick={() => {
              dispatch(createComment(payload));
              setReview(initialState);
              setMent("");
            }}
          >
            작성
          </Button>
        </div>
        <div>
          {detail?.data?.commentResponseDtoList?.map((comment) => {
            return <Ment ment={comment} key={comment.id} postId={postId} />;
          })}
        </div>
      </Divin>
    </div>
  );
};

export default Comment;

const Divin = styled.div`
  margin-top: 80px;
  margin-left: 310px;
`;

const Button = styled.button`
  margin-left: 16px;
  width: 60px;
  height: 25px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  background: #118ba3;
  color: #ffffff;
  &:hover {
    color: #ffffff;
    background: #cc3723;
    transition: all 0.2s linear;
    overflow: hidden;
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  }
`;

const Input = styled.input`
  border: #e6e6fa;
  border-radius: 5px;
  width: 500px;
  height: 30px;
`;

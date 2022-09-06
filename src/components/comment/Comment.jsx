import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/modules/comments";
import { __getDetailPosts } from "../../redux/modules/posts";
import Ment from "../ment/Ment";

const Comment = () => {
  let dispatch = useDispatch();
  const initialState = {
    postid: 0,
    nickname: "",
    content: "",
  };
  let [ment, setMent] = useState("");
  let [review, setReview] = useState(initialState);
  let { id } = useParams();
  const { isLoading, error, detail } = useSelector((state) => state?.posts);
  // console.log(detail);
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
      <div>댓글</div>
      <div>
        <input />
        <button>댓글 작성</button>
      </div>
      <div>
        {detail?.data?.commentResponseDtoList?.map((comment) => {
          return <Ment ment={comment} key={comment.id} />;
        })}
      </div>
    </div>
  );
};

export default Comment;

import React from "react";
import styled from "styled-components";
import { getCookie } from "../../shared/cookie";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/modules/comments";
import { __getDetailPosts } from "../../redux/modules/posts";
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
  let payload = {
    token: token,
    fresh: fresh,
    review: review,
  };
  const { isLoading, error, detail } = useSelector((state) => state?.posts);
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
        <input
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
        <button
          onClick={() => {
            dispatch(createComment(payload));
            setReview(initialState);
            setMent("");
          }}
        >
          댓글 작성
        </button>
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

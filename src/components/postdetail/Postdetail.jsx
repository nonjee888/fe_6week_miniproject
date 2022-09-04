import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { __getPosts } from "../../redux/modules/posts";
import { likePost, removePost } from "../../redux/modules/posts";
import Postmodal from "../postmodal/Postmodal";

const Postdetail = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [modal, setModal] = useState(false);
  let { id } = useParams();
  const { isLoading, error, posts } = useSelector((state) => state.posts);
  let post = posts.find((post) => {
    return String(post.id) === id;
  });

  useEffect(() => {
    dispatch(__getPosts());
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
  console.log(post);
  return (
    <>
      {modal ? <Postmodal post={post} close={close} /> : null}
      <div>게시글</div>

      <div className="modal" style={{ background: "#d3d3d3" }}>
        <button onClick={() => navigate(-1)}>이전으로</button>
        <h4>{post.nickname}</h4>
        <p>{post.title}</p>
        <p>{post.pics}</p>
        <p>{post.content}</p>
        <div>
          <p>{post.count}</p>
          <button
            onClick={() => {
              dispatch(likePost(post.id));
            }}
          >
            💙 좋아요
          </button>

          <button
            onClick={() => {
              setModal(true);
            }}
          >
            수정하기
          </button>

          <button
            onClick={() => {
              dispatch(removePost(post.id));
              navigate("/main", { replace: true });
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </>
  );
};

export default Postdetail;

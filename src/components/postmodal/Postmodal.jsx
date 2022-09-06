import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updatePost } from "../../redux/modules/posts";

const Postmodal = ({ post, close }) => {
  let dispatch = useDispatch();
  const initialState = {
    id: post.id, ////////id 넘겨주어야하나
    title: post.title,
    content: post.content,
  };
  const [post1, setPost1] = useState(initialState);
  const [title, setTitle] = useState(post1.title);
  const [content, setContent] = useState(post1.content);

  return (
    <Modaldiv className="black-bg show-modal">
      <ModalContainer className="white-bg">
        <h4>게시글 수정</h4>
        <div>
          <label>제목</label>
          <input
            className="input"
            type="text"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <label>내용</label>
          <input
            className="input"
            type="text"
            name="content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
        <button
          className="btn btn-danger"
          onClick={() => {
            dispatch(updatePost({ ...post1, title: title, content: content }));
            close();
          }}
        >
          수정하기
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            close();
          }}
        >
          닫기
        </button>
      </ModalContainer>
    </Modaldiv>
  );
};

export default Postmodal;

const Modaldiv = styled.div`
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
`;

const ModalContainer = styled.div`
  padding: 30px;
  position: absolute;
  top: calc(50vh - 250px);
  left: calc(50vw - 320px);
  background-color: white;
  display: block;
  text-align: center;
  justify-content: center;
  border-radius: 10px;
  width: 400px;
  height: 300px;
`;

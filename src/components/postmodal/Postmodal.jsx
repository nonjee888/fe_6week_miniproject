import React from "react";
import styled from "styled-components";
import { getCookie } from "../../shared/cookie";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../redux/modules/posts";

const Postmodal = ({ post, close }) => {
  const token = getCookie("ACCESS_TOKEN"); //getCookie로 token 가져오기
  const fresh = getCookie("REFRESH_TOKEN");
  console.log(fresh);
  console.log(post.data);
  let dispatch = useDispatch();
  const initialState = {
    id: post.data.id,
    title: post.data.title,
    content: post.data.content,
    image: post.data.image,
  };
  const [post1, setPost1] = useState(initialState);
  const [title, setTitle] = useState(post1.title);
  const [content, setContent] = useState(post1.content);
  const [image, setImage] = useState(post1.image);
  const onUpdateHandler = async (e) => {
    e.preventDefault();
    let req = {
      title: post.data.title,
      content: post.data.content,
    };

    const json = JSON.stringify(req);
    let formData = new FormData();
    formData.append("image", image);
    const titleblob = new Blob([json], { type: "application/json" });
    formData.append("title", titleblob);
    const contentblob = new Blob([json], { type: "application/json" });
    formData.append("content", contentblob);

    console.log(formData);
    const payload = {
      id: post.data.id,
      data: formData,
      token: token,
      fresh: fresh,
    };
    // navigate("/");
    dispatch(updatePost(payload));
    // for (let value of formData.values()) {
    //   console.log(value);
    // }
  };
  const uploadImage = (event) => {
    const file = event.target.files;
    setImage(file[0]);
  };
  return (
    <Modaldiv className="black-bg show-modal">
      <ModalContainer className="white-bg" onSubmit={onUpdateHandler}>
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
        <label htmlFor="imgUrl">
          <File
            type="file"
            accept=".gif, .jpg, .png, .jpeg"
            onChange={uploadImage}
            id="imgUrl"
          />
          // 여기 보여줄 코드 버튼 넣기
        </label>
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
        <button className="btn btn-danger" type="submit">
          수정하기
        </button>
        <button
          className="btn btn-danger"
          type="button"
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
const ModalContainer = styled.form`
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
const File = styled.input`
  display: none;
`;

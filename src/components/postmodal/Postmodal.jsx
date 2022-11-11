import React from "react";
import styled from "styled-components";
import { getCookie } from "../../shared/cookie";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../redux/modules/posts";

const Postmodal = ({ post, close }) => {
  const token = getCookie("ACCESS_TOKEN"); //getCookie로 token 가져오기
  const fresh = getCookie("REFRESH_TOKEN");

  let dispatch = useDispatch();

  const initialState = {
    id: post.id,
    title: post.title,
    content: post.content,
    image: post.image,
  };

  const [post1, setPost1] = useState(initialState);
  const [title, setTitle] = useState(post1.title);
  const [content, setContent] = useState(post1.content);
  const [image, setImage] = useState(post1.image);

  const onUpdateHandler = async (e) => {
    e.preventDefault();

    let req = {
      title,
      content,
    };

    const json = JSON.stringify(req);

    let formData = new FormData();
    formData.append("image", image);

    const titleblob = new Blob([json], { type: "application/json" });
    formData.append("title", titleblob);

    const contentblob = new Blob([json], { type: "application/json" });
    formData.append("content", contentblob);

    const payload = {
      id: post.id,
      data: formData,
      token,
      fresh,
    };

    dispatch(updatePost(payload));
    close();
  };
  const uploadImage = (event) => {
    const file = event.target.files;
    setImage(file[0]);
  };
  return (
    <Modaldiv className="black-bg show-modal">
      <ModalContainer className="white-bg" onSubmit={onUpdateHandler}>
        <H4>게시글 수정</H4>
        <div>
          <Label>제목</Label>
          <Input
            className="input"
            type="text"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <StLabel htmlFor="imgUrl">
          <File
            type="file"
            accept=".gif, .jpg, .png, .jpeg"
            onChange={uploadImage}
            id="imgUrl"
          />
          사진수정
        </StLabel>
        <div>
          <Label>내용</Label>
          <Input
            className="input"
            type="text"
            name="content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
        <Divin>
          <Button className="btn btn-danger" type="submit">
            수정하기
          </Button>
          <Button
            className="btn btn-danger"
            type="button"
            onClick={() => {
              close();
            }}
          >
            닫기
          </Button>
        </Divin>
      </ModalContainer>
    </Modaldiv>
  );
};
export default Postmodal;

const Input = styled.input`
  margin-left: 10px;
  border: none;
  border-radius: 3px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 22%);
  width: 250px;
  height: 25px;
`;

const Divin = styled.div`
  margin-top: 10px;
  margin-left: 10px;
`;

const Button = styled.button`
  margin-left: 20px;
  width: 70px;
  height: 30px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 22%);
  font-family: "IBM Plex Sans KR", sans-serif;
  background: #118ba3;
  color: #ffffff;
  &:hover {
    transform: scale(1.1);
    transition: all 0.2s linear;
    overflow: hidden;
  }
`;

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
const H4 = styled.h4`
  font-family: "IBM Plex Sans KR", sans-serif;
`;
const Label = styled.label`
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const StLabel = styled.label`
  font-family: "IBM Plex Sans KR", sans-serif;
  width: 100px;
  height: 30px;
  margin-top: 20rem;
`;

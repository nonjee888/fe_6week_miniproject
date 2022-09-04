import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/modules/posts";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import nextId from "react-id-generator";
import axios from "axios";

const Form = () => {
  let navigate = useNavigate();
  //   const initialState = {
  //     nickname: "",
  //     title: "",
  //     content: "",
  //     pics: "", // 백이랑 어떻게 보낼지 결정
  //   };
  //   const [post, setPost] = useState(initialState);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onChangeHandler = (event, setState) => setState(event.target.value);
  console.log();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("11");
    const URL = "http://52.79.247.187:8080/api/auth/posts";
    const formData = new FormData();
    console.log("dddd");
    formData.append("title", title);
    formData.append("content", content);
    formData.append("img", image);

    const data = await axios.post(URL, formData);
    if (data.success) {
      navigate("/main");
    }
  };
  // 기존 onSubmitHandler에 있던 코드
  // dispatch(createPost({ ...post, id: id }));
  // setPost(initialState);

  const uploadImage = (event) => {
    const file = event.target.files;
    setImage(file);
  };

  return (
    <StForm className="add-form" onSubmit={onSubmitHandler}>
      <div className="input-group">
        <Divin>
          <StTitle
            placeholder="제목"
            name="title"
            type="text"
            required
            value={title}
            onChange={(event) => onChangeHandler(event, setTitle)}
          />

          <label htmlFor="imgFile">
            <File
              type="file"
              accept=".gif, .jpg, .png"
              onChange={uploadImage}
              id="imgFile"
            />
            // 여기 보여줄 코드 버튼 넣기
          </label>
        </Divin>

        <Divin>
          <StBody
            placeholder="내용을 입력하세요"
            name="body"
            value={content}
            required
            onChange={(event) => onChangeHandler(event, setContent)}
          />
        </Divin>

        <div>
          <Button type="submit">등록</Button>
        </div>
      </div>
    </StForm>
  );
};

export default Form;

const Divin = styled.div`
  padding: 20px;
`;
const PicContainer = styled.div`
  width: 300px;
  height: 300px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;
const StForm = styled.form`
  width: 400px;
  height: 100%;
  margin: auto;
  align-items: center;
`;
const StTitle = styled.input`
  width: 300px;
  height: 20px;
  border: none;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;
const StBody = styled.textarea`
  width: 300px;
  height: 200px;
  border: none;
  float: right;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;
const Button = styled.button``;

const File = styled.input`
  display: none;
`;

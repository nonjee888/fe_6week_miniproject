import React from "react";
import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { instance } from "../../shared/api";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../shared/cookie";

const Form = () => {
  let navigate = useNavigate();
  //input content 변수 선언
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //value를 setState해준다
  const onChangeHandler = (event, setState) => setState(event.target.value);
  //value들 submit하기
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    let req = {
      title: title,
      content: content,
    };
    const formData = new FormData();
    formData.append("image", image);

    let json = JSON.stringify(req);

    const titleblob = new Blob([json], { type: "application/json" });
    formData.append("title", titleblob);

    const contentblob = new Blob([json], { type: "application/json" });
    formData.append("content", contentblob);

    const URL = "http://52.79.247.187:8080/api/auth/posts";

    const data = await instance.post(URL, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(data);
    if (data.data.success) {
      navigate("/main");
    }
  };

  const uploadImage = (event) => {
    const file = event.target.files;
    setImage(file[0]);
  };
  console.log("asdf");
  return (
    <StForm
      className="add-form"
      encType="multipart/form-data"
      onSubmit={onSubmitHandler}
    >
      <FormContainer>
        <Divin>
          <StTitle
            placeholder="제목"
            name="title"
            type="text"
            required
            value={title}
            onChange={(event) => onChangeHandler(event, setTitle)}
          />

          <label htmlFor="imgUrl">
            <File
              type="file"
              accept=".gif, .jpg, .png, .jpeg"
              onChange={uploadImage}
              id="imgUrl"
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

        <Divin>
          <Button type="submit">등록</Button>
          <Button
            type="button"
            onClick={() => {
              navigate("/main");
            }}
          >
            취소
          </Button>
        </Divin>
      </FormContainer>
    </StForm>
  );
};

export default Form;

const Divin = styled.div`
  padding: 20px;
`;
const StForm = styled.form`
  width: 800px;
  height: 100%;
  margin: auto;
`;
const FormContainer = styled.div`
  display: block;
`;
const StTitle = styled.input`
  margin-top: 30px;
  margin-left: 135px;
  width: 500px;
  height: 50px;
  border: none;
  border-radius: 6px;
  /* font-family: ; */
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;
const StBody = styled.textarea`
  width: 500px;
  height: 400px;
  border: none;
  border-radius: 10px;
  float: right;
  margin-right: 120px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;
const Button = styled.button`
  margin-top: 20px;
  margin-left: 350px;
  width: 80px;
  height: 35px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;

const File = styled.input`
  display: none;
`;

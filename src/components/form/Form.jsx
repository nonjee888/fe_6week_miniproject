import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../shared/cookie";
import styled from "styled-components";
import axios from "axios";

const Form = () => {
  let navigate = useNavigate();
  const token = getCookie("ACCESS_TOKEN"); //getCookie로 token 가져오기
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onChangeHandler = (event, setState) => setState(event.target.value);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const URL = "http://52.79.247.187:8080/api/auth/posts"; //post할 주소
    const formData = new FormData(); //사진 첨부해서 post 할 때 formData 써줌
    formData.append("title", title); //title 값 formData에 넣어줌
    formData.append("content", content); //content formData에 넣어줌
    formData.append("img", image);
    //post
    const data = await axios.post(URL, formData, {
      headers: { Authorization: "Bearer " + token },
    });
    console.log(data);
    if (data.success) {
      navigate("/main");
    }
  };

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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __userLogin } from "../../redux/modules/users";
import styled from "styled-components";

const Loginpage = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let initialState = {
    nickname: "",
    password: "",
  };
  let [user, setUser] = useState(initialState);
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  //이벤트 리스너
  // idForm.addEventListner('keyup', activeEvent);
  // pwForm.addEventListner('keyup', activeEvent);
  // LoginButton.addEventListner('click', errorEvent);

  // function activeEvent() {
  //   switch(!(idForm.value && pwForm.value)){
  //     case true : LoginButton.disabled = true; break;
  //     case false : LoginButton.disabled = false; break;
  //   }
  // }

  return (
    <StContainer>
      <InputGroup>
        <Divin>
          <Input
            placeholder="nickname"
            type="text"
            name="nickname"
            value={user.id}
            onChange={onChangeHandler}
            required
          />
        </Divin>

        <Divin>
          <Input
            placeholder="비밀번호"
            type="password"
            name="password"
            value={user.password}
            onChange={onChangeHandler}
            required
          />
        </Divin>
      </InputGroup>

      <ButtonGroup>
        <Button
          onClick={() => {
            if (user.nickname.trim() === "" || user.password.trim() === "")
              return alert("닉네임과 비밀번호를 입력하세요.");
            dispatch(__userLogin(user));
            navigate("/main");
          }}
        >
          로그인
        </Button>
        <Button
          onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입
        </Button>
      </ButtonGroup>
    </StContainer>
  );
};

export default Loginpage;

const StContainer = styled.div`
  border-radius: 10px;
  border: none;
  width: 300px;
  height: 300px;
  float: center;
  align-items: center;
  margin: 100px 0 0 450px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  background: #ffffff;
`;
const Divin = styled.div`
  padding: 10px;
`;
const ButtonGroup = styled.div`
  width: 200px;
  display: flex;
  flex-wrap: wrap;
  padding-top: 50px;
  padding-left: 20px;
  margin: auto;
  gap: 10%;
`;
const Button = styled.button`
  width: 80px;
  height: 35px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  font-family: "IBM Plex Sans KR", sans-serif;
  background: #e6e6fa;
  color: #800080;
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
const InputGroup = styled.div`
  width: 205px;
  padding-top: 30px;
  margin: auto;
`;
const Input = styled.input`
  width: 180px;
  height: 35px;
  border: none;
  background: #fffff0;
  border-radius: 5px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;

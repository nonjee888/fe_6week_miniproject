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
          />
        </Divin>

        <Divin>
          <Input
            placeholder="비밀번호"
            type="password"
            name="password"
            value={user.password}
            onChange={onChangeHandler}
          />
        </Divin>
      </InputGroup>

      <ButtonGroup>
        <Button
          onClick={() => {
            dispatch(__userLogin(user));
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
  background-color: white;
  border-radius: 10px;
  width: 300px;
  height: 300px;
  float: center;
  align-items: center;
  margin: 100px 0 0 450px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
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
  border-radius: 5px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;

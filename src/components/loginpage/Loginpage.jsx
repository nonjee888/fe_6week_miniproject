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
      <Divin>
        <input
          placeholder="nickname"
          type="text"
          name="nickname"
          value={user.id}
          onChange={onChangeHandler}
        />
      </Divin>

      <Divin>
        <input
          placeholder="비밀번호"
          type="password"
          name="password"
          value={user.password}
          onChange={onChangeHandler}
        />
      </Divin>

      <Divin>
        <button
          onClick={() => {
            dispatch(__userLogin(user));
            navigate("/main");
          }}
        >
          로그인
        </button>
        <button
          onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입
        </button>
      </Divin>
    </StContainer>
  );
};

export default Loginpage;

const StContainer = styled.div`
  background-color: white;
  width: 400px;
  height: 300px;
  float: center;
  align-items: center;
  margin: 100px 0 0 400px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;
const Divin = styled.div`
  padding: 10px;
`;

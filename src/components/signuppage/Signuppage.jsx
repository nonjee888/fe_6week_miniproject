import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSignup } from "../../redux/modules/users";
import axios from "axios";

const Signuppage = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let initialState = {
    nickname: "",
    password: "",
    passwordConfirm: "",
  };
  let [user, setUser] = useState(initialState);
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const data = await axios.post("login url/signup", user);
    if (data.success) {
      navigate("/");
    } else {
      window.alert("회원가입 실패");
    }
  };
  return (
    <StSignupbox>
      <Stcontainer>
        <Divin>
          <input
            placeholder="닉네임"
            name="nickname"
            type="text"
            value={user.nickname}
            onChange={onChangeHandler}
            required
          />
          <button>중복확인</button>
        </Divin>

        <Divin>
          <input
            placeholder="비밀번호"
            name="password"
            type="password"
            value={user.password}
            onChange={onChangeHandler}
            required
          />
        </Divin>

        <Divin>
          <input
            placeholder="비밀번호 확인"
            name="passwordConfirm"
            type="password"
            value={user.passwordConfirm}
            onChange={onChangeHandler}
            required
          />
        </Divin>

        <button onClick={onSubmitHandler}>회원가입</button>
      </Stcontainer>
    </StSignupbox>
  );
};

export default Signuppage;

const StSignupbox = styled.div`
  background-color: white;
  width: 400px;
  height: 300px;
  margin: 100px 0 0 400px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;
const Stcontainer = styled.div`
  width: 300px;
  height: 200px;
  margin: auto;
`;
const Divin = styled.div`
  padding: 10px;
`;

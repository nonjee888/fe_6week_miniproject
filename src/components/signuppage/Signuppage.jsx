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
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { data } = await axios.post(
      "http://52.79.247.187:8080/api/member/signup",
      user
    );
    console.log(data);
    if (data.success) {
      navigate("/");
    } else {
      window.alert(data.error.message);
    }
  };
  return (
    <StSignupbox>
      <Stcontainer onSubmit={onSubmitHandler}>
        <InputGroup>
          <DivinInput>
            <Input
              placeholder="닉네임"
              name="nickname"
              type="text"
              value={user.nickname}
              onChange={onChangeHandler}
              required
            />
            <Button>중복확인</Button>
          </DivinInput>

          <Divin>
            <Input
              placeholder="비밀번호"
              name="password"
              type="password"
              value={user.password}
              onChange={onChangeHandler}
              required
            />
          </Divin>

          <Divin>
            <Input
              placeholder="비밀번호 확인"
              name="passwordConfirm"
              type="password"
              value={user.passwordConfirm}
              onChange={onChangeHandler}
              required
            />
          </Divin>
        </InputGroup>
        <DivinSubmit>
          <Button type="submit">회원가입</Button>
        </DivinSubmit>
      </Stcontainer>
    </StSignupbox>
  );
};

export default Signuppage;

const StSignupbox = styled.div`
  padding-top: 30px;
  background-color: white;
  width: 350px;
  height: 350px;
  border-radius: 10px;
  float: center;
  align-items: center;
  margin: 100px 0 0 450px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;
const Stcontainer = styled.form`
  padding-top: 20px;
  width: 300px;
  height: 200px;
  margin: auto;
`;
const Divin = styled.div`
  padding: 10px;
`;
const DivinInput = styled.div`
  gap: 20px;
  height: 50px;
  display: flex;
  float: center;
  margin: 20px 0 0 15px;
`;

const Input = styled.input`
  width: 180px;
  height: 35px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;
const Button = styled.button`
  width: 100px;
  height: 35px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;
const InputGroup = styled.div`
  width: 300px;
  height: 200px;
`;
const DivinSubmit = styled.div`
  padding-left: 100px;
  width: 100px;
  height: 50px;
`;

import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

const Signuppage = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [nickname, setNickname] = useState("");
  let [password, setPassword] = useState("");
  let [passwordConfirm, setPasswordConfirm] = useState("");

  let [nickMessage, setNickMessage] = useState("");
  let [passwordMessage, setPasswordMessage] = useState("");
  let [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  //유효성 검사
  let [isNick, setIsNick] = useState(false);
  let [isPassword, setIsPassword] = useState(false);
  let [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const onChangeNick = (event) => {
    const nickRegex = /^([a-zA-z0-9])([a-zA-z]).{4,12}$/;
    const nickCurrent = event.target.value;

    if (!nickRegex.test(nickCurrent)) {
      setNickMessage(
        "닉네임은 4~12글자로 숫자 또는 영문자 조합 사용가능합니다"
      );
      setIsNick(false);
    } else {
      setNickMessage("올바른 형식입니다");
      setIsNick(true);
    }
  };

  const onChangePassword = (event) => {
    const passwordRegex = /^([a-zA-z])([0-9]).{4,32}$/;
    const passwordCurrent = event.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("숫자+영문자 조합으로 4-32자리 입력해주세요!");
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호입니다!");
      setIsPassword(true);
    }
  };
  const onChangePasswordConfirm = (e) => {
    const passwordConfirmRegex = /^([a-zA-z])([0-9]).{4,32}$/;
    const passwordConfirmCurrnet = e.target.value;
    setPasswordConfirm(passwordConfirmCurrnet);

    if (!passwordConfirmRegex.test(passwordConfirmCurrnet)) {
      setPasswordConfirmMessage("숫자+영문자 조합으로 4-32자리 입력해주세요!");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("안전한 비밀번호에요!");
      setIsPasswordConfirm(true);
    }
  };
  const userInfo = {
    nickname,
    password,
    passwordConfirm,
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (
      nickname.trim() === "" ||
      password.trim() === "" ||
      passwordConfirm.trim() === ""
    ) {
      return alert("모든 항목을 입력해주세요");
    }
    if (password !== passwordConfirm) {
      return alert("비밀번호 확인이 일치하지 않습니다.");
    }
    if (isNick !== true || isPassword !== true || isPasswordConfirm !== true) {
      return alert("형식을 확인해주세요");
    }
    const { data } = await axios.post(
      "http://52.79.247.187:8080/api/member/signup",
      userInfo,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
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
              value={nickname}
              onChange={onChangeNick}
              required
            />
            <Button onClick={() => dispatch()}>중복확인</Button>
            {nickname.length > 0 && (
              <p style={{ color: "red" }}>{nickMessage}</p>
            )}
          </DivinInput>

          <Divin>
            <Input
              placeholder="소문자,숫자,특수문자를 포함한 8자 이상으로 입력해주세요"
              name="password"
              type="password"
              value={password}
              onChange={onChangePassword}
              required
            />
            {password.length > 0 && (
              <p style={{ color: "red" }}>{passwordMessage}</p>
            )}
          </Divin>

          <Divin>
            <Input
              placeholder="소문자,숫자,특수문자를 포함한 8자 이상으로 입력해주세요"
              name="passwordConfirm"
              type="password"
              value={passwordConfirm}
              onChange={onChangePasswordConfirm}
              required
            />
            {passwordConfirm.length > 0 && (
              <p style={{ color: "red" }}>{/*{passwordConfirmMessage}*/}</p>
            )}
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

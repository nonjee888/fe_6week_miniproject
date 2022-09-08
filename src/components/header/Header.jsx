import React from "react";
import styled from "styled-components";
import { deleteCookie } from "../../shared/cookie";
import { header2 } from "../../img";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <StHeader>
      <HomeButton
        onClick={() => {
          navigate("/main");
        }}
      />
      <ButtonGroup>
        <Button
          type="button"
          onClick={() => {
            navigate("/write");
          }}
        >
          글작성
        </Button>
        <Button
          onClick={() => {
            navigate("/");
            deleteCookie("ACCESS_TOKEN");
            deleteCookie("REFRESH_TOKEN");
            deleteCookie("isLogin");
            window.localStorage.removeItem("nickname");
          }}
        >
          로그아웃
        </Button>
        <Button
          onClick={() => {
            navigate("/mypage");
          }}
        >
          나의 게시글
        </Button>
      </ButtonGroup>
    </StHeader>
  );
};

export default Header;

const StHeader = styled.div`
  height: 250px;
  width: 1200px;
  margin: auto;
  display: flex;
  align-items: center;
  background-image: url(${header2});
  background-size: cover;
  background-repeat: no-repeat;
`;
const Button = styled.button`
  width: 90px;
  height: 35px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  background: #f8b62d;
  color: #ffffff;
  &:hover {
    color: #ffffff;
    background: #cc3723;
    transition: all 0.2s linear;
    overflow: hidden;
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  }
`;
const ButtonGroup = styled.div`
  margin-left: 200px;
  margin-top: 150px;
  width: 500px;
  /* justify-content: space-between; */
`;
const HomeButton = styled.div`
  height: 250px;
  width: 300px;
  border-radius: 200px;
  margin-left: 500px;
  cursor: pointer;
`;
// const HeaderBox = styled.form`
// display: flex;
// flex-direction: row;
// -webkit-box-align: center;
// align-items: center;
// justify-content: space-between;
// margin: 15px 15px 15px; `;

import React from "react";
import styled from "styled-components";
import { banner } from "../../img";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <StHeader>
      <button
        onClick={() => {
          navigate("/write");
        }}
      >
        글작성
      </button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        로그아웃
      </button>
      <button
        onClick={() => {
          navigate("/mypage");
        }}
      >
        나의 게시글
      </button>
    </StHeader>
  );
};

export default Header;

const StHeader = styled.div`
  height: 250px;
  margin: auto;
  display: flex;
  align-items: center;
  background-image: url(${banner});
  background-size: cover;
  background-repeat: no-repeat;
`;

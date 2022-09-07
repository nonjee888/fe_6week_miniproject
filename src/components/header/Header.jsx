import React from "react";
import styled from "styled-components";
import { banner } from "../../img";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <StHeader>
      <ButtonGroup>
        <Button
          onClick={() => {
            navigate("/write");
          }}
        >
          글작성
        </Button>
        <Button
          onClick={() => {
            navigate("/");
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
  margin: auto;
  display: flex;
  align-items: center;
  background-image: url(${banner});
  background-size: cover;
  background-repeat: no-repeat;
`;
const Button = styled.button`
  width: 80px;
  height: 35px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;
const ButtonGroup = styled.div`
  margin-left: 900px;
  margin-top: 100px;
  width: 500px;
  /* justify-content: space-between; */
`;

// const HeaderBox = styled.form`
// display: flex;
// flex-direction: row;
// -webkit-box-align: center;
// align-items: center;
// justify-content: space-between;
// margin: 15px 15px 15px; `;

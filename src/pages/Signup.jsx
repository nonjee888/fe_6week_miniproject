import React from "react";
import styled from "styled-components";
import { header2 } from "../img";
import Signuppage from "../components/signuppage/Signuppage";

const Signup = () => {
  return (
    <StBody>
      <StHeader />
      <Signuppage />
    </StBody>
  );
};

export default Signup;

const StHeader = styled.div`
  height: 250px;
  margin: auto;
  display: flex;
  align-items: center;
  background-image: url(${header2});
  background-size: cover;
  background-repeat: no-repeat;
`;

const StBody = styled.div`
  width: 100%;
  height: 800px;
  display: block;
`;

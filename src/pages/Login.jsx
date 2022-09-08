import React from "react";
import styled from "styled-components";
import { header2 } from "../img";
import Loginpage from "../components/loginpage/Loginpage";

const Login = () => {
  return (
    <div>
      <StHeader />
      <Loginpage />
    </div>
  );
};

export default Login;

const StHeader = styled.div`
  height: 250px;
  margin: auto;
  display: flex;
  align-items: center;
  background-image: url(${header2});
  background-size: cover;
  background-repeat: no-repeat;
`;

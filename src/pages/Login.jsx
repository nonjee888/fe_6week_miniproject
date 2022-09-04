import React from "react";
import styled from "styled-components";
import { banner } from "../img";
import Loginpage from "../components/loginpage/Loginpage";

const Login = () => {

    return (
        <div>
            <StHeader />
            <Loginpage />
        </div>
    );
}

export default Login;

const StHeader = styled.div`
        height: 250px;
        margin: auto;
        display: flex;
        align-items: center;
        background-image: url(${banner});
        background-size : cover;
        background-repeat: no-repeat;
    `
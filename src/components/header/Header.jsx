import React from "react";
import styled from "styled-components";

const Header = () => {

    const StHeader = styled.div`
        max-width: 1200px;
        min-width:800px;
        height: 150px;
        background-color: aliceblue;
        margin: auto;
        font-family: 'Song Myung', serif;
        color: red;
        font-size: 60px;
        font-weight: bold;
        display: flex;
        align-items: center;
    `

    return(
        <div>
            <StHeader>오늘도 무사히.</StHeader>
        </div>
    );
}

export default Header;
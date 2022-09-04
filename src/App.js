import React from "react";
import Router from "./shared/Router";
import styled from "styled-components";

function App() {
  const StRouter = styled.div`
    background-color: aliceblue;
    max-width: 1200px;
    height: 1200px;
    margin: 0 auto;
    background-attachment: fixed;
  `;

  return (
    <div className="App">
      <StRouter>
        <Router />
      </StRouter>
    </div>
  );
}

export default App;

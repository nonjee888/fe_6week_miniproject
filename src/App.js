import React from "react";
import Router from "./shared/Router";
import styled from "styled-components";

function App() {
  const StRouter = styled.div`
    background-color: #c3e5e7;
    max-width: 1200px;
    min-width: 1200px;
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

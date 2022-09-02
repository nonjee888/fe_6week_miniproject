import React from "react";
import Router from "./shared/Router";
import styled from "styled-components";

function App() {

  const StRouter = styled.div`
  background-color: aliceblue;
  min-width: 800px;
  max-width: 1200px;
  height: 800px;
  margin: auto;
  `;

  return (
    <div className="App">
      <StRouter>
        <Router/>
      </StRouter>
    </div>
  );
}

export default App;

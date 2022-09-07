import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Mylist = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  return <MyContainer></MyContainer>;
};

export default Mylist;

const MyContainer = styled.div`
  width: 1100px;
  height: 850px;
  margin: auto;
  margin-top: 50px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;

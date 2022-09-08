import styled from "styled-components";
import { useState } from "react";
import { deleteCookie, getCookie } from "../../shared/cookie";
import { useDispatch } from "react-redux/";
import Commentmodal from "../commentmodal/Commentmodal";
import { removeComment } from "../../redux/modules/comments";

const Ment = ({ ment, postId }) => {
  let isLogin = getCookie("isLogin");
  let isLogout = deleteCookie("isLogin");
  console.log(ment);
  let dispatch = useDispatch();
  let [modal, setModal] = useState(false);
  const close = () => {
    setModal(false);
  };
  return (
    <>
      {modal ? <Commentmodal ment={ment} close={close} /> : null}

      <div className="list" key={ment.postId}>
        <Divin3>
          <Divin2>
            <H4>
              <span style={{ color: "white", marginRight: "10px" }}>
                {ment.nickname}
              </span>
              {ment.content}
            </H4>
          </Divin2>

          <Divin>
            <Button
              onClick={() => {
                setModal(true);
              }}
            >
              수정
            </Button>
            <Button
              onClick={() => {
                dispatch(removeComment(ment.id, ment.postId));
              }}
            >
              삭제
            </Button>
          </Divin>
        </Divin3>
      </div>
    </>
  );
};

export default Ment;
const Button = styled.button`
  margin-left: 16px;
  width: 60px;
  height: 25px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  background: #118ba3;
  color: #ffffff;
  &:hover {
    color: #ffffff;
    background: #cc3723;
    transition: all 0.2s linear;
    overflow: hidden;
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  }
`;

const H4 = styled.h4`
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const Divin = styled.div`
  display: flex;
  float: right;
  margin-right: 10px;
  margin-top: 15px;
`;

const Divin2 = styled.div`
  border: none;
  width: 400px;
`;

const Divin3 = styled.div`
  margin-top: 10px;
  border: none;
  display: flex;
  float: left;
  height: 35px;
  width: 595px;
`;

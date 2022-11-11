import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/modules/comments";

const Commentmodal = ({ ment, close, postId }) => {
  let dispatch = useDispatch();

  const initialState = {
    postId: ment.id,
    content: ment.content,
  };

  const [ment1, setMent] = useState(initialState);
  const [content, setContent] = useState(ment1.content);

  const payload = {
    postId,
    id: ment1.postId,
    content: content,
  };

  return (
    <div>
      <div className="black-bg show-modal">
        <H4>댓글 수정</H4>

        <Input
          className="input"
          type="text"
          name="content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />

        <Button
          className="btn btn-danger"
          onClick={() => {
            dispatch(updateComment(payload));
            close();
          }}
        >
          수정하기
        </Button>
        <Button
          className="btn btn-danger"
          onClick={() => {
            close();
          }}
        >
          닫기
        </Button>
      </div>
    </div>
  );
};

export default Commentmodal;

const Button = styled.button`
  margin-left: 20px;
  width: 70px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  background: #f8b62d;
  color: #ffffff;
  &:hover {
    color: #ffffff;
    background: #cc3723;
    transition: all 0.2s linear;
    overflow: hidden;
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  }
`;

const Input = styled.input`
  width: 400px;
  height: 20px;
  border: none;
  border-radius: 3px;
`;

const H4 = styled.h4`
  font-family: "IBM Plex Sans KR", sans-serif;
`;

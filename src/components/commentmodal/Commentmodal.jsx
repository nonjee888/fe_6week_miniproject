import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCookie } from "../../shared/cookie";
import { updateComment } from "../../redux/modules/comments";

const Commentmodal = ({ ment, close }) => {
  console.log(ment);
  let token = getCookie("ACCESS_TOKEN");
  let fresh = getCookie("REFRESH_TOKEN");
  let dispatch = useDispatch();
  const initialState = {
    postId: ment.postId,
    content: ment.content,
  };
  const [ment1, setMent] = useState(initialState);
  const [content, setContent] = useState(ment1.content);
  const payload = {
    id: ment.id,
    content: content,
    token: token,
    fresh: fresh,
  };
  return (
    <div>
      <div className="black-bg show-modal">
        <h4>댓글 수정하기</h4>
        <div>
          <label>내용</label>
          <input
            className="input"
            type="text"
            name="content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
        <button
          className="btn btn-danger"
          onClick={() => {
            dispatch(updateComment(payload));
            close();
          }}
        >
          수정하기
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            close();
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default Commentmodal;

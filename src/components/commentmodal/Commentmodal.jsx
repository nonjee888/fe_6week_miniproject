import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/modules/comments";

const Commentmodal = ({ment, close}) => {
    let dispatch = useDispatch();
    const initialState = {
        id: ment.id,
        postId: ment.postId,
        content: ment.content,
    };
    const [ment1, setMent] =useState(initialState);
    const [content, setContent] =useState(ment1.content);

    return (
        <div>
            <div className="black-bg show-modal">
                <h4>댓글 수정하기</h4>
                <div>
                    <label>내용</label>
                    <input className="input" type="text" name="content" value={content}
                    onChange={(e)=>{setContent(e.target.value)}}/>
                </div>
                <button className="btn btn-danger"
                onClick={()=>{dispatch(updateComment({...ment1, content:content})); close();}}>수정하기</button>
                <button className="btn btn-danger" onClick={()=>{close()}}>닫기</button>
            </div>
        </div>
    )
}

export default Commentmodal;
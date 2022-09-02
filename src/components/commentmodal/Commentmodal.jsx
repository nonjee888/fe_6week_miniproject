import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/modules/comments";
import Ment from "../ment/Ment";

const Commentmodal = ({ment, close}) => {
    let dispatch = useDispatch();
    const initialState = {
        id: ment.id,
        post: ment.post,
        desc: ment.desc,
    };
    const [ment1, setMent] =useState(initialState);
    const [desc, setDesc] =useState(ment1.desc);

    return (
        <div>
            <div className="black-bg show-modal">
                <h4>댓글 수정하기</h4>
                <div>
                    <label>내용</label>
                    <input className="input" type="text" name="desc" value={desc}
                    onChange={(e)=>{setDesc(e.target.value)}}/>
                </div>
                <button className="btn btn-danger"
                onClick={()=>{dispatch(updateComment({...ment1,desc:desc})); close();}}>수정하기</button>
                <button className="btn btn-danger" onClick={()=>{close()}}>닫기</button>
            </div>
        </div>
    )
}

export default Commentmodal;
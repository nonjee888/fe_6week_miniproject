import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../redux/modules/posts";

const Postmodal = ({post, close}) => {
    let dispatch = useDispatch();
    const initialState = {
            id: post.id,    ////////id 넘겨주어야하나 
            title: post.title,
            content: post.content,      
    };
    const [post1, setPost1] = useState(initialState);
    const [title, setTitle] = useState(post1.title);
    const [content, setContent] = useState(post1.content);

    return(
        <div className="black-bg show-modal">
            <div className="white-bg">
            <h4>게시글 수정하기</h4>
            <div>
                <label>제목</label>
                <input className="input" type="text" name="title" value={title}
                onChange={(e)=>{setTitle(e.target.value)}}/>
            </div>
            <div>
                <label>내용</label>
                <input className="input" type="text" name="content" value={content}
                onChange={(e)=>{setContent(e.target.value)}}/>
            </div>
            <button className="btn btn-danger"
            onClick={()=>{dispatch(updatePost({...post1, title:title, content:content})); close()}}>수정하기</button>
            <button className="btn btn-danger" onClick={()=>{close()}}>닫기</button>
            </div>
        </div>
    );
}

export default Postmodal;
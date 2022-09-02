import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import nextId from "react-id-generator";
import { createComment } from "../../redux/modules/comments";
import { __getComments } from "../../redux/modules/comments";
import Ment from "../ment/Ment";

const Comment = () => {
    let comId = nextId();
    let dispatch = useDispatch();

    const initialState = {
        id: 0,
        post: 0,
        desc: ""
    };

    let [ment, setMent] = useState("");
    let [review, setReview] = useState(initialState);
    let {id} = useParams();
    const { isLoading, error, comments } = useSelector((state) => state.comments);

    useEffect(() => {
        dispatch(__getComments());   
    }, [dispatch]);
    if (isLoading) {
        return <div>로딩 중....</div>
    }

    if (error) {
        return <div>{error.message}</div>;
    }
    // let commentList = comments.filter((comment) => {
    //     return String(comment.post) === id;
    // })

    return(
        <div>
            <div>댓글</div>
            <Ment/>
            {/* <div>
                <input className="input" type="text" value={ment}
                onChange={(e) => {setMent(e.target.value);
                setReview({...review, id:comId, post: id, desc:e.target.value});}}/>
                <button onClick={()=>{dispatch(createComment(review)); setReview(initialState); setMent("");}}>댓글 작성</button>
            </div>
            <div>
                {commentList.map((comment) => {
                    return (
                        <Ment ment = {comment} key={comment.id} />
                    )
                })}
            </div> */}
        </div>
    );
}

export default Comment;
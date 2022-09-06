import React from "react";
import axios from "axios";
import styled from "styled-components";
import { getCookie } from "../../shared/cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { __getDetailPosts } from "../../redux/modules/posts";
import { likePost, removePost } from "../../redux/modules/posts";
import Postmodal from "../postmodal/Postmodal";
import { useParams } from "react-router";

const Postdetail = () => {
  const token = getCookie("ACCESS_TOKEN"); //getCookie로 token 가져오기
  const fresh = getCookie("REFRESH_TOKEN");
  console.log(fresh);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [modal, setModal] = useState(false);
  const { isLoading, error, detail } = useSelector((state) => state?.posts);
  // console.log(detail.data.id);
  let { id } = useParams();
  useEffect(() => {
    dispatch(__getDetailPosts(id));
  }, [dispatch]);
  if (isLoading) {
    return <div>...로딩중</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  const close = () => {
    setModal(false);
  };

  const onDeleteHandler = async (event) => {
    event.preventDefault();
    const payload = {
      id: detail.data.id,
      token: token,
      fresh: fresh,
    };
    dispatch(removePost(payload))
      .unwrap()
      .then((originalPromiseResult) => {
        console.log("삭제성공");
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
      });

    // navigate("/main");

    // const URL = "http://52.79.247.187:8080/api/auth/posts";
    // const data = await axios.delete(URL, detail.data.id, {
    //   headers: {
    //     Authorization: token,
    //     RefreshToken: fresh,
    //   },
    // });
    // console.log(data);
    // if (data.success) {
    //   navigate("/main");
    // }
  };

  return (
    <>
      {modal ? <Postmodal post={detail} close={close} /> : null}

      <PostBox className="modal">
        <UndoButton onClick={() => navigate("/main")}>이전으로</UndoButton>
        <InnerBox>
          <div>
            <h2>{detail?.data?.nickname}</h2>
          </div>
          <div>
            <p>{detail?.data?.title}</p>
          </div>
          <div>
            <p>
              <img src={detail?.data?.imgUrl} alt="image" />
            </p>
          </div>
          <div>
            <p>{detail?.data?.content}</p>
          </div>
          <div>
            <p>{detail?.data?.likes}</p>
          </div>
          <div>
            <Button
              onClick={() => {
                dispatch(likePost(detail?.data?.id));
              }}
            >
              💙
            </Button>

            <Button
              onClick={() => {
                setModal(true);
              }}
            >
              수정
            </Button>

            <Button
              onClick={
                onDeleteHandler
                // navigate("/main", { replace: true });
              }
            >
              삭제
            </Button>
          </div>
        </InnerBox>
      </PostBox>
    </>
  );
};

export default Postdetail;

const PostBox = styled.div`
  width: 600px;
  height: 400px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  margin-top: 40px;
  margin-left: 300px;
`;
const UndoButton = styled.button`
  margin-top: 30px;
  margin-left: 30px;
  width: 80px;
  height: 35px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;
const Button = styled.button`
  margin-top: 100px;
  margin-left: 10px;
  width: 50px;
  height: 35px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;
const InnerBox = styled.div`
  width: 500px;
  height: 300px;
  margin-left: 40px;
  margin-top: 20px;
  display: block;
`;

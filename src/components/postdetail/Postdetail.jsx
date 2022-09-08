import React from "react";
import styled from "styled-components";
import Postmodal from "../postmodal/Postmodal";
import { onLikePost } from "../../redux/modules/posts";
import { getCookie } from "../../shared/cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { __getDetailPosts } from "../../redux/modules/posts";
import { removePost } from "../../redux/modules/posts";

import { useParams } from "react-router";

const Postdetail = () => {
  const token = getCookie("ACCESS_TOKEN"); //getCookie로 token 가져오기
  const fresh = getCookie("REFRESH_TOKEN");
  // console.log(fresh);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [modal, setModal] = useState(false);
  const { isLoading, error, detail } = useSelector((state) => state?.posts);
  console.log(detail);
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
    dispatch(removePost(payload));
  };

  const onLike = async (event) => {
    event.preventDefault();
    let add1 = { ...detail, likes: detail.data.likes + 1 };
    const payload = {
      token: token,
      fresh: fresh,
    };
    dispatch(onLikePost({ add1, payload }));
  };

  // .unwrap()
  // .then((originalPromiseResult) => {
  //   console.log("삭제성공");
  // })
  // .catch((rejectedValueOrSerializedError) => {
  //   // handle error here
  // });

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

  return (
    <>
      {modal ? <Postmodal post={detail} close={close} /> : null}
      <PostBox className="modal">
        <UndoButton onClick={() => navigate("/main")}>이전으로</UndoButton>
        <InnerBox>
          <div>
            <div>
              <h2>{detail?.data?.nickname}</h2>
            </div>
            <div>
              <p>{detail?.data?.title}</p>
            </div>
            <div>
              <ImgDiv>
                <img src={detail?.data?.imgUrl} alt="image" />
              </ImgDiv>
            </div>
            <div>
              <p>{detail?.data?.content}</p>
            </div>
            <div>
              <p>{detail?.data?.likes}</p>
            </div>
            <div>
              <HeartButton onClick={onLike}>💙</HeartButton>
              <Button
                onClick={() => {
                  setModal(true);
                }}
              >
                수정
              </Button>
              <Button onClick={onDeleteHandler}>삭제</Button>
            </div>
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
  margin-left: 480px;
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
const ImgDiv = styled.div`
  width: 300px;
  height: 300px;
  bottom: 20px;
  right: 30px;
  justify-content: left;
  border-radius: 30px;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const HeartButton = styled.button`
  margin-top: 100px;
  margin-left: 10px;
  width: 50px;
  height: 35px;
  border: none;
  border-radius: 5px;
  background: none;
`;

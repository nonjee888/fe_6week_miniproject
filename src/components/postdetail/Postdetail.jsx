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
      id: detail.id,
      token: token,
      fresh: fresh,
    };
    dispatch(removePost(payload));
  };

  const onLike = async (event) => {
    event.preventDefault();
    dispatch(onLikePost(id));
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
        <Innerbox>
          <Divintitle>
            <h2>{detail?.title}</h2>
          </Divintitle>

          <Divinimage>
            <ImgDiv>
              <img src={detail?.imgUrl} alt="image" />
            </ImgDiv>
          </Divinimage>
        </Innerbox>

        <Innerbox2>
          <Divinback>
            <UndoButton onClick={() => navigate("/main")}>🔙</UndoButton>
          </Divinback>

          <Divinname>
            <label>ID :</label>
            {detail?.nickname}
          </Divinname>

          <Divincontext>
            <div>{detail?.content}</div>
          </Divincontext>

          <Divin3button>
            <Divinlike>
              <p>{detail?.likes}</p>
            </Divinlike>

            <HeartButton onClick={onLike}>💙</HeartButton>
            <HeartButton
              onClick={() => {
                setModal(true);
              }}
            >
              ✍️
            </HeartButton>
            <HeartButton onClick={onDeleteHandler}>🗑️</HeartButton>
          </Divin3button>
        </Innerbox2>
      </PostBox>
    </>
  );
};
export default Postdetail;

const Innerbox = styled.div`
  border: none;
  width: 300px;
`;

const Divincontext = styled.div`
  border: none;
  width: 250px;
  height: 300px;
  margin-top: 50px;
  margin-left: 35px;
  background: #ffffff;

  border-radius: 6px;
`;

const Innerbox2 = styled.div`
  border: none;
  width: 290px;
`;

const Divintitle = styled.div`
  border: none;
  width: 300px;
  margin-left: 10px;
`;

const Divinimage = styled.div`
  border: none;
  width: 300px;
  margin-left: 10px;
`;
const Divinlike = styled.div`
  border: none;
  float: left;
  color: gray;
`;

const Divinback = styled.div`
  border: none;
  width: 40px;
  margin-left: 240px;
  margin-top: 5px;
`;

const Divin3button = styled.div`
  border: none;
  width: 194px;
  float: right;
  margin-top: 30px;
`;

const Divinname = styled.div`
  border: none;
  width: 105px;
  height: 40px;
  display: flex;
  margin-left: 190px;
  float: right;
`;

const PostBox = styled.div`
  width: 600px;
  height: 500px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  margin-top: 40px;
  margin-left: 300px;
  display: flex;
  font-family: "IBM Plex Sans KR", sans-serif;
`;
const UndoButton = styled.button`
  margin-top: 1px;
  margin-right: 30px;
  width: 45px;
  height: 40px;
  border: none;
  background: none;
  font-size: 20pt;
  & hover {
    transform: scale(1);
    transition: all 0.2s linear;
    overflow: hidden;
  }
`;

const ImgDiv = styled.div`
  width: 300px;
  height: 400px;
  bottom: 20px;
  right: 30px;
  justify-content: left;
  border-radius: 30px;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    & hover {
      transform: scale(1.3);
      transition: all 0.2s linear;
      overflow: hidden;
    }
  }
`;
const HeartButton = styled.button`
  margin-top: 10px;
  margin-left: 10px;
  width: 50px;
  height: 35px;
  border: none;
  border-radius: 5px;
  background: none;
  font-size: 15pt;
  & hover {
    transform: scale(1.9);
    transition: all 0.2s linear;
    overflow: hidden;
  }
`;

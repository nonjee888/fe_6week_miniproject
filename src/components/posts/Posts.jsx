import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Posts = ({ post }) => {
  // console.log(post);
  let navigate = useNavigate();
  return (
    <>
      <div className="list">
        <PostBody>
          <PostTitle onClick={() => navigate("/view/" + post?.id)}>
            <Texts>
              <Divinuser>
                <p>{post?.nickname}</p>
              </Divinuser>
              <Divintitle>
                <h3>{post?.title}</h3>
              </Divintitle>
              <div>
                <span>💙 {post?.likes}</span>
              </div>
            </Texts>
            <ImgDiv>
              <img src={post?.imgUrl} alt="image" />
            </ImgDiv>
          </PostTitle>
        </PostBody>
      </div>
    </>
  );
};

export default Posts;

const Divintitle = styled.div`
  border: none;
  width: 150px;
  height: 70px;
`;

const Divinuser = styled.div`
  border: none;
  width: 80px;
  height: 30px;
`;

const PostTitle = styled.div`
  margin-top: 40px;
  margin-left: 35px;
  background-color: white;
  position: relative;
  justify-content: space-between;
  display: flex;
  border-radius: 10px;
  height: 250px;
  width: 350px;
  float: left;
  cursor: pointer;
  &:hover {
    color: #0000cd;
    background: #ffffff;
  }
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;
const PostBody = styled.div`
  max-height: 1200px;
  min-width: 1000px;
  margin: 0;
  padding: 0;
`;
const Texts = styled.div`
  margin-top: 30px;
  margin-left: 30px;
  font-family: "IBM Plex Sans KR", sans-serif;
`;
const ImgDiv = styled.div`
  width: 150px;
  height: 150px;
  position: absolute;
  bottom: 50px;
  right: 30px;
  border-radius: 30px;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PostTitle = styled.h4`
  background-color: white;
  border-radius: 10px;
  height: 30%;
  width: 800px;
  margin: auto;
  margin-top: 30px;
  cursor: pointer;
  &:hover {
    color: blue;
  }
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
`;

const Posts = ({ post }) => {
  let navigate = useNavigate();
  return (
    <>
      <div className="list">
        <PostTitle onClick={() => navigate("/view/" + post.id)}>
          <p>{post.nickname}</p>
          <p>{post.title}</p>
          <span>💙 </span>
          <p>{post.count}</p>
        </PostTitle>
      </div>
    </>
  );
};

export default Posts;

import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Posts = ({ post }) => {
  let navigate = useNavigate();
  console.log(post);
  return (
    <>
      <div className="list">
        <PostBody>
          <PostTitle onClick={() => navigate("/view/" + post.id)}>
            <Texts>
              <div>
                <p>{post.nickname}</p>
              </div>
              <div>
                <p>{post.title}</p>
              </div>
              <div>
                <span>💙 </span>
              </div>
              <div>
                <p>{post.count}</p>
              </div>
            </Texts>
          </PostTitle>
        </PostBody>
      </div>
    </>
  );
};

export default Posts;

const PostTitle = styled.h4`
  margin-top: 40px;
  margin-left: 68px;
  background-color: white;
  justify-content: space-between;
  display: flex;
  border-radius: 10px;
  height: 250px;
  width: 300px;
  float: left;
  cursor: pointer;
  &:hover {
    color: blue;
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
`;

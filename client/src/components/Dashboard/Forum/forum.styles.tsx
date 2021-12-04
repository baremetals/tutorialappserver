import styled from "styled-components";
// import { FcLike } from "react-icons/fc";
import { FcComments } from "react-icons/fc";
import { AiOutlineFolderView, AiOutlineLike, AiFillLike } from "react-icons/ai";
import { MdExpandMore } from "react-icons/md";

export const ForumWrapper = styled.div`
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgb(0 0 0 / 20%);
  border-radius: 0.5rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ViewMore = styled.button`
  background-color: transparent;
  color: #256ce1;
  font-size: 0.875rem;
  border-radius: 0.25rem;
  padding: 0;
  border: none;
  cursor: pointer;
  line-height: 1;
  text-transform: uppercase;
  font-weight: bold;
`;

export const PostDropdown = styled.div`
  position: relative;
`;

export const LikeGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const ForumContainer = styled.div`
  width: 100%;
  border-radius: 0.625rem;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  margin: 30px 0;
`;

export const PostTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
export const PostLeftWrap = styled.div`
  display: flex;
  align-items: center;
`;
export const PostProfileImge = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
  margin-right: .2rem;
`;
export const UserName = styled.span`
  font-size: 1rem;
  font-weight: 500;
  display: block;
`;
export const PostDate = styled.span`
  font-size: 0.75rem;
  color: #b5b5b5;
  display: block;
`;
export const PostTopRightWrap = styled.div``;

export const ExpandIcon = styled(MdExpandMore)`
  cursor: pointer;
`;

export const PostCenterWrap = styled.div`
  margin-bottom: 1rem;
  position: relative;
  flex: 1 0 0%;
  display: flex;
  flex-direction: column;
`;

export const PostTitle = styled.h2`
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;
export const PostText = styled.span`
  display: block;
  color: #06e18d;
  font-weight: 500;
  margin-bottom: 1rem;
  margin-top: auto;
`;


export const PostMediaImage = styled.img`
  margin-top: 1rem;
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  display: block;
`;

export const PostMediaVideo = styled.video`
  margin-top: 1rem;
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  display: block;
`;

export const PostMediaVideoIF = styled.iframe`
  margin-top: 1rem;
  width: 100%;
  max-height: 192px;
  object-fit: contain;
  border: none;
  outline: none;
  display: block;

  &:focus {
    outline: none;
  }
`;

export const PostBottomWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
`;
export const BottomLeftWrap = styled.div`
  display: flex;
  align-items: center;
`;
export const FilledLikeIcon = styled(AiFillLike)`
  width: 24px;
  height: 24px;
  margin-right: 5px;
  cursor: pointer;
  color: blue;
`;

export const UnFilledLikeIcon = styled(AiOutlineLike)`
  width: 24px;
  height: 24px;
  margin-right: 5px;
  cursor: pointer;

`;
export const ViewIcon = styled(AiOutlineFolderView)`
  width: 24px;
  height: 24px;
  margin-right: 5px;
  cursor: pointer;
`;

export const LikeCounter = styled.span`
  margin-right: 1rem;
`;
export const ViewCounter = styled.span``;

export const BottomRightWrap = styled.div`
  display: flex;
  align-items: center;
`;
export const CommentIcon = styled(FcComments)`
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin-right: 3px;
`;
export const CommentText = styled.span``;

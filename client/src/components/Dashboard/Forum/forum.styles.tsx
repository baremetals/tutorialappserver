import styled from "styled-components";
import { FcLike } from "react-icons/fc";
import { FcComments } from "react-icons/fc";
import { AiOutlineFolderView } from "react-icons/ai";
import { MdExpandMore } from "react-icons/md";

export const ForumContainer = styled.div`
  width: 100%;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  margin: 30px 0;
`;

export const ForumWrapper = styled.div`
  padding: 10px;
`;

export const PostTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const PostLeftWrap = styled.div`
  display: flex;
  align-items: center;
`;
export const PostProfileImge = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;
export const UserName = styled.span`
  font-size: 15px;
  font-weight: 500;
  margin: 0 10px;
`;
export const PostDate = styled.span`
  font-size: 12px;
`;
export const PostTopRightWrap = styled.div`
`;
export const ExpandIcon = styled(MdExpandMore)`

`;

export const PostCenterWrap = styled.div`
  margin: 20px 0;
`;
export const PostText = styled.span`

`;
export const PostMediaImage = styled.img`
  margin-top: 20px;
  width: 100%;
  max-height: 500px;
  object-fit: contain;
`;

export const PostMediaVideo = styled.video`
  margin-top: 20px;
  width: 100%;
  max-height: 500px;
  object-fit: contain;
`;

export const PostMediaVideoIF = styled.iframe`
  margin-top: 20px;
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  border: none;
  outline: none;

  &:focus {
    outline: none;
  }
`;

export const PostBottomWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const BottomLeftWrap = styled.div`
  display: flex;
  align-items: center;
  padding-left: 15px;
`;
export const LikeIcon = styled(FcLike)`
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
  margin-right: 15px;
`;
export const ViewCounter = styled.span`
  
`;
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
export const CommentText = styled.span`
  
`;

import styled from "styled-components"

import { MdExpandMore } from "react-icons/md";


export const CommentCard = styled.div``;

export const CommentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 34px;
`;

export const CommentLeftWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const UserProfileImge = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export const CommentText = styled.span`
  font-size: 14px;
  font-weight: 500;
  margin: 0 10px;
`;

export const CommentDate = styled.span`
  font-size: 10px;
  color: #253ad8;
`;

export const CommentTopRightWrap = styled.div``;

export const ExpandIcon = styled(MdExpandMore)`
  font-size: 20px;
`;

export const CommentHorizontalRule = styled.hr`
  width: 100%;
  height: 3px;
  border-radius: 1rem;
  border: none;
  background-color: rgb(156 151 151);
  margin: 1.5rem auto;
`;
import styled from 'styled-components'
import { MdDeleteForever } from "react-icons/md";


export const NoticesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 34px;
`;

export const NoticeLeftWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const SenderProfileImge = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export const NoticeMessage = styled.span`
  font-size: 14px;
  font-weight: 500;
  margin: 0 10px;
`;
export const NoticeDate = styled.span`
  font-size: 10px;
  color: #253ad8;
`;

export const NoticeTopRightWrap = styled.div``;

export const DeleteIcon = styled(MdDeleteForever)`
  font-size: 20px;
`;
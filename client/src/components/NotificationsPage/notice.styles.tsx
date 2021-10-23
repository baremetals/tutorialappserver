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

export const NoticecRightSide = styled.div`
  flex: 3;
  padding: 20px;
  display: flex;
  justify-content: center;
`;

export const MediaContainer = styled.div`
  width: 100%;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  margin: 30px 0;
  padding-bottom: 20px;
`;

export const NoticesH1 = styled.h1`
  font-size: 2.5rem;
  color: #655e5e;
  margin-bottom: 34px;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;
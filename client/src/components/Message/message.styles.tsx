import styled from 'styled-components'

export const MessageWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const OwnerMessageWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: flex-end;
`;

export const OwnerMessageText = styled.p`
  padding: 10px;
  border-radius: 20px;
  background-color: rgb(233, 74, 188);
  color: black;
  max-width: 300px;
`;


export const MessageTop = styled.div`
  display: flex;
`;
export const MessageImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;
export const MessageText = styled.p`
  padding: 10px;
  border-radius: 20px;
  background-color: #1877f2;
  color: white;
  max-width: 300px;
`;
export const MessageBottom = styled.div`
  font-size: 12px;
  margin-top: 10px;
`;

export const MessageOwner = styled.div`
  align-items: flex-end;
`;
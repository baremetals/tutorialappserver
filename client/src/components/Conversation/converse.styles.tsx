import styled from 'styled-components'

export const ConversationWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: rgb(245, 243, 243);
  }
`;
export const ConversationImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;
export const ConversationUserName = styled.span`
  font-weight: 500;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
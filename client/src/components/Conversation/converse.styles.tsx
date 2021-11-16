import styled from 'styled-components'

export const ConversationWrap = styled.div`
  display: flex;
  align-items: center;
  padding: .625rem;
  cursor: pointer;
  margin-top: 1rem;
  &:hover {
    background-color: rgb(245, 243, 243);
    border-radius: 1rem;
  }
`;
export const ConversationImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
`;
export const ConversationUserName = styled.span`
  font-weight: 500;
`;
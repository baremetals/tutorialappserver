import styled from 'styled-components'

export const MessageWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  position: relative;
  padding-top: 1rem;
`;

export const OwnerMessageWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 1rem;
`;

export const OwnerMessageText = styled.p`
  padding: 0.5rem 0.75rem;
  border-radius: 2rem;
  background-color: rgb(233, 74, 188);
  color: white;
  max-width: 25rem;
`;


export const MessageTop = styled.div`
  display: flex;
`;
export const MessageImg = styled.img`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 0.5rem;
`;
export const MessageText = styled.p`
  padding: 0.5rem 0.75rem;
  border-radius: 2rem;
  background-color: #1877f2;
  color: white;
  max-width: 25rem;
`;
export const MessageBottom = styled.div`
  font-size: 0.75rem;
  position: absolute;
  top: -0.25rem;
  left: 3rem;
`;

export const MessageDate = styled.div`
  font-size: 0.75rem;
  /* position: absolute; */
  top: -0.25rem;
  right: 3rem;
`;

export const MessageOwner = styled.div`
  align-items: flex-end;
`;

export const ScrollChat = styled.div`
  overflow-y: auto;
  height: 100%;
`;
import styled from 'styled-components'

export const MsgContainer = styled.div`
  height: calc(100vh - 100px);
  display: flex;
`;
export const MsgChatMenu = styled.div`
  max-width: 20rem;
  min-width: 20rem;
  background-color: rgb(0 0 0 / 5%);
  border-right: 1px solid rgb(0 0 0 / 10%);
  padding: 2rem;
  overflow-y: auto;
  z-index: 100;
  @media (max-width: 1366px) {
    max-width: 18rem;
    min-width: 18rem;
  }

  @media (max-width: 991px) {
    transform: translateX(-100%);
    background-color: #ededed;
    position: fixed;
    left: 0;
    top: 70px;
    bottom: 0;
    padding: 2rem 1rem;
  }
  &.opened {
    transform: none;
  }
`;

export const MsgChatMenuWrapper = styled.div`
  padding: 0;
  height: 100%;
`;
export const MsgChatMenuInput = styled.input`
  width: 100%;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 10rem;
  box-shadow: 1px 1px 5px rgb(0 0 0 / 14%);
  background: rgb(255 255 255 / 70%);
  outline: none;
`;

export const ChatBoxContainer = styled.div`
  flex: auto;
`;

export const ChatBoxWrapper = styled.div`
  height: calc(100vh - 100px);
  @media (max-width: 991px) {
    height: calc(100vh - 70px);
  }
`;

export const ChatBoxTop = styled.div`
  height: calc(100% - 4rem);
  background-color: #fff;
  display: flex;
  align-items: flex-end;
  @media (max-width: 991px) {
    padding-top: 3.5rem;
  }
  > div {
    overflow-y: auto;
    padding: 1.25rem;
    width: 100%;
    max-height: 100%;
  }
`;

export const ChatBoxBottom = styled.div`
  position: relative;
  border-top: 1px solid rgb(0 0 0 / 5%);
  height: 4rem; ;
`;

export const ChatMessageInput = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 1rem 4rem 1rem 1.25rem;
  border: none;
  font-size: 1rem;
  display: block;
  outline: none;
  resize: none;
`;

export const ChatSubmitButton = styled.button`
  width: 4rem;
  height: 4rem;
  border: none;
  cursor: pointer;
  color: #000;
  background-color: transparent;
  font-size: 1rem;
  text-transform: capitalize;
  font-weight: bold;
  position: absolute;
  right: 0;
  bottom: 0;
`;

export const OnlineChatContainer = styled.div`
  max-width: 20rem;
  min-width: 20rem;
  padding: 2rem;
  overflow-y: auto;
  @media (max-width: 1366px) {
    max-width: 18rem;
    min-width: 18rem;
  }

  @media (max-width: 991px) {
    position: absolute;
    top: 70px;
    padding: 0.5rem 1.5rem;
    right: 0;
    min-width: auto;
    max-width: initial;
  }
`;

export const OnlineChatWrapper = styled.div`
  padding: 0;
  height: 100%;
  @media (max-width: 991px) {
    display: flex;
  }
`;

export const NoConversationText = styled.span`
  position: absolute;
  top: 10%;
  font-size: 50px;
  color: rgb(224, 220, 220);
  cursor: default;
`;
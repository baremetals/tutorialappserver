import styled from 'styled-components'

export const MsgContainer = styled.div`
  height: calc(100vh - 70px);
  display: flex;
`;
export const MsgChatMenu = styled.div`
  flex: 3.5;

  @media screen and (max-width: 768px) {
    flex: 1;
  }
`;

export const MsgChatMenuWrapper = styled.div`
  padding: 10px;
  height: 100%;
`;
export const MsgChatMenuInput = styled.input`
  width: 90%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid gray;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const ChatBoxContainer = styled.div`
  flex: 5.5;

  @media screen and (max-width: 768px) {
    flex: 10;
  }
`;

export const ChatBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  padding: 10px;
  /* height: 100%; */
`;

export const ChatBoxTop = styled.div`
  height: 100%;
  overflow-y: scroll;
  padding-right: 10px;
`;

export const ChatBoxBottom = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ChatMessageInput = styled.textarea`
  width: 80%;
  height: 90px;
  padding: 10px;
  border-radius: .5rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const ChatSubmitButton = styled.button`
  width: 70px;
  height: 40px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: teal;
  color: white;
`;

export const OnlineChatContainer = styled.div`
  flex: 3;
  @media screen and (max-width: 768px) {
    flex: 1px;
  }
`;

export const OnlineChatWrapper = styled.div`
  padding: 10px;
  height: 100%;
`;

export const NoConversationText = styled.span`
  position: absolute;
  top: 10%;
  font-size: 50px;
  color: rgb(224, 220, 220);
  cursor: default;

`;
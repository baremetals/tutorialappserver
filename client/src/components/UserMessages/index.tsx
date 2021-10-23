import React from 'react'
import Conversation from '../Conversation';
import Message from '../Message';
import OnlineChat from '../OnlineChat';
import {
  MsgContainer,
  MsgChatMenu,
  MsgChatMenuWrapper,
  MsgChatMenuInput,
  ChatBoxContainer,
  ChatBoxWrapper,
  ChatBoxTop,
  ChatBoxBottom,
  ChatMessageInput,
  ChatSubmitButton,
  OnlineChatContainer,
  OnlineChatWrapper
  
} from "./msg.styles";

function UserMessages() {
    return (
      <MsgContainer>
        <MsgChatMenu>
          <MsgChatMenuWrapper>
            <MsgChatMenuInput placeholder="Search for a user" />
            <div>
              <Conversation />
            </div>
          </MsgChatMenuWrapper>
        </MsgChatMenu>
        <ChatBoxContainer>
          <ChatBoxWrapper>
            <ChatBoxTop>
                <div>
                    <Message />
                </div>
            </ChatBoxTop>
            <ChatBoxBottom>
              <ChatMessageInput placeholder="write something..." ></ChatMessageInput>
              <ChatSubmitButton>send</ChatSubmitButton>
            </ChatBoxBottom>
          </ChatBoxWrapper>
        </ChatBoxContainer>
        <OnlineChatContainer>
            <OnlineChatWrapper>
                <OnlineChat />
            </OnlineChatWrapper>
        </OnlineChatContainer>
      </MsgContainer>
    );
}

export default UserMessages

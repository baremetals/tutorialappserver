import React, { useState } from "react";
import Conversation from '../Conversation';
import Message from '../Message';
import OnlineChat from '../OnlineChat'
import {
  BackOverlay,
  SearchButton,
} from "components/Dashboard/LeftSideBar/leftside.styles";
import { SearchIcon } from "components/Dashboard/TopBar/topbar.styles";
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
  const [menuState, setMenuState] = useState(false);
  {
    menuState && (
      <BackOverlay onClick={() => setMenuState(false)} className="" />
    );
  }

  // const [leftSearch, setLeftSearch] = useState(false);

    return (
      <>
        <SearchButton onClick={() => setMenuState(true)} className="toggleMenu">
          <SearchIcon></SearchIcon>
        </SearchButton>
        {menuState && (
          <BackOverlay onClick={() => setMenuState(false)} className="" />
        )}
        <MsgContainer>
          <MsgChatMenu className={menuState ? "opened" : ""}>
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
                <ChatMessageInput placeholder="write something..."></ChatMessageInput>
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
      </>
    );
}

export default UserMessages

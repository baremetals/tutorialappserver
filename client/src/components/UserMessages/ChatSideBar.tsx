import React, { useState } from "react";
import Conversation from "../Conversation";
// import Message from "../Message";
import OnlineChat from "../OnlineChat";
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
  OnlineChatContainer,
  OnlineChatWrapper,
  ChatBoxContainer,
  ChatBoxWrapper,

} from "./msg.styles";
import {
  useGetChatMessagesByUserIdQuery,
  // useRespondToChatMessageMutation,
} from "generated/graphql";
import { useAppSelector } from "app/hooks";
import { isUser } from "features/auth/selectors";



const ChatSideBar = ({children}: any) => {
    const { data, loading } = useGetChatMessagesByUserIdQuery();
    const [menuState, setMenuState] = useState(false);
    const { user: user } = useAppSelector(isUser);
    {
      menuState && (
        <BackOverlay onClick={() => setMenuState(false)} className="" />
      );
    }

    const messages = data?.getChatMessagesByUserId.chats;
    const errorMsg = data?.getChatMessagesByUserId.messages;
    const me = user;
    // console.log(data?.getChatMessagesByUserId.messages[0]);

    if (!data?.getChatMessagesByUserId || loading) {
      return <div>loading...</div>;
    }
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
            {errorMsg && (
              <>
                <br />
                <br />
                <div> You Currently have no messages</div>
              </>
            )}
            { messages !== undefined && messages.map(
              (
                msg: {
                  id: string | undefined;
                  recipient: {
                    id: string | undefined;
                    username: string;
                    profileImage: string;
                  };
                  owner: { id: string; username: string; profileImage: string };
                },
                id: React.Key | null | undefined
              ) =>
                me?.id !== msg.recipient.id ? (
                  <div key={id}>
                    <Conversation
                      username={msg.recipient.username}
                      image={msg.recipient.profileImage}
                      id={msg.id}
                    />
                  </div>
                ) : (
                  <div key={id}>
                    <Conversation
                      username={msg.owner.username}
                      image={msg.owner.profileImage}
                      id={msg.id}
                    />
                  </div>
                )
            )}
          </MsgChatMenuWrapper>
        </MsgChatMenu>
        <ChatBoxContainer>
          <ChatBoxWrapper>{children}</ChatBoxWrapper>
        </ChatBoxContainer>
        <OnlineChatContainer>
          <OnlineChatWrapper>
            <OnlineChat profileImage='/Aleah.jpg' username="pretty girl" online={true}/>
          </OnlineChatWrapper>
        </OnlineChatContainer>
      </MsgContainer>
    </>
  );
};

export default ChatSideBar

import React from "react";

import {
  ChatContainer,
  OnlineUsersWrap,
  OnlineUsersImageWrap,
  OnlineUsersImage,
  OnlineUsersImageBadge,
  OnlineUsersName,
} from "./chat.styles";

function OnlineChat() {
  return (
    <>
      <ChatContainer>
        <OnlineUsersWrap>
          <OnlineUsersImageWrap>
            <OnlineUsersImage alt="Online user image" src="/Aleah.jpg" />
            <OnlineUsersImageBadge></OnlineUsersImageBadge>
          </OnlineUsersImageWrap>
          <OnlineUsersName>aleah</OnlineUsersName>
        </OnlineUsersWrap>
      </ChatContainer>
      <ChatContainer>
        <OnlineUsersWrap>
          <OnlineUsersImageWrap>
            <OnlineUsersImage alt="Online user image" src="/D.jpg" />
            <OnlineUsersImageBadge></OnlineUsersImageBadge>
          </OnlineUsersImageWrap>
          <OnlineUsersName>maguyva</OnlineUsersName>
        </OnlineUsersWrap>
      </ChatContainer>
      <ChatContainer>
        <OnlineUsersWrap>
          <OnlineUsersImageWrap>
            <OnlineUsersImage alt="Online user image" src="/prettygirl.jpg" />
            <OnlineUsersImageBadge></OnlineUsersImageBadge>
          </OnlineUsersImageWrap>
          <OnlineUsersName>aleah</OnlineUsersName>
        </OnlineUsersWrap>
      </ChatContainer>
    </>
  );
}

export default OnlineChat;

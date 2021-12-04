import React from "react";

import {
  ChatContainer,
  OnlineUsersWrap,
  OnlineUsersImageWrap,
  OnlineUsersImage,
  OnlineUsersImageBadge,
  OnlineUsersName,
} from "./chat.styles";

function OnlineChat({
  profileImage,
  username,
  online,
}: {
  profileImage: string ;
  username: string;
  online: boolean;
}) {
  return (
    <>
      <ChatContainer>
        <OnlineUsersWrap>
          <OnlineUsersImageWrap>
            <OnlineUsersImage alt="Online user image" src={profileImage} />
            {online && <OnlineUsersImageBadge></OnlineUsersImageBadge>}
          </OnlineUsersImageWrap>
          <OnlineUsersName>{username}</OnlineUsersName>
        </OnlineUsersWrap>
      </ChatContainer>
    </>
  );
}

export default OnlineChat;

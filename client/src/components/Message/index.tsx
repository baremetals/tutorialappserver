import React, { useEffect, useState } from 'react'
import { useQuery } from "@apollo/client";
import { useAppSelector } from "app/hooks";
import { isUser } from "features/auth/selectors";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { useRouter } from "next/router";
import {
  MessageWrap,
  MessageTop,
  MessageImg,
  MessageText,
  MessageDate,
  MessageBottom,
  OwnerMessageWrap,
  OwnerMessageText,
} from "./message.styles";
import {
  GetChatMessagesByChatIdDocument,
  User,
  useNewChatMessageSubscription,
} from "generated/graphql";


type MessagePageType = {
  body: string;
  createdBy: string;
  id: string;
  createdOn: string;
  isRead: boolean;
  receiver: User;
  sender: User;
};

function Message() {
  const router = useRouter();
  const { chatId } = router.query;
  const { user: user } = useAppSelector(isUser);

  const { ...result } = useQuery(
    GetChatMessagesByChatIdDocument,
    {
      variables: {
        chatId: chatId,
      },
    }
  );

  const { data } = useNewChatMessageSubscription();
  const newChatMessage = data?.newChatMessage;
  const messages = result.data?.getChatMessagesByChatId.chatMsgs;
  const [msgArray, setMsgArray] = useState([]);
  // console.log(newChatMessage);
  // console.log(result.error);
  const me: string | undefined | any = user?.id;

  useEffect(() => {
    if (newChatMessage) {
      const newChatMessageItem = newChatMessage;
      const newArrayItem: any = (prevArray: MessagePageType[]) => {
        return [...prevArray, newChatMessageItem];
      };
      setMsgArray(newArrayItem);
    }
  }, [newChatMessage]);

  

  if (!result.data || result.loading) {
    return <div>loading...</div>;
  }
  return (
    <>
      {result.error ||
        !messages ||
        (messages.length === 0 && <div> no messages </div>)}

      {!result.loading &&
        msgArray.concat(messages).map((msg: any, id: any) =>
          me === msg.sender.id ? (
            <OwnerMessageWrap key={id}>
              <MessageTop>
                <MessageImg alt="Message image" src={msg.sender.profileImage} />
                <OwnerMessageText>{msg.body}</OwnerMessageText>
              </MessageTop>
              <MessageDate>{dayjs(msg.createdOn).fromNow()}</MessageDate>
            </OwnerMessageWrap>
          ) : (
            <MessageWrap key={id}>
              <MessageTop>
                <MessageImg alt="Message image" src="/prettygirl.jpg" />
                <MessageText>{msg.body}</MessageText>
              </MessageTop>
              <MessageBottom>{dayjs(msg.createdOn).fromNow()}</MessageBottom>
            </MessageWrap>
          )
        )}
    </>
  );
}

export default Message

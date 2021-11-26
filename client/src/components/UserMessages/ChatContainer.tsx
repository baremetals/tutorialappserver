import React from 'react'
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  useRespondToChatMessageMutation,
} from "generated/graphql";
import ChatSideBar from './ChatSideBar';
import { ChatBoxBottom, ChatBoxTop, ChatMessageInput, ChatSubmitButton } from './msg.styles';
import Message from 'components/Message';
import { useAppSelector } from "app/hooks";
import { isUser } from "features/auth/selectors";

type FormInput = {
  body: string;
};

const ChatContainer = () => {
  const router = useRouter();
  const {chatId } = router.query
  const [newChatMsg] = useRespondToChatMessageMutation();
   const { user: user } = useAppSelector(isUser);
  const {
    // setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
    
    const onSubmit = async ({body}: any) => {
        
    try {
      const response = await newChatMsg({
        variables: {
          senderUserId: user?.id as string,
          chatId: chatId as string,
          body,
        },
      });

      if (response.data?.respondToChatMessage) {

        console.log(response.data?.respondToChatMessage);
      }
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  };
  return (
    <>
      <ChatSideBar>
        <ChatBoxTop>
          <div>
            <Message />
          </div>
        </ChatBoxTop>
        <ChatBoxBottom>
          <form onSubmit={handleSubmit(onSubmit)}>
            {errors.body && <span>text is required</span>}
            <ChatMessageInput
              placeholder="write something..."
              {...register("body", { required: true })}
              name="body"
            ></ChatMessageInput>
            <ChatSubmitButton type="submit">send</ChatSubmitButton>
          </form>
        </ChatBoxBottom>
      </ChatSideBar>
    </>
  );
}

export default ChatContainer

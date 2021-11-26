import React from "react";
import { useForm } from "react-hook-form";
import ChatSideBar from "./ChatSideBar"
import Message from '../Message';

import {
  ChatBoxTop,
  ChatBoxBottom,
  ChatMessageInput,
  ChatSubmitButton,
} from "./msg.styles";
import { useRouter } from 'next/router';
import { useCreateChatMessageMutation } from "generated/graphql";
import { useAppSelector } from "app/hooks";
import { isUser } from "features/auth/selectors";

type FormInput = {
  body: string;
};


function UserMessages() {
  const router = useRouter();
  const [newChat] = useCreateChatMessageMutation();
  const { user: user } = useAppSelector(isUser);
  const {
    // setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const pathname = router.pathname;
  const me = user;
  // console.log(me)


  const onSubmit = async ({body}: any) => {

    try {
      const response = await newChat({
        variables: {
          ownerUserId: me?.id as string,
          recipientUserId: "4",
          body,
        },
      });

      if (response.data?.createChatMessage) {

        console.log(response.data?.createChatMessage);
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
          {pathname === "/messages" ? null : (
            <div>
              <Message />
            </div>
          )}
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

export default UserMessages



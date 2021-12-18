import React from "react";
import { requireAuthentication } from "lib/requireAuthentication";
import { GetServerSideProps } from "next";
import { useIsAuth } from 'lib/isAuth';
import ChatSideBar from 'components/Chat/ChatSideBar';

function Messages() {
    useIsAuth();
  return (
    <>
      <ChatSideBar />
    </>
  );
}
export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (_ctx) => {
    return {
      props: {},
    };
  }
);
export default Messages;

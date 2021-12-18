import React from 'react'
import { requireAuthentication } from "lib/requireAuthentication";
import { GetServerSideProps } from "next";
import { useIsAuth } from 'lib/isAuth';
import ChatContainer from 'components/Chat/ChatContainer';

function Chat() {
  useIsAuth();
    return (
      <>
        <ChatContainer />
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
export default Chat

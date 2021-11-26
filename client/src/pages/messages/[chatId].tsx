import React from 'react'
import { requireAuthentication } from "lib/requireAuthentication";
import { GetServerSideProps } from "next";
import Topbar from '../../components/Dashboard/TopBar'
import { useIsAuth } from 'lib/isAuth';
import ChatContainer from 'components/UserMessages/ChatContainer';

function Chat() {
  useIsAuth();
    return (
      <>
        <Topbar />
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

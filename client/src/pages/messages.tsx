import React from "react";
import { requireAuthentication } from "lib/requireAuthentication";
import { GetServerSideProps } from "next";
import Topbar from "../components/Dashboard/TopBar";
// import UserMessages from "../components/UserMessages";
import { useIsAuth } from 'lib/isAuth';
import ChatSideBar from 'components/UserMessages/ChatSideBar';

function Messages() {
    useIsAuth();
  return (
    <>
      <Topbar />
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

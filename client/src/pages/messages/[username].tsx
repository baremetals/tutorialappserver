import React from 'react'
import { requireAuthentication } from "lib/requireAuthentication";
import { GetServerSideProps } from "next";
import Topbar from '../../components/Dashboard/TopBar'
import UserMessages from '../../components/UserMessages'

function Chat() {
    return (
        <>
           <Topbar />
           <UserMessages /> 
        </>
    )
}
export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (_ctx) => {
    return {
      props: {},
    };
  }
);
export default Chat

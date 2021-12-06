import React from 'react'
import { requireAuthentication } from "lib/requireAuthentication";
import { GetServerSideProps } from "next";
import Topbar from "../../../components/Dashboard/TopBar";
import { useIsAuth } from "lib/isAuth";
import UserMessages from 'components/UserMessages';


const NewChatMessage = () => {
    useIsAuth();
    return (
      <>
        <Topbar />
        <UserMessages />
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

export default NewChatMessage

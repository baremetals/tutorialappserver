import React from 'react'
import { requireAuthentication } from "lib/requireAuthentication";
import { GetServerSideProps } from "next";
import Topbar from '../../components/Dashboard/TopBar'
import { useIsAuth } from 'lib/isAuth';
import ChatContainer from 'components/UserMessages/ChatContainer';
import { client } from 'lib/initApollo';
import { GetChatMessagesByUserIdDocument, GetChatMessagesByUserIdQueryResult } from 'generated/graphql';

function Chat(props: any) {
  useIsAuth();
  // const courseData = props.data?.getLatestCourses?.courses;
    return (
      <>
        <Topbar />
        <ChatContainer />
      </>
    );
}
export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (_ctx) => {
    // const { username } = ctx.query;
    // console.log(username);
    // const { data } = await client.query<GetChatMessagesByUserIdQueryResult>({
    //   query: GetChatMessagesByUserIdDocument,
    //   variables: {
    //     chatId: username as string,
    //   },
    // });
    return {
      props: {},
    };
  }
);
export default Chat

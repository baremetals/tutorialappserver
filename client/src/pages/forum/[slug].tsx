import DetailPost from "components/Dashboard/Forum/DetailPost";
import LeftSideBar from "components/Dashboard/LeftSideBar";
import SmallFooter from "components/Dashboard/SmallFooter";
import Topbar from "components/Dashboard/TopBar";
import { GetPostByIdDocument, GetPostByIdQueryResult } from 'generated/graphql';
import { client } from 'lib/initApollo';
import { useIsAuth } from 'lib/isAuth';
import { requireAuthentication } from 'lib/requireAuthentication';
import { GetServerSideProps } from 'next';
import React from "react";
import {
  PageContainer,
  InnerContainer,
  PageRightSide,
} from "styles/common.styles";

const PostDetails = (props: any) => {
  const postData = props.data;

  useIsAuth();
  return (
    <>
      <Topbar />
      <PageContainer>
        <LeftSideBar />
        <InnerContainer>
          <DetailPost
          props={postData}
          />
        </InnerContainer>
        <PageRightSide>Live Forever Young</PageRightSide>
      </PageContainer>
      <SmallFooter />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (ctx) => {
    const { slug } = ctx.query;
    const data = await client.query<GetPostByIdQueryResult>({
      query: GetPostByIdDocument,
      variables: {
        postId: slug as string,
      },
    });
    return {
      props: {data},
    };
  }
);

export default PostDetails;

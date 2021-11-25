import DetailPost from "components/Dashboard/Forum/DetailPost";
import LeftSideBar from "components/Dashboard/LeftSideBar";
import SmallFooter from "components/Dashboard/SmallFooter";
import Topbar from "components/Dashboard/TopBar";
import { useIsAuth } from 'lib/isAuth';
import { requireAuthentication } from 'lib/requireAuthentication';
import { GetServerSideProps } from 'next';
import React from "react";
import {
  PageContainer,
  InnerContainer,
  PageRightSide,
} from "styles/common.styles";

const PostDetails = () => {
  useIsAuth();
  return (
    <>
      <Topbar />
      <PageContainer>
        <LeftSideBar />
        <InnerContainer>
          <DetailPost
            username="maguyva"
            image="/D.jpg"
            date="5 min ago"
            title="tweet tweet tweet"
            body="tweet tweet tweet"
            likeCount={10}
            commentCount={16}
          />
        </InnerContainer>
        <PageRightSide>Live Forever Young</PageRightSide>
      </PageContainer>
      <SmallFooter />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (_ctx) => {
    return {
      props: {},
    };
  }
);

export default PostDetails;

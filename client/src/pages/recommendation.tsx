import React from "react";
import { requireAuthentication } from "lib/requireAuthentication";
import { GetServerSideProps } from "next";
import ForumPage from "components/ForumPage";
import TextPostCard from "components/Dashboard/Forum/TextPostCard";
import VideoPostCard from "components/Dashboard/Forum/VideoPostCard";
import ImagePostCard from "components/Dashboard/Forum/ImagePostCard";

function Recommendation() {
  return (
    <>
      <ForumPage>
          <TextPostCard
            username="maguyva"
            image="/D.jpg"
            date="5 min ago"
            title="tweet tweet tweet"
            body="tweet tweet tweet"
            likeCount="10"
            commentCount={16}
          />
          <VideoPostCard
            username="maguyva"
            image="/D.jpg"
            date="5 min ago"
            title="tweet tweet tweet"
            body="/exvid.mp4"
            likeCount={13}
            commentCount={29}
            viewCount={31}
          />
          <ImagePostCard
            username="maguyva"
            image="/D.jpg"
            date="5 min ago"
            title="tweet tweet tweet"
            body="/isak.jpg"
            likeCount={10}
            commentCount={8}
          />   
      </ForumPage>
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

export default Recommendation;

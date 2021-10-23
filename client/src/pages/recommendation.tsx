import React from 'react'
import Dashboard from "../components/Dashboard";
import { ForumContainer } from "../components/Dashboard/Forum/forum.styles";
import ImagePostCard from "../components/Dashboard/Forum/ImagePostCard";
import TextPostCard from "../components/Dashboard/Forum/TextPostCard";
import VideoPostCard from "../components/Dashboard/Forum/VideoPostCard";
import MiddleSection from "../components/Dashboard/MiddleSection";

function Recommendation() {
    return (
      <Dashboard>
        <MiddleSection>
          <ForumContainer>
            <ImagePostCard
              username="maguyva"
              image="/D.jpg"
              date="5 min ago"
              content="tweet tweet tweet"
              postMedia="/isak.jpg"
              likeCount={10}
              commentCount={8}
            />
          </ForumContainer>
          <ForumContainer>
            <TextPostCard
              username="maguyva"
              image="/D.jpg"
              date="5 min ago"
              content="tweet tweet tweet"
              likeCount="10"
              commentCount={16}
            />
          </ForumContainer>
          <ForumContainer>
            <VideoPostCard
              username="maguyva"
              image="/D.jpg"
              date="5 min ago"
              content="tweet tweet tweet"
              videoMedia="https://www.youtube.com/embed/VC4ORS5n9Hg"
              likeCount={10}
              commentCount={49}
              viewCount={19}
            />
          </ForumContainer>
          <ForumContainer>
            <VideoPostCard
              username="maguyva"
              image="/D.jpg"
              date="5 min ago"
              content="tweet tweet tweet"
              videoMedia="/exvid.mp4"
              likeCount={13}
              commentCount={29}
              viewCount={31}
            />
          </ForumContainer>
        </MiddleSection>
      </Dashboard>
    );
}

export default Recommendation

import React from 'react'
import styled from "styled-components";
import ImagePostCard from '../Dashboard/Forum/ImagePostCard';
import Share from '../Dashboard/Share';

const FeedContainer = styled.div`
  flex: 5.5;
`;

const FeedWrapper = styled.div`
  padding: 20px;
`;

export default function UserFeed() {
    return (
      <FeedContainer>
        <FeedWrapper>
          <Share />
          <ImagePostCard
            username="maguyva"
            image="/D.jpg"
            date="5 min ago"
            content="tweet tweet tweet"
            postMedia="/isak.jpg"
            likeCount={10}
            commentCount={8}
          />
        </FeedWrapper>
      </FeedContainer>
    );
}

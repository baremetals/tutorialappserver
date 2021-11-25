import React from "react";
import styled from "styled-components";
import ImagePostCard from "../Dashboard/Forum/ImagePostCard";
import Share from "../Dashboard/Share";
import { useAppSelector } from "app/hooks";
import { isUser } from "features/auth/selectors";
import { ForumRow, ForumColumn } from "styles/common.styles";

const FeedContainer = styled.div`
  flex: 5.5;
`;

const FeedWrapper = styled.div`
  padding: 0;
`;

export default function UserFeed() {
  const { user: user } = useAppSelector(isUser);
  const mappedUsers = user?.posts?.slice();
  // console.log(user?.posts);
  const sortedUsers = mappedUsers?.sort((a, b) => {
    if (a.createdOn < b.createdOn) {
      return 1;
    }
    if (b.createdOn < a.createdOn) {
      return -1;
    }
    return 0;
  });
  return (
    <FeedContainer>
      <FeedWrapper>
        <Share />
        <ForumRow>
          {!user?.posts ? (
            <div>loading...</div>
          ) : (
            sortedUsers?.map((post) =>
              !post ? null : (
                <ForumColumn>
                  <ImagePostCard
                    key={post.id}
                    username={"maguyva"}
                    image={"/D.jpg"}
                    date={post.createdOn}
                    title={post.title}
                    body={post.title}
                    likeCount={post.points}
                    commentCount={8}
                    postId={post.id}
                  />
                </ForumColumn>
              )
            )
          )}
        </ForumRow>
      </FeedWrapper>
    </FeedContainer>
  );
}

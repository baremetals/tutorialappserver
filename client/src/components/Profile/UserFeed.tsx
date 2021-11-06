import React from "react";
import styled from "styled-components";
import ImagePostCard from "../Dashboard/Forum/ImagePostCard";
import TextPostCard from "../Dashboard/Forum/TextPostCard";
import VideoPostCard from "../Dashboard/Forum/VideoPostCard";
import Share from "../Dashboard/Share";
import { useAppSelector } from "app/hooks";
import { isUser } from "features/auth/selectors";

const FeedContainer = styled.div`
  flex: 5.5;
`;

const FeedWrapper = styled.div`
  padding: 20px;
`;

export default function UserFeed() {
  const { user: user } = useAppSelector(isUser);
  const mappedUsers = user?.posts?.slice();

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
        {!user?.posts ? (
          <div>loading...</div>
        ) : (
          sortedUsers?.map((post) =>
            !post
              ? null
              : (post.postType === "text" && (
                  <TextPostCard
                    key={post.id}
                    username={"maguyva"}
                    image={"/D.jpg"}
                    date={post.createdOn}
                    title={post.title}
                    body={
                      "What is Lorem Ipsum Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    }
                    likeCount={post.points}
                    commentCount={8}
                  />
                )) ||
                (post.postType === "video" && (
                  <VideoPostCard
                    key={post.id}
                    username={"maguyva"}
                    image={"/D.jpg"}
                    date={post.createdOn}
                    title={post.title}
                    body={post.body}
                    likeCount={post.points}
                    commentCount={8}
                  />
                )) ||
                (post.postType === "image" && (
                  <ImagePostCard
                    key={post.id}
                    username={"maguyva"}
                    image={"/D.jpg"}
                    date={post.createdOn}
                    title={post.title}
                    body={post.body}
                    likeCount={post.points}
                    commentCount={8}
                  />
                ))
          )
        )}
      </FeedWrapper>
    </FeedContainer>
  );
}

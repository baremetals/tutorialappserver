import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Card from "../ForumPage/Card";
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

//  type userType = {
//   profileImage: string,
//   backgroundImg: string,
//   fullName: string,
// };

export default function UserFeed(props: any) {
  const router = useRouter();
  const { userIdSlug } = router.query;
  
  // logged in user info
  const { user: user } = useAppSelector(isUser); // logged in user
  const [loggedIUser, setLoggedIUser] = useState(false);
  const mappedUsers = user?.posts?.slice(); // logged in user
  const sortedUsers = mappedUsers?.sort((a, b) => {
    if (a.createdOn < b.createdOn) {
      return 1;
    }
    if (b.createdOn < a.createdOn) {
      return -1;
    }
    return 0;
  });
  // console.log(props)
  // !loggedin user info
  const { posts, profileImage, username,  } = props.props || []; 
  const mappedPosts = posts?.slice();

  // sortByDate(mappedPosts);
  const sortedPosts = mappedPosts?.sort(
    (a: { createdOn: number }, b: { createdOn: number }) => {
      if (a.createdOn < b.createdOn) {
        return 1;
      }
      if (b.createdOn < a.createdOn) {
        return -1;
      }
      return 0;
    }
  );

  // console.log(posts);

  useEffect(() => {
    if (user?.userIdSlug === userIdSlug) {
      setLoggedIUser(true);
    }
  }, [user, userIdSlug]);
  return (
    <FeedContainer>
      <FeedWrapper>
        {loggedIUser && <Share />}
        <ForumRow>
          {user?.posts?.length === 0 ? (
            <div>No Posts</div>
          ) : (
            sortedUsers?.map((post) =>
              !post ? null : (
                <ForumColumn key={post.id}>
                  <Card
                    username={user?.username as string}
                    image={user?.profileImage}
                    date={post.createdOn}
                    title={post.title}
                    body={post.title}
                    likeCount={post.points}
                    commentCount={8}
                    slug={post.slug}
                  />
                </ForumColumn>
              )
            )
          )}
          {posts?.length === 0 &&
            undefined &&
            sortedPosts?.map(
              (
                post: {
                  createdOn: any;
                  title: string;
                  points: number;
                  id: string;
                  slug: string;
                },
                id: React.Key | null | undefined
              ) => (
                <ForumColumn key={id}>
                  <Card
                    username={username}
                    image={profileImage}
                    date={post.createdOn}
                    title={post.title}
                    body={post.title}
                    likeCount={post.points}
                    commentCount={8}
                    slug={post.slug}
                  />
                </ForumColumn>
              )
            )}
        </ForumRow>
      </FeedWrapper>
    </FeedContainer>
  );
}

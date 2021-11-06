import React from "react";

import ImagePostCard from "../components/Dashboard/Forum/ImagePostCard";
import TextPostCard from "../components/Dashboard/Forum/TextPostCard";
import VideoPostCard from "../components/Dashboard/Forum/VideoPostCard";
import { GetLatestPostsDocument, GetLatestPostsQueryResult } from "generated/graphql";

import { requireAuthentication } from "lib/requireAuthentication";
import { GetServerSideProps } from "next";
import { client } from "./_app";
import ForumPage from "components/ForumPage";
import { useIsAuth } from "../lib/isAuth";



function Forum(props: any) {
  useIsAuth();
  // const dispatch = useAppDispatch();
  
  const postData = props.data.getLatestPosts.posts
  // console.log(postData)

  return (
    <>
      <ForumPage>
        {!postData ? (
          <div>loading...</div>
        ) : (
          postData.map((post: any, id: string) =>
            !post
              ? null
              : (post.postType === "text" && (
                  <TextPostCard
                    key={id}
                    username={post.creator.username}
                    image="/D.jpg"
                    date={post.createdOn}
                    title={post.title}
                    body={post.body}
                    likeCount={post.points}
                    commentCount={post.comments.length}
                  />
                )) ||
                (post.postType === "video" && (
                  <VideoPostCard
                    key={id}
                    username={post.creator.username}
                    image="/D.jpg"
                    date={post.createdOn}
                    title={post.title}
                    body={post.body}
                    likeCount={post.points}
                    commentCount={post.comments.length}
                    viewCount={post.views}
                  />
                )) ||
                (post.postType === "image" && (
                  <ImagePostCard
                    key={id}
                    username={post.creator.username}
                    image="/D.jpg"
                    date={post.createdOn}
                    title={post.title}
                    body={post.body}
                    likeCount={post.points}
                    commentCount={post.comments.length}
                  />
                ))
          )
        )}
      </ForumPage>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (_ctx) => {
    const { data } = await client.query<GetLatestPostsQueryResult>({
      query: GetLatestPostsDocument,
      // variables: {
      //   token: token,
      // },
    });
    // console.log(data)
    return {
      props: {data},
    };
  }
);

export default Forum;

import React from "react";
import Dashboard from "../components/Dashboard";
import { ForumContainer } from "../components/Dashboard/Forum/forum.styles";
import ImagePostCard from "../components/Dashboard/Forum/ImagePostCard";
import TextPostCard from "../components/Dashboard/Forum/TextPostCard";
import VideoPostCard from "../components/Dashboard/Forum/VideoPostCard";
import MiddleSection from "../components/Dashboard/MiddleSection";
import { GetLatestPostsDocument, GetLatestPostsQueryResult, useCategoryQuery, useGetLatestPostsQuery } from "generated/graphql";
import { useAppDispatch } from "app/hooks";
import { setCategory } from "features/ui/reducers";
import { ErrorMsg } from "components/Input";
import { requireAuthentication } from "lib/requireAuthentication";
import { GetServerSideProps } from "next";
import { client } from "./_app";


function Forum(props: any) {

  // const dispatch = useAppDispatch();

  // const { data } = useCategoryQuery();
  // dispatch(setCategory(data?.getAllCategories));
  
  const postData = props.data.getLatestPosts.posts;
  // console.log(postData);
  // const { data, loading, error } = useGetLatestPostsQuery();
  // console.log(data);
  // if (!data || loading) {
  //   return <div>loading...</div>;
  // }

  // if (error) return <ErrorMsg>{error}</ErrorMsg>;
  // console.log(data);
  // const me = data?.me as User;
  return (
    <Dashboard>
      <MiddleSection>
        {!postData ? (
          <div>loading...</div>
        ) : (
          postData.map((post: any) =>
            !post
              ? null
              : (post.postType === "text" && (
                  <ForumContainer>
                    <TextPostCard
                      username={post.creator.username}
                      image="/D.jpg"
                      date={post.createdOn}
                      title={post.title}
                      body={post.body}
                      likeCount={post.points}
                      commentCount={post.comments.length}
                    />
                  </ForumContainer>
                )) ||
                (post.postType === "video" && (
                  <ForumContainer>
                    <VideoPostCard
                      username={post.creator.username}
                      image="/D.jpg"
                      date={post.createdOn}
                      title={post.title}
                      body={post.body}
                      likeCount={post.points}
                      commentCount={post.comments.length}
                      viewCount={post.views}
                    />
                  </ForumContainer>
                )) ||
                (post.postType === "image" && (
                  <ForumContainer>
                    <ImagePostCard
                      username={post.creator.username}
                      image="/D.jpg"
                      date={post.createdOn}
                      title={post.title}
                      body={post.body}
                      likeCount={post.points}
                      commentCount={post.comments.length}
                    />
                  </ForumContainer>
                ))
          )
        )}
      </MiddleSection>
    </Dashboard>
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
    console.log(data)
    return {
      props: {data},
    };
  }
);

export default Forum;

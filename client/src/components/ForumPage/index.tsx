import React from 'react'
import TopBar from "../Dashboard/TopBar";
import LeftSideBar from "../Dashboard/LeftSideBar";
import SmallFooter from "../Dashboard/SmallFooter";
import Share from "../Dashboard/Share"; 

import {
  PageContainer,
  InnerContainer,
  PageRightSide,
  PageHeading,
} from "../../styles/common.styles";
import ImagePostCard from 'components/Dashboard/Forum/ImagePostCard';
import VideoPostCard from 'components/Dashboard/Forum/VideoPostCard';
import TextPostCard from 'components/Dashboard/Forum/TextPostCard';

const ForumPage = ({...props}: any) => {

  const postData = props.props
  // console.log(postData)
  return (
    <>
      <TopBar />
      <PageContainer>
        <LeftSideBar />
        <InnerContainer>
          <PageHeading>Forum</PageHeading>
          <Share />
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
                      commentCount={12}
                      postId={post.id}
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
                      commentCount={10}
                      viewCount={post.views}
                      postId={post.id}
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
                      commentCount={78}
                      postId={post.id}
                    />
                  ))
            )
          )}
        </InnerContainer>
        <PageRightSide>Live Forever Young</PageRightSide>
      </PageContainer>
      <SmallFooter />
    </>
  );
};

export default ForumPage


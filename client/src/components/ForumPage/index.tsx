import React from "react";
import TopBar from "../Dashboard/TopBar";
import LeftSideBar from "../Dashboard/LeftSideBar";
import SmallFooter from "../Dashboard/SmallFooter";
import Share from "../Dashboard/Share";
import styled from "styled-components";


import {
  PageContainer,
  InnerContainer,
  PageRightSide,
  PageHeading,
  ForumRow,
  ForumFilter,
  ForumFilterSortBy,
  SelectCategory,
  CategoryOption,
  FilterSearch,
} from "../../styles/common.styles";
import ImagePostCard from "components/Dashboard/Forum/ImagePostCard";


const ForumPage = ({ ...props }: any) => {
  const postData = props.props;
  // console.log(postData)
  return (
    <>
      <TopBar />
      <PageContainer>
        <LeftSideBar />
        <InnerContainer>
          <PageHeading>Forum</PageHeading>
          <Share />
          <ForumRow>
            <ForumFilter>
              <ForumFilterSortBy>
                <SelectCategory>
                  <CategoryOption>Category 01</CategoryOption>
                  <CategoryOption>Category 02</CategoryOption>
                  <CategoryOption>Category 03</CategoryOption>
                  <CategoryOption>Category 04</CategoryOption>
                </SelectCategory>
              </ForumFilterSortBy>
              <FilterSearch placeholder="Search"></FilterSearch>
            </ForumFilter>
            {!postData ? (
              <div>loading...</div>
            ) : (
              postData.map((post: any, id: string) =>
                !post ? null : (
                  <ForumContainer>
                    <ImagePostCard
                      key={id}
                      username={post.creator.username}
                      image="/D.jpg"
                      date={post.createdOn}
                      title={post.title}
                      body={post.category.name}
                      likeCount={post.points}
                      commentCount={12}
                      postId={post.id}
                    />
                  </ForumContainer>
                )
              )
            )}
          </ForumRow>
        </InnerContainer>
        <PageRightSide>Live Forever Young</PageRightSide>
      </PageContainer>
      <SmallFooter />
    </>
  );
};

export default ForumPage;

export const ForumContainer = styled.div`
  width: 33.33%;
  padding: 0.5rem;
  @media (max-width: 1366px) {
    width: 50%;
  }
  @media (max-width: 575px) {
    width: 100%;
  }
`;

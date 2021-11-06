import React from 'react'
import ImagePostCard from '../../Dashboard/Forum/ImagePostCard';
import TextPostCard from '../../Dashboard/Forum/TextPostCard';
import VideoPostCard from '../../Dashboard/Forum/VideoPostCard';
import LeftSideBar from '../../Dashboard/LeftSideBar';
import SmallFooter from '../../Dashboard/SmallFooter';
import Topbar from '../../Dashboard/TopBar'

import {
  CardTitle,
  DetailsCardWrapper,
  CardTop,
  CardLeftWrap,
  StartDate,
  CardCenterWrap,
  CardText,
  StartDateTitle,
  MediaContainer,
  CoursesH2,
} from "./details.styles";

import {
  PageContainer,
  InnerContainer,
  PageRightSide,
  PageHeading,
  CardBottom,
  ApplyButton,
} from "../../../styles/common.styles";

function CourseDetails() {
    return (
      <>
        <Topbar />
        <PageContainer>
          <LeftSideBar />
          <InnerContainer>
            <PageHeading>Course Title</PageHeading>
            <DetailsCardWrapper>
              <CardTop>
                <CardLeftWrap>
                  <StartDateTitle>
                    Start Date{" "}
                    <StartDate> - 21/11/2021 to 21-01-2022</StartDate>
                  </StartDateTitle>
                  <CardTitle>Course Description</CardTitle>
                </CardLeftWrap>
              </CardTop>
              <CardCenterWrap>
                <CardText>
                  What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry. Lorem Ipsum has been the
                  industrys standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make
                  a type specimen book. It has survived not only five centuries,
                  but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </CardText>
              </CardCenterWrap>
              <CardBottom>
                <ApplyButton>apply</ApplyButton>
              </CardBottom>
              <CoursesH2>Course Updates</CoursesH2>
              <MediaContainer>
                <TextPostCard
                  username="maguyva"
                  image="/D.jpg"
                  date="5 hours ago"
                  likeCount={12}
                  commentCount={2}
                  title={""}
                  body="leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing"
                />
              </MediaContainer>
              <MediaContainer>
                <VideoPostCard
                  username="hotness"
                  image="/prettygirl.jpg"
                  body="/exvid.mp4"
                  date="5 hours ago"
                  likeCount={12}
                  commentCount={2}
                  title="leap into electronic typesetting, remaining
                  essentially unchanged."
                />
              </MediaContainer>
              <MediaContainer>
                <ImagePostCard
                  username="aleah"
                  image="/Aleah.jpg"
                  body="/assets/images/forum.svg"
                  date="5 hours ago"
                  likeCount={12}
                  commentCount={2}
                  title="leap into electronic typesetting, remaining
                  essentially unchanged."
                />
              </MediaContainer>
            </DetailsCardWrapper>
          </InnerContainer>
          <PageRightSide>blow my wig</PageRightSide>
        </PageContainer>
        <SmallFooter />
      </>
    );
}

export default CourseDetails

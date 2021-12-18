import React from "react";
import LeftSideBar from "../Dashboard/LeftSideBar";
import SmallFooter from "../Dashboard/SmallFooter";
import TopBar from "../Dashboard/TopBar";
import {
  PageContainer,
  InnerContainer,
  PageHeading,
  PageSubHeading,
  PageWrapper,
  PostCard,
  CardTitle,
  CardBody,
  CardImage,
  CardDescription,
  CardBottom,
  CardStartDate,
  ApplyButton,
  CardDuration,
} from "../../styles/common.styles";

function SearchResult() {
  return (
    <>
      <PageContainer>
        <LeftSideBar />

        <InnerContainer>
          <TopBar />
          <PageHeading>Here Book Results </PageHeading>

          <PageSubHeading>Books</PageSubHeading>

          <PageWrapper>
            <PostCard>
              <CardImage alt="course image" src="/assets/images/react.svg" />
              <CardBody>
                <CardTitle>Essential TypeScript</CardTitle>
                <CardDescription>
                  Develop Future Proof responsive websites
                </CardDescription>
                <CardBottom>
                  <CardStartDate>Peter Jones</CardStartDate>
                  <ApplyButton>Buy</ApplyButton>
                </CardBottom>
              </CardBody>
            </PostCard>

            <PostCard>
              <CardImage alt="course image" src="/assets/images/react.svg" />
              <CardBody>
                <CardTitle>Essential TypeScript</CardTitle>
                <CardDescription>
                  Develop Future Proof responsive websites
                </CardDescription>
                <CardBottom>
                  <CardStartDate>Peter Jones</CardStartDate>
                  <ApplyButton>Buy</ApplyButton>
                </CardBottom>
              </CardBody>
            </PostCard>

            <PostCard>
              <CardImage alt="course image" src="/assets/images/react.svg" />
              <CardBody>
                <CardTitle>Essential TypeScript</CardTitle>
                <CardDescription>
                  Develop Future Proof responsive websites
                </CardDescription>
                <CardBottom>
                  <CardStartDate>Peter Jones</CardStartDate>
                  <ApplyButton>Buy</ApplyButton>
                </CardBottom>
              </CardBody>
            </PostCard>
          </PageWrapper>

          <PageSubHeading>Courses</PageSubHeading>

          <PageWrapper>
            <PostCard>
              <CardImage alt="course image" src="/assets/images/react.svg" />
              <CardBody>
                <CardDuration>3 Months</CardDuration>
                <CardTitle>Fullstack Javascript web Dev</CardTitle>
                <CardDescription>
                  The course includes: HTML, CSS and JavaScript and React
                  Framework.
                </CardDescription>
                <CardBottom>
                  <CardStartDate>12/11/2021</CardStartDate>
                  <ApplyButton>Apply</ApplyButton>
                </CardBottom>
              </CardBody>
            </PostCard>

            <PostCard>
              <CardImage alt="course image" src="/assets/images/react.svg" />
              <CardBody>
                <CardDuration>3 Months</CardDuration>
                <CardTitle>Fullstack Javascript web Dev</CardTitle>
                <CardDescription>
                  The course includes: HTML, CSS and JavaScript and React
                  Framework.
                </CardDescription>
                <CardBottom>
                  <CardStartDate>12/11/2021</CardStartDate>
                  <ApplyButton>Apply</ApplyButton>
                </CardBottom>
              </CardBody>
            </PostCard>

            <PostCard>
              <CardImage alt="course image" src="/assets/images/react.svg" />
              <CardBody>
                <CardDuration>3 Months</CardDuration>
                <CardTitle>Fullstack Javascript web Dev</CardTitle>
                <CardDescription>
                  The course includes: HTML, CSS and JavaScript and React
                  Framework.
                </CardDescription>
                <CardBottom>
                  <CardStartDate>12/11/2021</CardStartDate>
                  <ApplyButton>Apply</ApplyButton>
                </CardBottom>
              </CardBody>
            </PostCard>
          </PageWrapper>

          <SmallFooter />
        </InnerContainer>
        {/* <PageRightSide>Live Forever Young</PageRightSide> */}
      </PageContainer>
    </>
  );
}

export default SearchResult;

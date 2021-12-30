import React from "react";

import {
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
import Dashboard from "../Dashboard";

function SearchResult() {
  return (
    <Dashboard>
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
    </Dashboard>
  );
}

export default SearchResult;

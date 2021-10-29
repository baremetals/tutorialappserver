import React from 'react'
import LeftSideBar from '../Dashboard/LeftSideBar'
import SmallFooter from '../Dashboard/SmallFooter';
import Topbar from '../Dashboard/TopBar'
import {
  PageContainer,
  CourseContainer,
  CourseRightSide,
  CoursesH1,
  CoursesWrapper,
  CoursesCard,
  CourseTitle,
  CourseDuration,
  CourseImage,
  CourseDescription,
  CardBottom,
  CourseStartDate,
  ApplyButton,
} from "./course.styles";

function CoursesPage() {

    return (
      <>
        <Topbar />
        <PageContainer>
          <LeftSideBar />
          <CourseContainer>
            <CoursesH1>Courses</CoursesH1>
            <CoursesWrapper>
              <CoursesCard>
                <CourseTitle>
                  Fullstack Javascript web Dev
                  <CourseDuration> - 3 Months</CourseDuration>
                </CourseTitle>
                <CourseImage
                  alt="course image"
                  src="/assets/images/react.svg"
                />
                <CourseDescription>
                  The course includes: HTML, CSS and JavaScript and React
                  Framework.
                </CourseDescription>
                <CardBottom>
                  <CourseStartDate>12/11/2021</CourseStartDate>
                  <ApplyButton>apply</ApplyButton>
                </CardBottom>
              </CoursesCard>
              <CoursesCard>
                <CourseTitle>
                  Fullstack Javascript web Dev
                  <CourseDuration> - 3 Months</CourseDuration>
                </CourseTitle>
                <CourseImage
                  alt="course image"
                  src="/assets/images/react.svg"
                />
                <CourseDescription>
                  The course includes: HTML, CSS and JavaScript and React
                  Framework.
                </CourseDescription>
                <CardBottom>
                  <CourseStartDate>12/11/2021</CourseStartDate>
                  <ApplyButton>apply</ApplyButton>
                </CardBottom>
              </CoursesCard>
              <CoursesCard>
                <CourseTitle>
                  Fullstack Javascript web Dev
                  <CourseDuration> - 3 Months</CourseDuration>
                </CourseTitle>
                <CourseImage
                  alt="course image"
                  src="/assets/images/react.svg"
                />
                <CourseDescription>
                  The course includes: HTML, CSS and JavaScript and React
                  Framework.
                </CourseDescription>
                <CardBottom>
                  <CourseStartDate>12/11/2021</CourseStartDate>
                  <ApplyButton>apply</ApplyButton>
                </CardBottom>
              </CoursesCard>
              <CoursesCard>
                <CourseTitle>
                  Fullstack Javascript web Dev
                  <CourseDuration> - 3 Months</CourseDuration>
                </CourseTitle>
                <CourseImage
                  alt="course image"
                  src="/assets/images/react.svg"
                />
                <CourseDescription>
                  The course includes: HTML, CSS and JavaScript and React
                  Framework.
                </CourseDescription>
                <CardBottom>
                  <CourseStartDate>12/11/2021</CourseStartDate>
                  <ApplyButton>apply</ApplyButton>
                </CardBottom>
              </CoursesCard>
            </CoursesWrapper>
          </CourseContainer>
          <CourseRightSide>blow my wig</CourseRightSide>
        </PageContainer>
        <SmallFooter />
      </>
    );
}

export default CoursesPage

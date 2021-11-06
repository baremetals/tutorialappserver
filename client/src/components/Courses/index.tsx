import React from "react";
import LeftSideBar from "../Dashboard/LeftSideBar";
import SmallFooter from "../Dashboard/SmallFooter";
import Topbar from "../Dashboard/TopBar";
import { useAppSelector } from "app/hooks";
import {
  PageContainer,
  InnerContainer,
  PageRightSide,
  PageHeading,
  PageWrapper,
  PostCard,
  CardTitle,
  CardImage,
  CardDescription,
  CardDuration,
  CardBottom,
  CardStartDate,
  ApplyButton,
} from "../../styles/common.styles";
import { theCourses } from "features/courses/selectors";

// type CoursesPageType = {
//   title: string;
//   duration: string;
//   description: string;
//   image: string;
//   startDate: string;
// };

function CoursesPage() {
  const courses: any = useAppSelector(theCourses);
  // console.log(courses);
  return (
    <>
      <Topbar />
      <PageContainer>
        <LeftSideBar />
        <InnerContainer>
          <PageHeading>Courses</PageHeading>
          <PageWrapper>
            {!courses ? (
              <div>loading...</div>
            ) : (
              courses.map((course: any, id: string) =>
                !course ? null : (
                  <PostCard key={id}>
                    <CardImage alt="course image" src={course.image} />
                    <CardTitle>
                      {course.title}
                      <CardDuration> - {course.duration}</CardDuration>
                    </CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                    <CardBottom>
                      <CardStartDate>{course.startDate}</CardStartDate>
                      <ApplyButton>apply</ApplyButton>
                    </CardBottom>
                  </PostCard>
                )
              )
            )}
          </PageWrapper>
        </InnerContainer>
        <PageRightSide>blow my wig</PageRightSide>
      </PageContainer>
      <SmallFooter />
    </>
  );
}

export default CoursesPage;

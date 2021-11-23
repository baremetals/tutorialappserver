import React, { useEffect, useState } from 'react'
import ImagePostCard from '../../Dashboard/Forum/ImagePostCard';
import TextPostCard from '../../Dashboard/Forum/TextPostCard';
import VideoPostCard from '../../Dashboard/Forum/VideoPostCard';
import LeftSideBar from '../../Dashboard/LeftSideBar';
import SmallFooter from '../../Dashboard/SmallFooter';
import Topbar from '../../Dashboard/TopBar'
import { useRouter } from "next/router";
import { useJoinOrLeaveCourseMutation, User } from "generated/graphql";
import { useAppSelector } from "app/hooks";
import { isUser } from "features/auth/selectors";

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
  CoursesTeacherWrap,
  CoursesTeacherNameAndImageWrap,
  CoursesTeacherName,
  CoursesTeacherImage,
} from "./details.styles";

import {
  PageContainer,
  InnerContainer,
  PageRightSide,
  PageHeading,
  CardBottom,
  ApplyButton,
} from "../../../styles/common.styles";
import { ErrorMsg } from 'components/Input';

interface Details {
  description: string;
  duration: string;
  endDate: string;
  startDate: string;
  title: string;
  students: Array<Student>;
  teacher: User;
}

interface Student {
  id: string;
  username: string;
  user: User
  
}

function CourseDetails(props: { props: { data: any; loading: any; }; }, userId: any) {
  const router = useRouter();
  const { id } = router.query;

  const [join] = useJoinOrLeaveCourseMutation();
  const [errorMsg, setErrorMsg] = useState(false);
  const [message, setMessage] = useState<string | undefined>("");
  const [isStudent, setIsStudent] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const { user: user } = useAppSelector(isUser);
  const me = user;

  const { data, loading } = props.props
  
  const { description, endDate, startDate, title, students, teacher } =
    data.getCourseById as Details;

  useEffect(() => {
    if (students.length !== 0) {
      students.forEach((student) => {
        if (student.user?.id === me?.id) {
          setIsStudent(true);
        }
      });
    }
  }, [me?.id]);

  useEffect(() => {
    if (teacher.id === me?.id) {
      setIsTeacher(true);
    }
  }, [me?.id]);

  if (!data || loading) {
    return <div>loading...</div>;
  }

  const joinCourse = async () => {
    console.log("testing", isStudent);

    try {
      const response = await join({
        variables: {
          courseId: id as string,
          join: isStudent ? false : true,
        },
      });
      console.log("re-testing", isStudent);
      const msg = response.data?.joinOrLeaveCourse;
      setMessage(msg);
      setErrorMsg(true);
      console.log(response.data?.joinOrLeaveCourse);
    } catch (err) {
      console.log("error:", err);
    }
  };

  return (
    <>
      <Topbar />
      <PageContainer>
        <LeftSideBar />
        <InnerContainer>
          <div>
            <PageHeading>{title}</PageHeading>
          </div>
          <DetailsCardWrapper>
            <CardTop>
              <CardLeftWrap>
                <StartDateTitle>
                  Start Date{" "}
                  <StartDate>
                    {" "}
                    - {startDate} to {endDate}
                  </StartDate>
                </StartDateTitle>
                <CardTitle>Course Description</CardTitle>
              </CardLeftWrap>
            </CardTop>
            <CardCenterWrap>
              <CardText>{description}</CardText>
            </CardCenterWrap>
            <CardBottom>
              {!isTeacher && (
                <>
                  {isStudent ? (
                    <ApplyButton
                      onClick={joinCourse}
                      style={{ backgroundColor: "red" }}
                      type="button"
                      // disabled={true}
                    >
                      applied
                    </ApplyButton>
                  ) : (
                    <ApplyButton onClick={joinCourse} type="button">
                      apply
                    </ApplyButton>
                  )}
                  {errorMsg && <ErrorMsg>{message}</ErrorMsg>}
                </>
              )}
            </CardBottom>
            <CoursesTeacherWrap>
              <CardTitle>Teacher</CardTitle>
              <CoursesTeacherNameAndImageWrap>
                <CoursesTeacherImage src="/Aleah.jpg" />
                <CoursesTeacherName>Beth Summertime</CoursesTeacherName>
              </CoursesTeacherNameAndImageWrap>
            </CoursesTeacherWrap>
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
                postId="1"
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

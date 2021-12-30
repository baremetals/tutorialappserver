import React, { useEffect, useState } from 'react'
import Card from '../../ForumPage/Card';

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
  MediaRow,
} from "./details.styles";

import {
  PageHeading,
  CardBottom,
  ApplyButton,
  SocialDropDown,
  SocialDropDownList,
  SocialDropDownItem,
} from "../../../styles/common.styles";

import { SocialDropDownIcon } from "../../../../public/assets/icons/SocialDropDownIcon";
import { FaceBook } from "../../../../public/assets/icons/FaceBook";
import { Twitter } from "../../../../public/assets/icons/Twitter";
import { LinkedIn } from "../../../../public/assets/icons/LinkedIn";
import { WhatsApp } from "../../../../public/assets/icons/WhatsApp";
import { Email } from "../../../../public/assets/icons/Email";

import { ErrorMsg } from 'components/Input';
import Dashboard from 'components/Dashboard';


import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";

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
  // console.log(router)

  const [socialDropdown, setSocialDropdown] = useState(false);
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
  }, [students, me?.id]);

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

  const url: string = `http://localhost:3000${router.asPath}`
  return (
    <Dashboard>
      <PageHeading>
        <SocialDropDown>
          <span onClick={() => setSocialDropdown(!socialDropdown)}>
            <SocialDropDownIcon />
            Share
          </span>
          <SocialDropDownList
            className={`${socialDropdown ? "opened" : ""}`}
            onClick={() => setSocialDropdown(!socialDropdown)}
          >
            <SocialDropDownItem>
              <FacebookShareButton url={url}>
                <FaceBook />
                Facebook
              </FacebookShareButton>
            </SocialDropDownItem>
            <SocialDropDownItem>
              <TwitterShareButton url={url}>
                <Twitter />
                Twitter
              </TwitterShareButton>
            </SocialDropDownItem>
            <SocialDropDownItem>
              <LinkedinShareButton url={url}>
                <LinkedIn />
                LinkedIn
              </LinkedinShareButton>
            </SocialDropDownItem>
            <SocialDropDownItem>
              <WhatsappShareButton url={url}>
                <WhatsApp />
                Whatsapp
              </WhatsappShareButton>
            </SocialDropDownItem>
            <SocialDropDownItem>
              <EmailShareButton url={url}>
                <Email />
                Email
              </EmailShareButton>
            </SocialDropDownItem>
          </SocialDropDownList>
        </SocialDropDown>
        {title}
      </PageHeading>
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
        <MediaRow>
          <MediaContainer>
            <Card
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
        </MediaRow>
      </DetailsCardWrapper>
    </Dashboard>
  );
}

export default CourseDetails

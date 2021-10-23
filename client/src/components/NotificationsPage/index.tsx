import React from "react";
import PageContainer, {
  MiddleContainer,
  RightSideContainer,
} from "../Containers/PageContainer";
import LeftSideBar from "../Dashboard/LeftSideBar";
import SmallFooter from "../Dashboard/SmallFooter";
import TopBar from "../Dashboard/TopBar";
import {
  NoticesH1,
  NoticesWrapper,
  NoticeLeftWrap,
  SenderProfileImge,
  NoticeMessage,
  NoticeDate,
  NoticeTopRightWrap,
  DeleteIcon,
} from "./notice.styles";

function NotificationsPage() {
  return (
    <>
      <TopBar />
      <PageContainer>
        <LeftSideBar />
        <MiddleContainer>
          <NoticesH1>Notifications</NoticesH1>
          <NoticesWrapper>
            <NoticeLeftWrap>
              <SenderProfileImge alt="sender profile image" src="/Aleah.jpg" />
              <NoticeMessage>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </NoticeMessage>
              <NoticeDate>10 hours ago</NoticeDate>
            </NoticeLeftWrap>
            <NoticeTopRightWrap>
              <DeleteIcon />
            </NoticeTopRightWrap>
          </NoticesWrapper>
          <NoticesWrapper>
            <NoticeLeftWrap>
              <SenderProfileImge alt="sender profile image" src="/D.jpg" />
              <NoticeMessage>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </NoticeMessage>
              <NoticeDate>10 hours ago</NoticeDate>
            </NoticeLeftWrap>
            <NoticeTopRightWrap>
              <DeleteIcon />
            </NoticeTopRightWrap>
          </NoticesWrapper>
          <NoticesWrapper>
            <NoticeLeftWrap>
              <SenderProfileImge alt="sender profile image" src="/prettygirl.jpg" />
              <NoticeMessage>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </NoticeMessage>
              <NoticeDate>10 hours ago</NoticeDate>
            </NoticeLeftWrap>
            <NoticeTopRightWrap>
              <DeleteIcon />
            </NoticeTopRightWrap>
          </NoticesWrapper>
          
        </MiddleContainer>
        <RightSideContainer>Live forever young!</RightSideContainer>
      </PageContainer>
      <SmallFooter />
    </>
  );
}

export default NotificationsPage;

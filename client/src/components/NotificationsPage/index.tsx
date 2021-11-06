import React from "react";
import LeftSideBar from "../Dashboard/LeftSideBar";
import SmallFooter from "../Dashboard/SmallFooter";
import TopBar from "../Dashboard/TopBar";
import {
  NoticesWrapper,
  NoticeLeftWrap,
  SenderProfileImge,
  NoticeMessage,
  NoticeDate,
  NoticeTopRightWrap,
  DeleteIcon,
} from "./notice.styles";
import {
  PageContainer,
  InnerContainer,
  PageRightSide,
  PageHeading,
} from "../../styles/common.styles";


type NotificationsPageType = {
  image: string;
  body: string;
  createdOn: string;
};
function NotificationsPage({ ...props }: NotificationsPageType) {
  return (
    <>
      <TopBar />
      <PageContainer>
        <LeftSideBar />
        <InnerContainer>
          <PageHeading>Notifications</PageHeading>
          <NoticesWrapper>
            <NoticeLeftWrap>
              <SenderProfileImge alt="sender profile image" src={props.image} />
              <NoticeMessage>
                {props.body}
              </NoticeMessage>
              <NoticeDate>{props.createdOn}</NoticeDate>
            </NoticeLeftWrap>
            <NoticeTopRightWrap>
              <DeleteIcon />
            </NoticeTopRightWrap>
          </NoticesWrapper>         
        </InnerContainer>
        <PageRightSide>Live forever young!</PageRightSide>
      </PageContainer>
      <SmallFooter />
    </>
  );
}

export default NotificationsPage;

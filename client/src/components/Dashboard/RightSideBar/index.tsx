import React from "react";
import OnlineUsers from "../Forum/OnlineUsers";
import {
  RightSideContainer,
  RightSideWrapper,
  ImageWrapper,
  Image,
  ImageText,
  RightSideAdvert,
  RightSideTitle,
  UsersLists,
} from "./rightside.styles";

const RightSideBar = () => {
  return (
    <RightSideContainer>
      <RightSideWrapper>
        <ImageWrapper>
          <Image alt="" src="/assets/images/react.svg" />
          <ImageText>
            something happened to me the other day, madness bro!
          </ImageText>
        </ImageWrapper>
        <RightSideAdvert alt="" src="/assets/images/react.svg" />
        <RightSideTitle>Online Users</RightSideTitle>
        <UsersLists>
          <OnlineUsers />
        </UsersLists>
        <RightSideAdvert alt="" src="/assets/images/Terms.svg" />
      </RightSideWrapper>
    </RightSideContainer>
  );
};

export default RightSideBar;

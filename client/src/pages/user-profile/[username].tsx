import React from "react";
import LeftSideBar from "../../components/Dashboard/LeftSideBar";
import SmallFooter from "../../components/Dashboard/SmallFooter";
import TopBar from "../../components/Dashboard/TopBar";
import {
  ProfileContainer,
  ProfileRightWrap,
  ProfileRightTopWrap,
  ProfileCover,
  ProfileCoverImage,
  UserProfileImage,
  ProfileInfo,
  UserName,
  UserDescription,
  ProfileRightBottomWrap,
} from "../../components/Profile/profile.styles";
import ProfileRightBar from "../../components/Profile/ProfileRightBar";
import UserFeed from "../../components/Profile/UserFeed";

const UserProfile = () => {
  return (
    <>
      <TopBar />
      <ProfileContainer>
        <LeftSideBar />
        <ProfileRightWrap>
          <ProfileRightTopWrap>
            <ProfileCover>
              <ProfileCoverImage
                alt="user profile cover image"
                src="/red.jpg"
              />
              <UserProfileImage alt="user profile image" src="/D.jpg" />
            </ProfileCover>
            <ProfileInfo>
              <UserName>Frank White</UserName>
              <UserDescription>Badboy for Life!</UserDescription>
            </ProfileInfo>
          </ProfileRightTopWrap>
          <ProfileRightBottomWrap>
            <UserFeed />
            <ProfileRightBar />
          </ProfileRightBottomWrap>
        </ProfileRightWrap>
      </ProfileContainer>
      {/* <MiddleSection>
          <ForumContainer>
            <ImagePostCard
              username="maguyva"
              image="/D.jpg"
              date="5 min ago"
              content="tweet tweet tweet"
              postMedia="/isak.jpg"
              likeCount={10}
              commentCount={8}
            />
          </ForumContainer>
        </MiddleSection> */}
      <SmallFooter />
    </>
  );
};

export default UserProfile;

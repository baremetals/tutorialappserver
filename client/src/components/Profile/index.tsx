import React from 'react'
import LeftSideBar from "components/Dashboard/LeftSideBar";
import SmallFooter from "components/Dashboard/SmallFooter";
import TopBar from "components/Dashboard/TopBar";
import {
  ProfileRightWrap,
  ProfileRightTopWrap,
  ProfileRightBottomWrap,
} from "components/Profile/profile.styles";
import {
  PageContainer,
  InnerContainer,
  PageRightSide,
} from "../../styles/common.styles";
import ProfileRightBar from "components/Profile/ProfileRightBar";
import UserFeed from "components/Profile/UserFeed";
import ProfileHeader from './ProfileHeader';

const Profile = () => {
    
    return (
      <>
        <TopBar />
        <PageContainer>
          <LeftSideBar />
          <InnerContainer>
            <ProfileRightWrap>
              <ProfileRightTopWrap>
                <ProfileHeader />
              </ProfileRightTopWrap>
              <ProfileRightBottomWrap>
                <UserFeed />
              </ProfileRightBottomWrap>
            </ProfileRightWrap>
          </InnerContainer>
          <PageRightSide>
            live fast
            <ProfileRightBar />
          </PageRightSide>
        </PageContainer>

        <SmallFooter />
      </>
    );
}

export default Profile

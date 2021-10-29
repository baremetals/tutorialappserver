import React from 'react'
import LeftSideBar from "components/Dashboard/LeftSideBar";
import SmallFooter from "components/Dashboard/SmallFooter";
import TopBar from "components/Dashboard/TopBar";
import {
  ProfileContainer,
  ProfileRightWrap,
  ProfileRightTopWrap,
  ProfileRightBottomWrap,
} from "components/Profile/profile.styles";
import ProfileRightBar from "components/Profile/ProfileRightBar";
import UserFeed from "components/Profile/UserFeed";
import ProfileHeader from './ProfileHeader';

const Profile = () => {
    
    return (
      <>
        <TopBar />
        <ProfileContainer>
          <LeftSideBar />
          <ProfileRightWrap>
            <ProfileRightTopWrap>
                <ProfileHeader />
            </ProfileRightTopWrap>
            <ProfileRightBottomWrap>
              <UserFeed />
              <ProfileRightBar />
            </ProfileRightBottomWrap>
          </ProfileRightWrap>
        </ProfileContainer>

        <SmallFooter />
      </>
    );
}

export default Profile

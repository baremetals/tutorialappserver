import React from 'react'
import { ProfileCover, ProfileCoverImage, ProfileInfo, UserDescription, UserName, UserProfileImage } from './profile.styles';
import { useAppSelector } from "app/hooks";
import { isUser } from "features/auth/selectors";

const ProfileHeader = () => {
    const { user: user } = useAppSelector(isUser);
    return (
      <>
        <ProfileCover>
          <ProfileCoverImage
            alt="user profile cover image"
            src={user?.backgroundImg}
          />
          <UserProfileImage alt="user profile image" src={user?.profileImage} />
        </ProfileCover>
        <ProfileInfo>
          <UserName>{user?.fullName}</UserName>
          <UserDescription>Badboy for Life!</UserDescription>
        </ProfileInfo>
      </>
    );
}

export default ProfileHeader

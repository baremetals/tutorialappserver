import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import { useAppSelector } from "app/hooks";
import { isUser } from "features/auth/selectors";
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
import { client } from 'lib/initApollo';
import { GetUserBySlugIdDocument, GetUserBySlugIdQueryResult } from 'generated/graphql';

const Profile = () => {
  const router = useRouter();
  const { user: user } = useAppSelector(isUser);
  const { userIdSlug } = router.query;

  const [userInfo, setUserInfo] = useState({
    profileImage: "",
    backgroundImg: "",
    fullName: "",
    description: ""
  });


  const getUserDetails = async () => {
    const { data } = await client.query<GetUserBySlugIdQueryResult>({
      query: GetUserBySlugIdDocument,
      variables: {
        userIdSlug,
      },
    });
    if (data.getUserBySlugId) setUserInfo(data.getUserBySlugId);
    // console.log(userInfo);
  };

  useEffect(() => {
    let mounted = true;

    if (user?.userIdSlug !== userIdSlug) {
      if (mounted) {
        getUserDetails();
      }
    }
    return () => {
      mounted = false;
    };
  }, [user, userIdSlug]);



  return (
    <>
      <TopBar />
      <PageContainer>
        <LeftSideBar />
        <InnerContainer>
          <ProfileRightWrap>
            <ProfileRightTopWrap>
              <ProfileHeader {...userInfo} />
            </ProfileRightTopWrap>
            <ProfileRightBottomWrap>
              <UserFeed
                backgroundImg={userInfo.backgroundImg}
                profileImage={userInfo.profileImage}
                fullName={userInfo.fullName}
                description={userInfo.description}
              />
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

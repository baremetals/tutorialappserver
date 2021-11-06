import React, { useEffect, useState } from 'react'
import Link from "next/link";

// for data fetching
// import { useMeQuery } from "generated/graphql";
// import { useAppDispatch} from "app/hooks";
// import { setUser } from "features/auth/reducers";

// styled components
import {
  TopbarContainer,
  TopLeftWrap,
  TopBarLogo,
  TopCenterWrap,
  SearchBar,
  SearchIcon,
  SearchInput,
  TopRightWrap,
  Icons,
  IconItem,
  IconBadge,
  ProfileImg,
  ProfileSetting,
  ProfileDropdown,
  ProfileItem,
} from "./topbar.styles";

import { BsFillChatSquareFill } from "react-icons/bs";
import { RiNotification2Fill, RiHome4Fill } from "react-icons/ri";
import { Logo } from "../../../../public/assets/images/Logo";
// import { ErrorMsg } from 'components/Input';
import { useAppSelector } from "app/hooks";
import { isUser } from "features/auth/selectors";


const Topbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const { user: user } = useAppSelector(isUser);
  // const dispatch = useAppDispatch();
  // const { data, loading, error } = useMeQuery();
  // if (!data || loading) {
  //   return <div>loading...</div>;
  // }
  // if (error) return <ErrorMsg>{error}</ErrorMsg>;

  const me = user;
  // dispatch(setUser(me));


    return (
      <TopbarContainer>
        <TopLeftWrap>
          <TopBarLogo>
            <Link href={`/courses`}>
              <TopBarLogo>
                <Logo color="white" width="50" height="50" />
              </TopBarLogo>
            </Link>
          </TopBarLogo>
        </TopLeftWrap>
        <TopCenterWrap>
          <SearchBar>
            <SearchIcon></SearchIcon>
            <SearchInput placeholder="Search for friend, post or video" />
          </SearchBar>
        </TopCenterWrap>
        <TopRightWrap>
          <Icons>
            <IconItem>
              <Link
                href={`/user-profile/${me?.username}`}>
                <div>
                  <RiHome4Fill />
                </div>
              </Link>
            </IconItem>
            <IconItem>
              <BsFillChatSquareFill />
              <IconBadge>3</IconBadge>
            </IconItem>
            <IconItem>
              <RiNotification2Fill />
              <IconBadge>5</IconBadge>
            </IconItem>
          </Icons>
          <ProfileSetting>
            <ProfileImg
              onClick={() => setDropdown(!dropdown)}
              alt="user profile image"
              src={me?.profileImage}
            />
            <ProfileDropdown
              className={`${dropdown ? "opened" : ""}`}
              onClick={() => setDropdown(!dropdown)}
            >
              <ProfileItem>
                <Link href={`/user-profile/${me?.username}`}>Setting</Link>
              </ProfileItem>
              <ProfileItem>
                <Link href={`/user-profile/${me?.username}`}>Profile</Link>
              </ProfileItem>
              <ProfileItem>
                <Link href={`/user-profile/${me?.username}`}>Edit</Link>
              </ProfileItem>
              <ProfileItem>
                <Link href={`/user-profile/${me?.username}`}>Logout</Link>
              </ProfileItem>
            </ProfileDropdown>
          </ProfileSetting>
        </TopRightWrap>
      </TopbarContainer>
    );
}

export default Topbar;

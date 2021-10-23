import React from 'react'
import Link from "next/link";

// for data fetching
import { ErrorMsg } from "components/Input";
import { useMeQuery } from "generated/graphql";
import { useAppDispatch } from "app/hooks";
import { setUser } from "features/auth/reducers";

import {
  TopbarContainer,
  TopLeftWrap,
  TopBarLogo,
  TopCenterWrap,
  SearchBar,
  SearchIcon,
  SearchInput,
  TopRightWrap,
  NavLinks,
  TopBarNavLinks,
  Icons,
  IconItem,
  IconBadge,
  ProfileImg,
} from "./topbar.styles";

import { BsFillChatSquareFill } from "react-icons/bs";
import { RiNotification2Fill, RiHome4Fill } from "react-icons/ri";
import { Logo } from "../../../../public/assets/images/Logo";


const Topbar = () => {
  const dispatch = useAppDispatch();

  const { data, loading, error } = useMeQuery();
  if (!data || loading) {
    return <div>loading...</div>;
  }
  if (error) return <ErrorMsg>{error}</ErrorMsg>;
  dispatch(setUser(data.me));
  const me: any = data.me as {};

    return (
      <TopbarContainer>
        <TopLeftWrap>
          <TopBarLogo>
            <Link href={`/user-profile/`}>
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
          <TopBarNavLinks>
            <NavLinks>
              <Link href={`/user-profile/${me.username}`}>Home</Link>
            </NavLinks>
            <NavLinks>Timeline</NavLinks>
          </TopBarNavLinks>
          <Icons>
            <IconItem>
              <Link href={`/user-profile/${me.username}`}>
                <RiHome4Fill />
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
          <ProfileImg alt="user profile image" src={me.profileImage} />
        </TopRightWrap>
      </TopbarContainer>
    );
}

export default Topbar;

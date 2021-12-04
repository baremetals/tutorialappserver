import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { useRouter } from "next/router";
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
import {
  GetUnReadMessagesByUserIdDocument,
  useLogoutMutation,
  useNewMessageSubscription,
  GetAllUnReadChatMsgsByUserIdDocument,
  useNewChatMessageSubscription,
  User,
} from "generated/graphql";
import { useQuery } from '@apollo/client';

type NotificationsPageType = {
  image: string;
  body: string;
  createdOn: string;
  id: string;
};

type MessagePageType = {
  body: string;
  createdBy: string;
  id: string;
  createdOn: string;
  isRead: boolean;
  receiver: User;
  sender: User;
};

const Topbar = () => {
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const [dropdown, setDropdown] = useState(false);
  const { user: user } = useAppSelector(isUser);

  // Notifications Call
  const { ...result } = useQuery(GetUnReadMessagesByUserIdDocument);
  const notices = result.data?.getUnReadMessagesByUserId.msgs;
  const { data } = useNewMessageSubscription();
  const newNotice = data?.newMessage;
  const [noticeArray, setNoticeArray] = useState([]);

  // Chat Messages Call
  const rs = useQuery(GetAllUnReadChatMsgsByUserIdDocument);
  const dta = useNewChatMessageSubscription();
  const newChatMessage = dta?.data?.newChatMessage;
  const messages = rs.data?.getAllUnReadChatMsgsByUserId.chatMsgs;

  const [msgArray, setMsgArray] = useState([]);

  // console.log(dta);

  // Notifications Call
  useEffect(() => {
    if (newNotice) {
      const newMessageItem: NotificationsPageType = newNotice;
      const newArrayItem: any = (prevArray: NotificationsPageType[]) => {
        return [newMessageItem, ...prevArray];
      };
      setNoticeArray(newArrayItem);
    }
  }, [newNotice]);

  // Chat Messages Call

  useEffect(() => {
    if (newChatMessage) {
      const newChatMessageItem = newChatMessage;
      const newArrayItem: any = (prevArray: MessagePageType[]) => {
        return [...prevArray, newChatMessageItem];
      };
      setMsgArray(newArrayItem);
    }
  }, [newChatMessage]);

  const noticeLength: number = noticeArray.concat(notices).length;
  const chatMsgLength: number = msgArray.concat(messages).length;

  // console.log(notices.length)
  // const dispatch = useAppDispatch();
  // const { data, loading, error } = useMeQuery();
  // if (!data || loading) {
  //   return <div>loading...</div>;
  // }
  // if (error) return <ErrorMsg>{error}</ErrorMsg>;
  const me = user;
  // dispatch(setUser(me));
  const handleLogOut = async () => {
    try {
      const { data } = await logout({
        variables: {
          username: me?.username as string,
        },
      });
      if (data?.logout.includes("User logged off.")) {
        router.push("/signin");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

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
            <Link href={`/user-profile/${me?.username}`}>
              <div>
                <RiHome4Fill />
              </div>
            </Link>
          </IconItem>
          <IconItem>
            <BsFillChatSquareFill />
            {chatMsgLength !== 0 && <IconBadge>{chatMsgLength}</IconBadge>}
          </IconItem>
          <IconItem>
            <Link href="/notifications">
              <div>
                <RiNotification2Fill />
              </div>
            </Link>
            {noticeLength !== 0 && <IconBadge>{noticeLength}</IconBadge>}
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
              <Link href={`/user-profile/${me?.username}/edit-profile`}>
                Edit
              </Link>
            </ProfileItem>
            <ProfileItem>
              <a onClick={handleLogOut}>Logout</a>
            </ProfileItem>
          </ProfileDropdown>
        </ProfileSetting>
      </TopRightWrap>
    </TopbarContainer>
  );
};

export default Topbar;

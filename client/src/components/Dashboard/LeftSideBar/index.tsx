import React, { useState } from "react";
import Link from "next/link";
import { MdSchool } from "react-icons/md";
import { BsFillChatSquareFill } from "react-icons/bs";
import { MdPermMedia } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { MdForum } from "react-icons/md";
import { RiNotification2Fill } from "react-icons/ri";

import {
  LeftSideContainer,
  LeftSideBarWrapper,
  LeftSideBarListItem,
  LeftSideBarIcon,
  LeftSideBarListItemText,
  IconBadge,
  ToggleButton,
  BackOverlay,
} from "./leftside.styles";

const LeftSideBar = () => {
  const [menuState, setMenuState] = useState(false);
  {
    menuState && (
      <BackOverlay onClick={() => setMenuState(false)} className="" />
    );
  }
  return (
    <>
      <ToggleButton onClick={() => setMenuState(true)} className="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </ToggleButton>
      <LeftSideContainer className={menuState ? "open" : ""}>
        <LeftSideBarWrapper>
          <LeftSideBarListItem>
            <LeftSideBarIcon>
              <Link href="/courses">
                <MdSchool />
              </Link>
            </LeftSideBarIcon>
            <LeftSideBarListItemText>Courses</LeftSideBarListItemText>
          </LeftSideBarListItem>
          <LeftSideBarListItem>
            <LeftSideBarIcon>
              <Link href="/books">
                <MdLibraryBooks />
              </Link>
            </LeftSideBarIcon>
            <LeftSideBarListItemText>Books</LeftSideBarListItemText>
          </LeftSideBarListItem>
          <LeftSideBarListItem>
            <LeftSideBarIcon>
              <Link href="/recommendation">
                <MdPermMedia />
              </Link>
            </LeftSideBarIcon>
            <LeftSideBarListItemText>Recommendations</LeftSideBarListItemText>
          </LeftSideBarListItem>
          <LeftSideBarListItem>
            <LeftSideBarIcon>
              <IconBadge></IconBadge>
              <Link href="/messages/maguyva">
                <BsFillChatSquareFill />
              </Link>
            </LeftSideBarIcon>
            <LeftSideBarListItemText>Chat</LeftSideBarListItemText>
          </LeftSideBarListItem>
          <LeftSideBarListItem>
            <LeftSideBarIcon>
              <Link href="/forum">
                <MdForum />
              </Link>
            </LeftSideBarIcon>
            <LeftSideBarListItemText>Forum</LeftSideBarListItemText>
          </LeftSideBarListItem>
          <LeftSideBarListItem>
            <LeftSideBarIcon>
              <IconBadge>2</IconBadge>
              <Link href="/notifications">
                <RiNotification2Fill />
              </Link>
            </LeftSideBarIcon>
            <LeftSideBarListItemText>Notifications</LeftSideBarListItemText>
          </LeftSideBarListItem>
          <LeftSideBarListItem>
            <LeftSideBarIcon>
              <Link href="/support">
                <FaRegQuestionCircle />
              </Link>
            </LeftSideBarIcon>
            <LeftSideBarListItemText>Support</LeftSideBarListItemText>
          </LeftSideBarListItem>
          <LeftSideBarListItem>
            <LeftSideBarIcon>
              <Link href="/admin">
                <RiAdminFill />
              </Link>
            </LeftSideBarIcon>
            <LeftSideBarListItemText>Admin</LeftSideBarListItemText>
          </LeftSideBarListItem>
        </LeftSideBarWrapper>
      </LeftSideContainer>
    </>
  );
};

export default LeftSideBar;

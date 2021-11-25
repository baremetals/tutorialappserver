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
      {menuState && (
        <BackOverlay onClick={() => setMenuState(false)} className="" />
      )}
      <LeftSideContainer className={menuState ? "open" : ""}>
        <LeftSideBarWrapper>
          <LeftSideBarListItem>
            <LeftSideBarIcon>
              <Link href="/courses">
                <div>
                  <MdSchool />
                </div>
              </Link>
            </LeftSideBarIcon>
            <Link href="/courses">
              <LeftSideBarListItemText>Courses</LeftSideBarListItemText>
            </Link>
          </LeftSideBarListItem>
          <LeftSideBarListItem>
            <LeftSideBarIcon>
              <Link href="/books">
                <div>
                  <MdLibraryBooks />
                </div>
              </Link>
            </LeftSideBarIcon>
            <Link href="/books">
              <LeftSideBarListItemText>Books</LeftSideBarListItemText>
            </Link>
          </LeftSideBarListItem>
          <LeftSideBarListItem>
            <LeftSideBarIcon>
              <Link href="/recommendation">
                <div>
                  <MdPermMedia />
                </div>
              </Link>
            </LeftSideBarIcon>
            <Link href="/recommendation">
              <LeftSideBarListItemText>Recommendations</LeftSideBarListItemText>
            </Link>
          </LeftSideBarListItem>
          <LeftSideBarListItem>
            <LeftSideBarIcon>
              <IconBadge></IconBadge>
              <Link href="/messages/maguyva">
                <div>
                  <BsFillChatSquareFill />
                </div>
              </Link>
            </LeftSideBarIcon>
            <Link href="/messages/maguyva">
              <LeftSideBarListItemText>Chat</LeftSideBarListItemText>
            </Link>
          </LeftSideBarListItem>
          <LeftSideBarListItem>
            <LeftSideBarIcon>
              <Link href="/forum">
                <div>
                  <MdForum />
                </div>
              </Link>
            </LeftSideBarIcon>
            <Link href="/forum">
              <LeftSideBarListItemText>Forum</LeftSideBarListItemText>
            </Link>
          </LeftSideBarListItem>
          <LeftSideBarListItem>
            <LeftSideBarIcon>
              <IconBadge>2</IconBadge>
              <Link href="/notifications">
                <div>
                  <RiNotification2Fill />
                </div>
              </Link>
            </LeftSideBarIcon>
            <Link href="/notifications">
              <LeftSideBarListItemText>Notifications</LeftSideBarListItemText>
            </Link>
          </LeftSideBarListItem>
          <LeftSideBarListItem>
            <LeftSideBarIcon>
              <Link href="/support">
                <div>
                  <FaRegQuestionCircle />
                </div>
              </Link>
            </LeftSideBarIcon>
            <Link href="/support">
              <LeftSideBarListItemText>Support</LeftSideBarListItemText>
            </Link>
          </LeftSideBarListItem>
          <LeftSideBarListItem>
            <LeftSideBarIcon>
              <Link href="/admin">
                <div>
                  <RiAdminFill />
                </div>
              </Link>
            </LeftSideBarIcon>
            <Link href="/admin">
              <LeftSideBarListItemText>Admin</LeftSideBarListItemText>
            </Link>
          </LeftSideBarListItem>
        </LeftSideBarWrapper>
      </LeftSideContainer>
    </>
  );
};

export default LeftSideBar;

import React, { useState } from "react";
import Link from "next/link";

import {
  PostTop,
  PostLeftWrap,
  PostProfileImge,
  UserName,
  PostDate,
  PostTopRightWrap,
  PostCenterWrap,
  PostText,
  PostBottomWrapper,
  BottomLeftWrap,
  // LikeIcon,
  // LikeCounter,
  BottomRightWrap,
  ForumWrapper,
  PostDropdown,
  LikeGroup,
  ViewMore,
  PostTitle,
  // DropAndCenterWrap,
  ViewIcon,
  ViewCounter,
} from "./forum.styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import Dropdown from "../Dropdown"
import { DropDownIcon } from "../../../public/assets/icons/DropDownIcon";

interface ForumPost {
  slug: string;
  username: string;
  userIdSlug: string;
  image: string;
  date: any;
  title: string;
  body?: string;
  likeCount: number;
  commentCount: number;
}


const ImagePostCard = ({
  username,
  userIdSlug,
  image,
  date,
  title,
  body,
  likeCount = 0,
  commentCount = 0,
  slug
}: ForumPost) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <ForumWrapper>
        <PostTop>
          <PostLeftWrap>
            <Link href={`user-profile/${userIdSlug}`}>
              <PostProfileImge src={image} alt="user profile image" />
            </Link>
            <Link href={`user-profile/${userIdSlug}`}>
              <UserName>
                {username}

                <PostDate>{dayjs(date).fromNow()}</PostDate>
              </UserName>
            </Link>
          </PostLeftWrap>
          <PostTopRightWrap>
            <PostDropdown>
              <span
                className="DropDownIcon"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <DropDownIcon />
              </span>
              <Dropdown showDropdown={showDropdown} />
            </PostDropdown>
          </PostTopRightWrap>
        </PostTop>
        <PostCenterWrap>
          <PostTitle>{title}</PostTitle>
        </PostCenterWrap>
        <PostCenterWrap>
          <PostText>{body}</PostText>
        </PostCenterWrap>
        <PostBottomWrapper>
          <BottomLeftWrap>
            <LikeGroup>
              <ViewIcon />
              <ViewCounter>2</ViewCounter>
            </LikeGroup>
          </BottomLeftWrap>
          <BottomRightWrap>
            <Link href={`/forum/${slug}`}>
              <ViewMore>View more</ViewMore>
            </Link>
          </BottomRightWrap>
        </PostBottomWrapper>
      </ForumWrapper>
    </>
  );
};

export default ImagePostCard;



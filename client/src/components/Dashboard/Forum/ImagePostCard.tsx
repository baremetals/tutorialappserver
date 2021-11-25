import React, { useState } from "react";
import Link from "next/link";
import {
  PostTop,
  PostLeftWrap,
  PostProfileImge,
  UserName,
  PostDate,
  PostTopRightWrap,
  ExpandIcon,
  PostCenterWrap,
  PostText,
  PostBottomWrapper,
  BottomLeftWrap,
  LikeIcon,
  LikeCounter,
  BottomRightWrap,
  ForumWrapper,
  PostDropdown,
  LikeGroup,
  ViewMore,
  PostTitle,
  // DropAndCenterWrap,
} from "./forum.styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import Dropdown from "../../Dropdown"

interface ForumPost {
  username: string;
  image: string;
  date: any;
  title: string;
  body?: string;
  likeCount: number;
  commentCount: number;
  postId: string;
}


const ImagePostCard = ({
  username,
  image,
  date,
  title,
  body,
  likeCount = 0,
  commentCount = 0,
  postId,
}: ForumPost) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <ForumWrapper>
        <PostTop>
          <PostLeftWrap>
            <PostProfileImge src={image} alt="user profile image" />
            <UserName>
              {username}
              <PostDate>{dayjs(date).fromNow()}</PostDate>
            </UserName>
          </PostLeftWrap>
          <PostTopRightWrap>
            <PostDropdown>
              <ExpandIcon onClick={() => setShowDropdown(!showDropdown)} />
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
              <LikeIcon />
              <LikeCounter>{likeCount} </LikeCounter>
            </LikeGroup>
          </BottomLeftWrap>
          <BottomRightWrap>
            <Link href={`/forum/${postId}`}>
              <ViewMore>View more</ViewMore>
            </Link>
          </BottomRightWrap>
        </PostBottomWrapper>
      </ForumWrapper>
    </>
  );
};

export default ImagePostCard;



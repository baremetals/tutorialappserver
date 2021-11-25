import React, { useState } from "react";

import {
  PostTop,
  PostLeftWrap,
  PostProfileImge,
  UserName,
  PostDate,
  // PostTopRightWrap,
  // ExpandIcon,
  PostCenterWrap,
  PostTitle,
  PostMediaImage,
  PostBottomWrapper,
  BottomLeftWrap,
  LikeIcon,
  LikeCounter,
  BottomRightWrap,
  CommentIcon,
  CommentText,
  // PostDropdown,
  LikeGroup,
  // DropAndCenterWrap,
} from "./forum.styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import Comment  from "../../Comments";
// import Dropdown from "../../Dropdown";

interface ForumPost {
  username: string;
  image: string;
  date: any;
  title: string;
  body?: string;
  likeCount: number;
  commentCount: number;
}

const DetailPost = ({
  username,
  image,
  date,
  title,
  body,
  likeCount = 0,
  commentCount = 0,
}: ForumPost) => {
  const [showComments, setShowComments] = useState(true);
  // const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <PostTop>
        <PostLeftWrap>
          <PostProfileImge src={image} alt="user profile image" />
          <UserName>
            {username}
            <PostDate>{dayjs(date).fromNow()}</PostDate>
          </UserName>
        </PostLeftWrap>
        {/* <PostTopRightWrap>
          <PostDropdown>
            <ExpandIcon onClick={() => setShowDropdown(!showDropdown)} />
            <Dropdown showDropdown={showDropdown} />
          </PostDropdown>
        </PostTopRightWrap> */}
      </PostTop>
      <PostCenterWrap>
        <PostTitle>{title}</PostTitle>
        <PostMediaImage alt="Post image" src={body} />
      </PostCenterWrap>

      <PostBottomWrapper>
        <BottomLeftWrap>
          <LikeGroup>
            <LikeIcon />
            <LikeCounter>{likeCount} people liked your post</LikeCounter>
          </LikeGroup>
        </BottomLeftWrap>
        <BottomRightWrap>
          <CommentIcon onClick={() => setShowComments(showComments)} />
          <CommentText>{commentCount}</CommentText>
        </BottomRightWrap>
      </PostBottomWrapper>
      <Comment showComments={showComments} />
    </>
  );
};

export default DetailPost;

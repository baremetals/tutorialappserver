import React, { useState } from 'react'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
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
  CommentIcon,
  CommentText,
  ForumWrapper,
} from "./forum.styles";
import { Comment } from "../../Comments";
import Dropdown from "../../Dropdown";

const TextPostCard = ({
  username,
  image,
  date,
  title,
  body,
  likeCount = 0,
  commentCount = 0,
}: any) => {
  const [showComments, setShowComments] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <ForumWrapper>
      <PostTop>
        <PostLeftWrap>
          <PostProfileImge src={image} alt="user profile image" />
          <UserName>{username}</UserName>
          <PostDate>{dayjs(date).fromNow()}</PostDate>
        </PostLeftWrap>
        <PostTopRightWrap>
          <ExpandIcon onClick={() => setShowDropdown(!showDropdown)} />
        </PostTopRightWrap>
      </PostTop>
      <Dropdown showDropdown={showDropdown} />
      <PostCenterWrap>
        <PostText>{title}</PostText>
      </PostCenterWrap>
      <PostCenterWrap>
        <PostText>{body}</PostText>
      </PostCenterWrap>
      <PostBottomWrapper>
        <BottomLeftWrap>
          <LikeIcon />
          <LikeCounter>{likeCount} liked your post</LikeCounter>
        </BottomLeftWrap>
        <BottomRightWrap>
          <CommentIcon onClick={() => setShowComments(!showComments)} />
          <CommentText>{commentCount}</CommentText>
        </BottomRightWrap>
      </PostBottomWrapper>
      <Comment showComments={showComments} />
    </ForumWrapper>
  );
}

export default TextPostCard

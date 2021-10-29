import React from 'react'
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

const TextPostCard = ({
  username,
  image,
  date,
  title,
  body,
  likeCount = 0,
  commentCount = 0,
}: any) => {
  return (
    <ForumWrapper>
      <PostTop>
        <PostLeftWrap>
          <PostProfileImge src={image} alt="user profile image" />
          <UserName>{username}</UserName>
          <PostDate>{dayjs(date).fromNow()}</PostDate>
        </PostLeftWrap>
        <PostTopRightWrap>
          <ExpandIcon />
        </PostTopRightWrap>
      </PostTop>
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
          <CommentIcon />
          <CommentText>{commentCount}</CommentText>
        </BottomRightWrap>
      </PostBottomWrapper>
    </ForumWrapper>
  );
}

export default TextPostCard

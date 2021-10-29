import React from "react";
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
  PostMediaImage,
  PostBottomWrapper,
  BottomLeftWrap,
  LikeIcon,
  LikeCounter,
  BottomRightWrap,
  CommentIcon,
  CommentText,
  ForumWrapper,
} from "./forum.styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface ForumPost {
  username: string;
  image: string;
  date: any;
  title: string;
  body?: string;
  likeCount: number;
  commentCount: number;
}

const ImagePostCard = ({
  username,
  image,
  date,
  title,
  body,
  likeCount = 0,
  commentCount = 0,
}: ForumPost) => {
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
        <PostMediaImage alt="Post image" src={body} />
      </PostCenterWrap>
      <PostBottomWrapper>
        <BottomLeftWrap>
          <LikeIcon />
          <LikeCounter>{likeCount} people liked your post</LikeCounter>
        </BottomLeftWrap>
        <BottomRightWrap>
          <CommentIcon />
          <CommentText>{commentCount}</CommentText>
        </BottomRightWrap>
      </PostBottomWrapper>
    </ForumWrapper>
  );
};

export default ImagePostCard;

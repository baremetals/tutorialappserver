import React, { useState } from "react";
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
  ForumContainer,
  // DropAndCenterWrap,
} from "./forum.styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { Comment } from "../../Comments"
import Dropdown from "../../Dropdown"

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
const [showComments, setShowComments] = useState(false);
const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <ForumContainer>
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
            <PostMediaImage alt="Post image" src={body} />
          </PostCenterWrap>

          <PostBottomWrapper>
            <BottomLeftWrap>
              <LikeIcon />
              <LikeCounter>{likeCount} people liked your post</LikeCounter>
            </BottomLeftWrap>
            <BottomRightWrap>
              <CommentIcon onClick={() => setShowComments(!showComments)} />
              <CommentText>{commentCount}</CommentText>
            </BottomRightWrap>
          </PostBottomWrapper>
          <Comment showComments={showComments} />
        </ForumWrapper>
      </ForumContainer>
    </>
  );
};

export default ImagePostCard;



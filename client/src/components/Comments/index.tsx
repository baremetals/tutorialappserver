import React, { useState } from 'react'
import {
  CommentHorizontalRule,
  CommentCard,
  CommentWrapper,
  CommentLeftWrap,
  UserProfileImge,
  CommentText,
  CommentDate,
  CommentTopRightWrap,
  ExpandIcon,
  CommentInput,
  CommentInputWrap,
  CommentInputButton,
} from "./comment.styles";

import Dropdown from "../Dropdown"

export const Comment = ({ showComments, ...props }: any) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <>
      {showComments ? (
        <div showComments={showComments} {...props}>
          <CommentHorizontalRule />
          <CommentInputWrap>
            <CommentInput placeholder="comment...." />
            <CommentInputButton>send</CommentInputButton>
          </CommentInputWrap>
          <CommentCard>
            <CommentWrapper>
              <CommentLeftWrap>
                <UserProfileImge alt="sender profile image" src="/Aleah.jpg" />
                <CommentText>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting
                  industry...............................................
                </CommentText>
                <CommentDate> 2 hours ago</CommentDate>
              </CommentLeftWrap>
              <CommentTopRightWrap>
                <ExpandIcon onClick={() => setShowDropdown(!showDropdown)} />
              </CommentTopRightWrap>
            </CommentWrapper>
            <Dropdown showDropdown={showDropdown} />
            <CommentWrapper>
              <CommentLeftWrap>
                <UserProfileImge alt="sender profile image" src="/Aleah.jpg" />
                <CommentText>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting
                  industry...............................................
                </CommentText>
                <CommentDate> 2 hours ago</CommentDate>
              </CommentLeftWrap>
              <CommentTopRightWrap>
                <ExpandIcon />
              </CommentTopRightWrap>
            </CommentWrapper>
          </CommentCard>
        </div>
      ) : null}
    </>
  );
};

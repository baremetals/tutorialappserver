import React from 'react'
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
} from "./comment.styles";

export const Comment = ({ showComments, ...props }: any) => {
  return (
    <>
      {showComments ? (
        <div showComments={showComments} {...props}>
          <CommentHorizontalRule />
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
                <ExpandIcon />
              </CommentTopRightWrap>
            </CommentWrapper>
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

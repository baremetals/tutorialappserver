import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
// import ReactiveButton from "reactive-button";
import {
  NewCommentDocument,
  GetCommentsByPostIdDocument,
  useCreateCommentMutation,
  User,
} from "generated/graphql";

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
  ImageAndUserNameWrap,
  CommentInputButton,
  // CommentInputButton,
} from "./comment.styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import Dropdown from "../Dropdown"
import { useQuery } from '@apollo/client';
import { useAppSelector } from "app/hooks";
import { isUser } from "features/auth/selectors";



type FormInput = {
  body: string;
};

type userComment = {
  body: string;
  id: string;
  createdOn: string;
  createdBy: string;
  user: User
};

const Comment = ({ showComments, postId, ...props }: any) => {
  const [newComment] = useCreateCommentMutation();
  const { user: user } = useAppSelector(isUser);
  const [showDropdown, setShowDropdown] = useState(false);
  // const [state, setState] = useState("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  useEffect(() => {
    subscribeToMore({
      document: NewCommentDocument,
      variables: { postID: postId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newCommentItem: userComment = subscriptionData.data.newComment;
        const trying: any = (prevArray: userComment[]) => {
          return [newCommentItem, ...prevArray];
        };
        setComArray(trying);
      },
    });
  }, []);
  
  const {subscribeToMore,  ...result } = useQuery(GetCommentsByPostIdDocument, {
    variables: {
      postId,
    },
  });
  const comments = result.data?.getCommentsByPostId.comments;
  const [comArray, setComArray] = useState([]);
  // console.log(comArray);
  // console.log(comments)
  const me: string | undefined | any = user?.id


  if (!result.data || result.loading) {
    return <div>loading...</div>;
  }

  

  

  // const onClickHandler = () => {
  //   setState("loading");
  //   setTimeout(() => {
  //     setState("success");
  //   }, 2000);
  // };


  const onSubmit = async ({body}: any) => {
    
    try {
      const response = await newComment({
        variables: {
          userId: me,
          postId,
          body,
        },
      });
      
      if (response.data?.createComment) {

        console.log(comArray);
      } 
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  };

  return (
    <>
      {showComments ? (
        <div showComments={showComments} postId={postId} {...props}>
          <CommentHorizontalRule />
          <CommentInputWrap onSubmit={handleSubmit(onSubmit)}>
            <CommentInput
              placeholder="comment...."
              {...register("body", { required: true })}
              type="text"
              name="body"
              {...props}
            />
            {errors.body && <span>text is required</span>}
            {/* <ReactiveButton
              type="submit"
              buttonState={state}
              onClick={onClickHandler}
              {...props}
            /> */}
            <CommentInputButton type="submit">send</CommentInputButton>
          </CommentInputWrap>
          <CommentCard>
            {result.error ||
              !comments ||
              (comments.length === 0 && <div> no comments </div>)}

            {!result.loading &&
              comArray
                .concat(comments)
                .map(
                  ({
                    id,
                    body,
                    createdBy,
                    createdOn,
                    user: { username, profileImage },
                  }) => (
                    <>
                      <CommentWrapper key={id}>
                        <CommentLeftWrap>
                          <ImageAndUserNameWrap>
                            <UserProfileImge
                              alt="sender profile image"
                              src={user?.profileImage}
                            />
                          </ImageAndUserNameWrap>
                          <span>{createdBy}</span>
                          <CommentText>{body}</CommentText>
                          <CommentDate>
                            {dayjs(createdOn).fromNow()}
                          </CommentDate>
                        </CommentLeftWrap>
                        <CommentTopRightWrap>
                          <ExpandIcon
                            onClick={() => setShowDropdown(!showDropdown)}
                          />
                        </CommentTopRightWrap>
                      </CommentWrapper>
                      <Dropdown showDropdown={showDropdown} />
                    </>
                  )
                )}
          </CommentCard>
        </div>
      ) : null}
    </>
  );
};
export default Comment;


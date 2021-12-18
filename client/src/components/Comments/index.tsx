import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  NewCommentDocument,
  GetCommentsByPostSlugDocument,
  useCreateCommentMutation,
  User,
} from "generated/graphql";

import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import {PostEditor} from "../Editor"
import {
  PostDropdown,
  UserName,
} from "components/ForumPage/forum.styles";
import { SubmitButton } from "components/ShareForm/modal.styles";

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

const Comment = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [newComment] = useCreateCommentMutation();
  const { user: user } = useAppSelector(isUser);
  const [showDropdown, setShowDropdown] = useState(0);
  const [comArray, setComArray] = useState([]);
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [content, setContent] = useState<string>("");
  const {
    setValue,
    handleSubmit,
    // handleSubmit as handlePasswordSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  
  useEffect(() => {
    // let mounted = true;
    
    subscribeToMore({
      document: NewCommentDocument,
      variables: { postID: slug },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newCommentItem: userComment = subscriptionData.data.newComment;
        const newArrayItem: any = (prevArray: userComment[]) => {
          return [newCommentItem, ...prevArray];
        };
        setComArray(newArrayItem);
      },
    });
    // return () => {
    //   mounted = false;
    // };
  }, []);
  
  const { subscribeToMore, ...result } = useQuery(GetCommentsByPostSlugDocument, {
    variables: {
      slug,
    },
  });

  const comments = result.data?.getCommentsByPostSlug.comments;
  
  // console.log(comArray);
  // console.log(result.data);
  const me: string | undefined | any = user?.id


  if (!result.data || result.loading) {
    return <div>loading...</div>;
  }


  const onSubmit = async ({body}: any) => {
    
    try {
      const response = await newComment({
        variables: {
          userId: me,
          postId: slug as string,
          body,
        },
      });
      
      if (response.data?.createComment) {

        console.log(response.data?.createComment);
      } 
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  };

  const toggleDropdown = (id: number) => {
    if (id === showDropdown) {
      setShowDropdown(0);
    } else {
      setShowDropdown(id);
    }
  };

  return (
    <>
      <div>
        <CommentHorizontalRule />
        <CommentCard>
          {result.error ||
            !comArray.concat(comments) ||
            (comArray.concat(comments).length === 0 && (
              <div> no comments </div>
            ))}

          {!result.loading &&
            comArray
              .concat(comments)
              .map(
                ({ id, body, createdOn, user: { username, profileImage } }) => (
                  <div key={id}>
                    <CommentWrapper key={id}>
                      <CommentLeftWrap>
                        <Link href={`user-profile/${username}`}>
                          <UserProfileImge
                            alt="sender profile image"
                            src={profileImage}
                          />
                        </Link>

                        <CommentText>
                          <Link href={`user-profile/${username}`}>
                            <UserName>{username}</UserName>
                          </Link>

                          <CommentDate>
                            {dayjs(createdOn).fromNow()}
                          </CommentDate>
                          {body}
                        </CommentText>
                      </CommentLeftWrap>
                      <CommentTopRightWrap>
                        <PostDropdown>
                          <ExpandIcon onClick={() => toggleDropdown(id)} />
                          <Dropdown
                            onClick={() => toggleDropdown(id)}
                            showDropdown={showDropdown === id}
                          />
                        </PostDropdown>
                      </CommentTopRightWrap>
                    </CommentWrapper>
                  </div>
                )
              )}
          <form onSubmit={handleSubmit(onSubmit)}>
            {errors.body && <span>text is required</span>}
            <PostEditor
              editorState={editorState}
              onEditorStateChange={(newState: EditorState) => {
                setEditorState(newState);
                setContent(
                  draftToHtml(convertToRaw(newState.getCurrentContent()))
                );
                setValue("body", content);
              }}
            />
            <br />
            <SubmitButton type="submit">Submit</SubmitButton>
          </form>
        </CommentCard>
      </div>
    </>
  );
};
export default Comment;


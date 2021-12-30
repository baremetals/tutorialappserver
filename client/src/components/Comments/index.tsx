import React, { useEffect,  useState } from 'react'
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";

import {
  NewCommentDocument,
  GetCommentsByPostSlugDocument,
  useCreateCommentMutation,
  User,
  useDeleteCommentMutation,
} from "generated/graphql";


import Draft, { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import convertFromHTML from "draft-convert";
const PostEditor = dynamic(() => import("../Editor"), {
  ssr: false,
});

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
import Dropdown, { DeleteIcon, EditIcon, ItemText, ItemWrapper } from "../Dropdown"
import { useQuery } from '@apollo/client';
import { useAppSelector } from "app/hooks";
import { isUser } from "features/auth/selectors";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";



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
  const [deleteComment] = useDeleteCommentMutation();
  const { user: user } = useAppSelector(isUser);
  const [showDropdown, setShowDropdown] = useState(0);
  const [comArray, setComArray] = useState([]);
  const [showEditor, setShowEditor] = useState(true);
  const [showEditEditor, setShowEditEditor] = useState(false);

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  // for the edit editor

  const [editContent, setEditContent] = useState<string>("");

  // const editEditorState = EditorState.createWithContent(
  //   convertFromHTML(editContent)
  // );
    // const blocks = Draft.convertFromHTML(editContent);
  // const blocksFromHtml = htmlToDraft(editContent);
  // const { contentBlocks, entityMap } = blocksFromHtml;
  // const contentState = ContentState.createFromBlockArray(
  //   contentBlocks,
  //   entityMap
  // );
  // const [editEditorState, setEditEditorState] = useState<EditorState>(
  //   EditorState.createWithContent(contentState)
  // );

  const [content, setContent] = useState<string>("");
  const {
    setValue,
    handleSubmit,
    reset,
    // handleSubmit as handlePasswordSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormInput>();

  useEffect(() => {
    // let mounted = true;
    subscribeToMore({
      document: NewCommentDocument,
      // variables: { slug: slug },
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
  }, [newComment]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const { refetch, subscribeToMore, ...result } = useQuery(
    GetCommentsByPostSlugDocument,
    {
      variables: {
        slug,
      },
    }
  );

  const comments = result.data?.getCommentsByPostSlug.comments;

  // console.log(comArray);
  // console.log(result.data);
  const me: string | undefined | any = user?.id;

  if (!result.data || result.loading) {
    return <div>loading...</div>;
  }

  const onSubmit = async ({ body }: any) => {
    try {
      const response = await newComment({
        variables: {
          userId: me,
          slug: slug as string,
          body,
        },
      });

      if (response.data?.createComment) {
        console.log(response.data?.createComment);
      }
    } catch (ex) {
      console.log(ex);
      // throw ex;
    }
  };

  const toggleDropdown = (id: number) => {
    if (id === showDropdown) {
      setShowDropdown(0);
    } else {
      setShowDropdown(id);
    }
  };

  const toggleEditor = (body: string): void => {
    setShowEditor(false);
    setShowEditEditor(true);
    setEditContent(body);
    console.log(editContent);
  };

  // useEffect(() => {
  //   const getEditorState = (editContent) => {
  //     const blocks = Draft.convertFromHTML(editContent);
  //     const content = Draft.ContentState.createFromBlockArray(
  //       blocks.contentBlocks,
  //       blocks.entityMap
  //     );

  //     return Draft.EditorState.createWithContent(content);
  //   };
  // }, [handleDelete]);

  const handleDelete = async (id: string) => {
    const res = await deleteComment({
      variables: { id },
    });
    if (res.data?.deleteComment.includes("deleted")) {
      // console.log(res);
      refetch(GetCommentsByPostSlugDocument);
    } else {
      toast.error(res.data?.deleteComment);
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
                          <div
                            dangerouslySetInnerHTML={{ __html: body as string }}
                          ></div>
                        </CommentText>
                      </CommentLeftWrap>
                      <CommentTopRightWrap>
                        <PostDropdown>
                          <ExpandIcon onClick={() => toggleDropdown(id)} />
                          <Dropdown
                            onClick={() => toggleDropdown(id)}
                            showDropdown={showDropdown === id}
                          >
                            <ItemWrapper>
                              <div onClick={() => toggleEditor(body)}>
                                <EditIcon />
                                <ItemText onClick={() => toggleEditor(body)}>
                                  Edit
                                </ItemText>
                              </div>
                            </ItemWrapper>
                            <ItemWrapper>
                              <div onClick={() => handleDelete(id)}>
                                <DeleteIcon />
                                <ItemText onClick={() => handleDelete(id)}>
                                  Delete
                                </ItemText>
                              </div>
                            </ItemWrapper>
                          </Dropdown>
                        </PostDropdown>
                      </CommentTopRightWrap>
                    </CommentWrapper>
                  </div>
                )
              )}
          {showEditor && (
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
          )}

          {showEditEditor && (
            <form onSubmit={handleSubmit(onSubmit)}>
              {errors.body && <span>text is required</span>}
              <PostEditor
                editorState={editorState}
                onEditorStateChange={(newState: EditorState) => {
                  setEditorState(newState);
                  // setEditContent(
                  //   draftToHtml(convertToRaw(newState.getCurrentContent()))
                  // );
                  setEditContent(
                    draftToHtml(convertToRaw(newState.getCurrentContent()))
                  );
                  setValue("body", editContent);
                }}
              />
              <br />
              <SubmitButton type="submit">Submit</SubmitButton>
            </form>
          )}
        </CommentCard>
      </div>
      <ToastContainer />
    </>
  );
};
export default Comment;


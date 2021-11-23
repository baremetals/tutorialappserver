// import Modal from "components/ShareForm/Modal";
import { useQuery } from "@apollo/client";
import {
  GetCommentsByPostIdDocument,
  NewCommentDocument,
} from "generated/graphql";
import { storage } from "lib/admin";
import { uploadBytes, ref, getDownloadURL, UploadResult, StorageReference } from "firebase/storage";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

import ModalEditor from "components/ShareForm/ModalEditor";
import { useForm } from "react-hook-form";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const form = () => {
  const postId: any = "1";
  // let allComments: [];
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [content, setContent] = useState<string>("");

  // const [stuff, setStuff] = useState({
  //   body: null,
  //   articleUpdated: true,
  // });

  const { data, error, loading, subscribeToMore } = useQuery(
    GetCommentsByPostIdDocument,
    {
      variables: {
        postId,
      },
    }
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // const handleEditorContent = (content) => {

  //   setStuff({
  //     body: content,
  //     articleUpdated: true,
  //   });
  //   console.log(content)
  // };
  const submitForm = async (data: any) => {
    console.log(data)
  };

  

  const comments = data?.getCommentsByPostId.comments;

  const [comArray, setComArray] = useState([]);

  useEffect(() => {
    subscribeToMore({
      document: NewCommentDocument,
      // variables: { postID: postId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newCommentItem = subscriptionData.data.newComment;
        console.log(newCommentItem);
        setComArray((prevArray) => [newCommentItem, ...prevArray]);
        
        // const newCommentData = Object.assign({}, prev, {
        //   comments: [newCommentItem, ...prev.getCommentsByPostId.comments],
        // });
        // console.log(newCommentData.comments);
        // allComments = newCommentData.comments.map((u) => (
        //   <li key={u.id}>{u.body}</li>
        // ));

        // return newCommentData;
      },
    });
  }, []);

  // const { ...result } = useSubscription(
  //   GetCommentsByPostIdDocument,
  //   {
  //     variables: {
  //       postId,
  //     },
  //   }
  // );

  //console.log(comments);
  // if (!loading) {
  //   // const allComments = comments.map((u) => <li key={u.id}>{u.body}</li>);
  //   return allComments;
  //   // return comments?.comments.map((u) => <li key={u.id}>{u.body}</li>)
  // }

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <div>
          <ModalEditor
            editorState={editorState}
            onEditorStateChange={(newState: EditorState) => {
              setEditorState(newState);
              setContent(
                draftToHtml(convertToRaw(newState.getCurrentContent()))
              );
              setValue("body", content);
            }}
          />
          {/* <Editor
            // {...props}
            editorState={editorState}
            toolbarClassName="toolbar-class"
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            onEditorStateChange={(newState: EditorState) => {
              setEditorState(newState);
              setContent(
                draftToHtml(convertToRaw(newState.getCurrentContent()))
              );
              setValue("body", content);
            }}
            // toolbarOnFocus
            toolbar={{
              options: [
                "inline",
                "blockType",
                "fontSize",
                "fontFamily",
                "list",
                "textAlign",
                "colorPicker",
                "link",
                "embedded",
                "emoji",
                "image",
                "history",
              ],
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: {
                urlEnabled: true,
                uploadEnabled: true,
                uploadCallback: uploadImageCallBack,
                previewImage: true,
                alt: { present: false, mandatory: false },
              },
            }}
          /> */}
        </div>
        <div>
          <button type="submit">submit..</button>
        </div>
      </form>
    </>
    // !loading && (
    //   <div>
    //     {/* {comArray.map((u) => (
    //       <li key={u.id}>{u.body}</li>
    //     ))} */}
    //     {comArray.concat(comments).map(({id, body}) => (
    //       <li key={id}>{body}</li>
    //     ))}
    //   </div>
    // )
  );
  // // return (
  // //   <>
  // //     {/* {!loading && <div>{allComments}</div>} */}
  // //     {/* {!loading && (
  // //       <u>
  // //         <div>
  // //           {comments.map((u) => (
  // //             <li key={u.id}>{u.body}</li>
  // //           ))}
  // //         </div>
  // //       </u>
  // //     )} */}

  //   </>
  // );
};

export default form;

import React from 'react'
import dynamic from "next/dynamic";

// import { useMutation } from "@apollo/client";
import { client } from "lib/initApollo";
import {
  UploadFileDocument,
  // MutationUploadFileArgs,
  UploadFileMutation,
} from "generated/graphql";


const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const ModalEditor = ({
  editorState,
  onEditorStateChange,
  id,
  ...props
}: any) => {

    const uploadImageCallBack = async (file: File) => {
      // console.log(file);
      const res = await uploadInlineImageForModal(file, id);
      console.log(res?.uploadFile);

      return Promise.resolve({
        data: {
          link: res?.uploadFile,
        },
      });
      
    };

  return (
    <Editor
      {...props}
      editorState={editorState}
      toolbarClassName="toolbar-class"
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      onEditorStateChange={onEditorStateChange}
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
    />
  );
};

export default ModalEditor

export const uploadInlineImageForModal = async (
  file: File,
  id: string
) => {
  try {
    // console.log(file)
    const { data } = await client.mutate<UploadFileMutation>({
      mutation: UploadFileDocument,
      variables: {
        file,
        id
      },
    });
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};


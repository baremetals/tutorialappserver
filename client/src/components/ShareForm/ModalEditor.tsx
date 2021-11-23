import React from 'react'
import { storage } from "lib/admin";
import { uploadBytes, ref, getDownloadURL, StorageReference } from "firebase/storage";
import dynamic from "next/dynamic";


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
  ...props
}: any) => {

    const uploadImageCallBack = async (file: File) => {
      const testingRef = ref(storage, `testing folder/${file.name}`);
      console.log(file.name);

      await uploadInlineImageForModal(file, testingRef);
      const url = await getDownloadURL(testingRef);
      return Promise.resolve({
        data: {
          link: url,
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
  storeRef: StorageReference
) => {
  try {
    const data = await uploadBytes(storeRef, file);
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
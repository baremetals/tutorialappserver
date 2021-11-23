import React from "react";
import dynamic from "next/dynamic"; 

const Editor =
  dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), {
    ssr: false,
  });

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export const PostEditor = ({ editorState, onEditorStateChange, ...props }: any) => {

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
          // "inline",
          // "blockType",
          // "fontSize",
          // "fontFamily",
          // "list",
          // "textAlign",
          // "colorPicker",
          // "link",
          // "embedded",
          "emoji",
          // "history",
        ],
        // inline: { inDropdown: true },
        // list: { inDropdown: true },
        // textAlign: { inDropdown: true },
        // link: { inDropdown: true },
        // history: { inDropdown: true },
      }}
    />
  );
};


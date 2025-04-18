import React, { memo, useEffect, useRef } from "react";

import EditorJS from "@editorjs/editorjs";
import ImageTool from "@editorjs/image";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Raw from "@editorjs/raw";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import AttachesTool from "@editorjs/attaches";

import axios from "axios";

function Editor({ onChange, data }) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        tools: EDITOR_TOOLS,
        data,
        async onChange(api, event) {
          const result = await api.saver.save();
          onChange(result.blocks);
        },
      });

      ref.current = editor;
    }
    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return <div className="prose h-[600px]  mx-auto" id="editorjs"></div>;
}

export default memo(Editor);

async function uploadByFile(file) {
  let user = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;
  console.log("🚀 ~ uploadByFile ~ user:", user);
  if (user) {
    // your own uploading logic here
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.put(
        "http://west.edu.mn:3000/api/v1/news/photo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const { photo } = res.data;
      return {
        success: 1,
        file: {
          url: `http://west.edu.mn:3000/upload/news/${photo}`,
        },
      };
    } catch (error) {
      console.log(error.response.data.error);
    }
  } else {
    console.log("not auth");
  }
}

const EDITOR_TOOLS = {
  header: Header,
  paragraph: { class: Paragraph, InlineCode: true },
  embed: Embed,
  table: Table,
  marker: Marker,
  list: { class: List, InlineCode: true },
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  raw: Raw,
  quote: { class: Quote, InlineCode: true },
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: {
    class: ImageTool,
    config: {
      /**
       * Custom uploader
       */
      uploader: {
        /**
         * Upload file to the server and return an uploaded image data
         * @param {File} file - file selected from the device or pasted by drag-n-drop
         * @return {Promise.<{success, file: {url}}>}
         */
        uploadByFile,
      },
    },
  },
  image: {
    class: ImageTool,
    config: {
      /**
       * Custom uploader
       */
      uploader: {
        /**
         * Upload file to the server and return an uploaded image data
         * @param {File} file - file selected from the device or pasted by drag-n-drop
         * @return {Promise.<{success, file: {url}}>}
         */
        uploadByFile,
      },
    },
  },
};

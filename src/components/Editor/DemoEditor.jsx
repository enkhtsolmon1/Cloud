import React from "react";
import { createReactEditorJS } from "react-editor-js";

const ReactEditorJS = createReactEditorJS();
import Header from "@editorjs/header";

const DemoEditor = () => {
  const [data, setData] = React.useState({
    title: "",
    blocks: [],
  });
  console.log("🚀 ~ DemoEditor ~ data:", data);
  const editorCore = React.useRef(null);

  const handleInitialize = React.useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  const handleSave = React.useCallback(async () => {
    const edata = await editorCore.current.save();
    setData((prevData) => ({
      ...prevData,
      blocks: edata.blocks,
    }));
    // console.log("🚀 ~ handleSave ~ savedData:", savedData);
  }, []);
  return (
    <div className="border">
      <input
        className="border p-4"
        type="text"
        onChange={(e) => {
          setData({
            ...data,
            title: e.target.value,
          });
        }}
      />
      <ReactEditorJS
        onChange={() => {
          handleSave();
        }}
        instanceRef={(instance) => (editorCore.current = instance)}
        onInitialize={handleInitialize}
        tools={{ header: Header }}
        defaultValue={{}}
      />
      <button
        onClick={handleSave}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Save
      </button>
      {/* <EditorJs
        editorInstance={(instance) => (this.editorInstance = instance)}
        tools={{ header: Header }}
        data={data}
      /> */}
    </div>
  );
};

export default DemoEditor;

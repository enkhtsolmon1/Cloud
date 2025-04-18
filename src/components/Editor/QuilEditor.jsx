import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill CSS for styling

const QuilEditor = () => {
  const [value, setValue] = useState("");

  return (
    <div>
      <h1>React Quill Editor</h1>
      <ReactQuill
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }], // Header sizes
            ["bold", "italic", "underline"], // Text styling
            [{ list: "ordered" }, { list: "bullet" }], // Lists
            ["link", "image"], // Link and image
            ["clean"], // Remove formatting
          ],
        }}
        theme="snow"
        value={value}
        onChange={setValue}
      />
      <h2>Output:</h2>
      <div className="prose" dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  );
};

export default QuilEditor;

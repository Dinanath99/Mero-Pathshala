import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  input: { description?: string; [key: string]: any };
  setInput: React.Dispatch<React.SetStateAction<any>>;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ input, setInput }) => {
  const handleChange = (content: string) => {
    setInput((prev: any) => ({ ...prev, description: content }));
  };

  return <ReactQuill theme="snow" value={input.description || ""} onChange={handleChange} />;
};

export default RichTextEditor;

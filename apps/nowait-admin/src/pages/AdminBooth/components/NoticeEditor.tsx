import { useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const NoticeEditor = () => {
  const [title, setTitle] = useState("입장 시 신분증 검사 필수");
  const [content, setContent] = useState("");

  return (
    <div className="w-full max-w-[600px] bg-white border rounded-xl p-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="공지 제목을 입력하세요"
        className="w-full text-base font-semibold mb-4 outline-none"
      />

      <Editor
        initialValue="hello react editor world!"
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={false}
      />
    </div>
  );
};

export default NoticeEditor;

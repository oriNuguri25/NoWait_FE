import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  return (
    <div className="flex px-[14px] py-[8px] border-b border-[#F4F4F4] text-gray-600">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className="px-2 py-1 rounded hover:bg-gray-100"
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className="px-2 py-1 mr-6 rounded hover:bg-gray-100"
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className="px-2 py-1 font-bold rounded hover:bg-gray-100"
      >
        B
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className="px-2 py-1 italic rounded hover:bg-gray-100"
      >
        I
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className="px-2 py-1 underline rounded hover:bg-gray-100"
      >
        U
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className="px-2 py-1 line-through rounded hover:bg-gray-100"
      >
        S
      </button>
    </div>
  );
};

const NoticeEditor = () => {
  const [title, setTitle] = useState("제목을 입력해주세요");

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: `내용을 입력해주세요`,
  });

  const handleSave = () => {
    const html = editor?.getHTML();
    console.log("제목:", title);
    console.log("내용:", html);
    // API 전송 가능
  };

  return (
    <div className="w-full bg-white border border-[#DDDDDD] rounded-xl">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="공지 제목을 입력하세요"
        className="w-full px-5 py-3 text-[#666666] bg-black-20 font-semibold rounded-t-xl outline-none"
      />
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="min-h-[120px] h-[300px] px-[20px] py-[16px] focus:outline-none whitespace-pre-wrap"
      />
    </div>
  );
};

export default NoticeEditor;

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { useRemoveEmoji } from "../../../hooks/useRemoveEmoji";

const MenuBar = ({ editor }: { editor: any }) => {
  const [editorChanged, setEditorChanged] = useState(0);
  // 툴바 버튼 클릭시 리랜더링
  useEffect(() => {
    if (!editor) return;
    console.log(editorChanged);

    const update = () => setEditorChanged((prev) => prev + 1);
    editor.on("transaction", update);
    return () => editor.off("transaction", update);
  }, [editor]);

  if (!editor) return null;

  const baseBtnClass =
    "h-[34px] w-[34px] flex justify-center items-center rounded hover:bg-gray-100 transition-colors duration-200";

  return (
    <div className="flex px-[14px] py-[8px] border-b border-[#F4F4F4] text-gray-600">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${baseBtnClass} ${
          editor.isActive("bold") ? "bg-gray-100" : ""
        }`}
      >
        B
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${baseBtnClass} ${
          editor.isActive("italic") ? "bg-gray-100" : ""
        }`}
      >
        I
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${baseBtnClass} ${
          editor.isActive("underline") ? "bg-gray-100" : ""
        }`}
      >
        U
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${baseBtnClass} ${
          editor.isActive("strike") ? "bg-gray-100" : ""
        }`}
      >
        S
      </button>
    </div>
  );
};
const NoticeEditor = ({
  noticeTitle,
  setNoticeTitle,
  notice,
  setNotice,
}: {
  noticeTitle: string;
  setNoticeTitle: (val: string) => void;
  notice: string;
  setNotice: (val: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: notice || "",
  });
  const { removeEmojiAll } = useRemoveEmoji();

  // 부모로 내용 동기화
  useEffect(() => {
    if (!editor) return;
    editor.on("update", () => {
      setNotice(editor.getHTML());
    });
  }, [editor, setNotice]);

  const [hasCleared, setHasCleared] = useState(false);
  // 텍스터 에디터 focusing시 clear
  useEffect(() => {
    if (!editor) return;

    const handleFocus = () => {
      if (!hasCleared) {
        editor.commands.clearContent();
        setHasCleared(true);
      }
    };

    editor.on("focus", handleFocus);
    return () => {
      editor.off("focus", handleFocus);
    };
  }, [editor, hasCleared]);

  return (
    <div className="w-full bg-white border border-[#DDDDDD] rounded-xl max-w-[614px]">
      <input
        type="text"
        value={noticeTitle}
        onFocus={() => setNoticeTitle("")}
        onChange={(e) => setNoticeTitle(removeEmojiAll(e.target.value))}
        placeholder="제목을 입력해주세요"
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

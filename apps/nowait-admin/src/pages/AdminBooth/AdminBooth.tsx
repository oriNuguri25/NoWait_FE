import { useState } from "react";

export default function BoothForm() {
  const [boothName, setBoothName] = useState("");
  const [description, setDescription] = useState("");
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeBody, setNoticeBody] = useState("");

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* 탭 */}
      <div className="flex space-x-4 mb-10">
        <button className="px-4 py-2 rounded-full bg-black text-white font-semibold">
          부스 관리
        </button>
        <button className="px-4 py-2 rounded-full text-gray-400 font-semibold">
          메뉴 관리
        </button>
      </div>

      {/* 부스명 */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">부스명</label>
        <input
          type="text"
          value={boothName}
          onChange={(e) => setBoothName(e.target.value)}
          placeholder="부스명을 입력하세요"
          maxLength={20}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
        <div className="text-right text-sm text-gray-400 mt-1">
          {boothName.length} / 20
        </div>
      </div>

      {/* 부스 소개 */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">부스 소개</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={250}
          placeholder="부스 소개를 입력해주세요"
          className="w-full h-28 border border-gray-300 rounded-lg px-4 py-2 resize-none"
        />
        <div className="text-right text-sm text-gray-400 mt-1">
          {description.length} / 250
        </div>
      </div>

      {/* 배너 이미지 */}
      <div className="mb-8">
        <label className="block font-semibold mb-2">배너 이미지</label>
        <p className="text-sm text-gray-500 mb-3">
          첫번째 이미지는 우리 부스를 대표하는 이미지로 설정돼요
        </p>
        <div className="flex gap-4">
          {[0, 1, 2].map((i) => (
            <label
              key={i}
              className="w-24 h-24 border border-gray-300 rounded-lg flex items-center justify-center cursor-pointer"
            >
              <input type="file" className="hidden" />
              <img
                src="/image-placeholder.svg"
                alt="placeholder"
                className="w-8 h-8 opacity-50"
              />
            </label>
          ))}
        </div>
      </div>

      {/* 공지사항 */}
      <div className="mb-10">
        <label className="block font-semibold mb-2">공지사항</label>
        <p className="text-sm text-gray-500 mb-2">
          방문자에게 보여질 공지사항을 작성해주세요. (선택사항)
        </p>
        <div className="border border-gray-300 rounded-lg p-4 space-y-3">
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            value={noticeTitle}
            onChange={(e) => setNoticeTitle(e.target.value)}
            className="w-full border-b border-gray-200 pb-2 text-lg font-semibold"
          />
          {/* 간단한 에디터 버튼들 */}
          <div className="flex gap-3 text-sm text-gray-500">
            <button className="font-bold">H1</button>
            <button className="font-bold">H2</button>
            <button className="font-bold">B</button>
            <button className="italic">I</button>
            <button className="underline">U</button>
            <button className="line-through">S</button>
          </div>
          <textarea
            className="w-full h-40 border-none outline-none resize-none"
            placeholder="공지사항을 입력하세요"
            value={noticeBody}
            onChange={(e) => setNoticeBody(e.target.value)}
          />
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex justify-end gap-4">
        <button className="px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-800">
          미리보기
        </button>
        <button className="px-6 py-3 rounded-lg bg-black text-white font-semibold">
          저장하기
        </button>
      </div>
    </div>
  );
}

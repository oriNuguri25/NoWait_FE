// MyWaitingSection Props
interface MyWaitingSectionProps {
  children: React.ReactNode;
}

// 내 대기 카드 섹션을 별도 컴포넌트로 분리하여 메모이제이션
const MyWaitingSection = ({ children }: MyWaitingSectionProps) => {
  return (
    <div className="flex flex-col px-5 mb-10">
      {/* 내 대기 순서 */}
      <div className="flex flex-col">
        <div className="flex flex-row gap-1.5 text-title-20-bold text-black-100">
          <div className="flex">나의 대기카드</div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default MyWaitingSection;

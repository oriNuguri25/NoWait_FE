interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  isCompact?: boolean;
}

export const MenuItem = ({ icon, label, isCompact }: MenuItemProps) => {
  return (
    <div className="flex items-center justify-center w-[48px] h-[48px] rounded-lg hover:bg-black-5 cursor-pointer">
      <div className="flex flex-col items-center gap-1">
        {icon}
        {!isCompact && (
          <span className="text-16-regular text-black-60">{label}</span>
        )}
      </div>
    </div>
  );
};

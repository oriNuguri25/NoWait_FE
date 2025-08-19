import { memo } from "react";
import Logo from "../../assets/logo.svg?react";
import Menu from "../../assets/icon/menu.svg?react";
import Search from "../../assets/icon/search.svg?react";
import Cancel from "../../assets/icon/cancel.svg?react";
import Refresh from "../../assets/icon/refresh.svg?react";
import ArrowDown from "../../assets/icon/arrow_down.svg?react";
import BannerMap from "../../assets/icon/banner_img.svg?react";
import UpIcon from "../../assets/icon/upIcon.svg?react";

// 메모이제이션된 SVG 컴포넌트들
export const MemoizedLogo = memo<{ className?: string }>(({ className }) => (
  <Logo className={className} />
));

export const MemoizedMenu = memo<{ className?: string }>(({ className }) => (
  <Menu className={className} />
));

export const MemoizedSearch = memo<{ className?: string }>(({ className }) => (
  <Search className={className} />
));

export const MemoizedCancel = memo<{ className?: string }>(({ className }) => (
  <Cancel className={className} />
));

export const MemoizedRefresh = memo<{ className?: string }>(({ className }) => (
  <Refresh className={className} />
));

export const MemoizedArrowDown = memo<{ className?: string }>(
  ({ className }) => <ArrowDown className={className} />
);

export const MemoizedBannerMap = memo<{ className?: string }>(
  ({ className }) => <BannerMap className={className} />
);

export const MemoizedUpIcon = memo<{ className?: string }>(({ className }) => (
  <UpIcon className={className} />
));

// displayName 설정 (디버깅 시 유용)
MemoizedLogo.displayName = "MemoizedLogo";
MemoizedMenu.displayName = "MemoizedMenu";
MemoizedSearch.displayName = "MemoizedSearch";
MemoizedCancel.displayName = "MemoizedCancel";
MemoizedRefresh.displayName = "MemoizedRefresh";
MemoizedArrowDown.displayName = "MemoizedArrowDown";
MemoizedBannerMap.displayName = "MemoizedBannerMap";
MemoizedUpIcon.displayName = "MemoizedUpIcon";

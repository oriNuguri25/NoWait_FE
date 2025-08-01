declare module "react-swipeable-list" {
  import * as React from "react";

  export interface SwipeActionProps {
    onClick: () => void;
    destructive?: boolean;
    children?: React.ReactNode;
  }
  export const SwipeAction: React.FC<SwipeActionProps>;

  export interface SwipeableListItemProps {
    children?: React.ReactNode;
    leadingActions?: React.ReactNode;
    trailingActions?: React.ReactNode;
  }
  export const SwipeableListItem: React.FC<SwipeableListItemProps>;

  export const TrailingActions: React.FC<{ children?: React.ReactNode }>;
  export const LeadingActions: React.FC<{ children?: React.ReactNode }>;

  export const SwipeableList: React.FC<{ children?: React.ReactNode }>;
}

import { useMemo } from "react";
import type { DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";

/** 드래그 중 보이는 이동을 Y축으로만 보이도록 X를 0으로 고정 */
export function useVerticalLockStyle<
  T extends DraggingStyle | NotDraggingStyle | undefined
>(style: T): T {
  return useMemo(() => {
    if (!style || !style.transform) return style;

    const t = style.transform;

    // translate3d(x, y, z)
    const m3d = t.match(
      /translate3d\(\s*([-\d.]+)px,\s*([-\d.]+)px,\s*([-\d.]+)px\s*\)/
    );
    if (m3d) {
      const [, , y, z] = m3d;
      return { ...style, transform: `translate3d(0px, ${y}px, ${z}px)` } as T;
    }

    // translate(x, y)
    const m2d = t.match(/translate\(\s*([-\d.]+)px,\s*([-\d.]+)px\s*\)/);
    if (m2d) {
      const [, , y] = m2d;
      return { ...style, transform: `translate(0px, ${y}px)` } as T;
    }

    // 다른 transform 포맷은 그대로 유지
    return style;
  }, [style && style.transform]);
}

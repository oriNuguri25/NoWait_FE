// src/components/NewOrderToast.tsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useNewOrderToastStore } from "../hooks/useNewOrderToastStore";

function formatTime(s?: string) {
  if (!s) return "";
  const d = new Date(s);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(
    d.getHours()
  )}:${p(d.getMinutes())}`;
}
function formatCurrency(n: number) {
  return n.toLocaleString("ko-KR") + "원";
}

export default function NewOrderToast() {
  const { toasts, removeToast } = useNewOrderToastStore();
  const nav = useNavigate();
  const storeId = localStorage.getItem("storeId");

  // 토스트별 펼침 상태(요약↔상세)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  return (
    <>
      <audio
        id="new-order-audio"
        src="/assets/sounds/new-order.mp3"
        preload="auto"
      />
      <div className="fixed top-4 right-4 z-[1000] flex flex-col gap-2">
        {toasts.map((t) => {
          const isOpen = !!expanded[t.id];
          const tableId = t.meta?.tableId;
          const createdAt = t.meta?.createdAt;

          // ✅ 훅 없이 계산만
          const menuDetails = t.meta?.menuDetails ?? {};
          const menuNames = Object.keys(menuDetails);
          const firstMenu = menuNames[0];

          const computedTotal =
            (typeof t.meta?.totalPrice === "number"
              ? t.meta.totalPrice
              : undefined) ??
            menuNames.reduce((sum, name) => {
              const q = menuDetails[name]?.quantity ?? 0;
              const p = menuDetails[name]?.price ?? 0;
              return sum + q * p;
            }, 0);

          return (
            <div
              key={t.id}
              className="w-[320px] rounded-xl bg-white border border-black-10 shadow-lg p-3"
            >
              {/* 타이틀 */}
              <div className="text-14-semibold text-black-90">{t.title}</div>

              {/* 요약 뷰 */}
              {!isOpen && (
                <div className="mt-2">
                  <div className="text-13-semibold text-black-90">
                    테이블 {tableId ?? ""}/{t.meta?.orderName}
                  </div>
                  <div className="text-13-regular text-black-60 mt-1">
                    {firstMenu ?? "메뉴 없음"} / {formatTime(createdAt)}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      className="px-3 py-2 rounded-lg bg-black text-white text-13-semibold"
                      onClick={() =>
                        setExpanded((s) => ({ ...s, [t.id]: true }))
                      }
                    >
                      상세보기
                    </button>
                    <button
                      className="px-3 py-2 rounded-lg bg-black-5 text-black-70 text-13-semibold"
                      onClick={() => {
                        if (storeId) nav(`/admin/orders/${storeId}`);
                        removeToast(t.id);
                      }}
                    >
                      확인
                    </button>
                  </div>
                </div>
              )}

              {/* 상세 뷰 */}
              {isOpen && (
                <div className="mt-2">
                  <div className="text-13-semibold text-black-90">
                    테이블 {tableId ?? ""}/{t.meta?.orderName}
                  </div>
                  <div className="text-13-regular text-black-60 mt-1">
                    {firstMenu ?? "메뉴 없음"} / {formatTime(createdAt)}
                  </div>

                  {/* 메뉴 목록 */}
                  <div className="mt-3 rounded-lg bg-black-5 p-2 max-h-[180px] overflow-auto">
                    {menuNames.length === 0 ? (
                      <div className="text-13-regular text-black-50">
                        메뉴 없음
                      </div>
                    ) : (
                      <ul className="space-y-1">
                        {menuNames.map((name) => {
                          const { quantity = 0, price = 0 } =
                            menuDetails[name] ?? {};
                          return (
                            <li
                              key={name}
                              className="flex justify-between text-13-regular text-black-80"
                            >
                              <span className="truncate mr-2">
                                {name} × {quantity}
                              </span>
                              <span>{formatCurrency(price * quantity)}</span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>

                  {/* 총 가격 */}
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-13-semibold text-black-70">
                      총 가격
                    </span>
                    <span className="text-13-semibold text-black-90">
                      {formatCurrency(computedTotal)}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button
                      className="px-3 py-2 rounded-lg bg-black-5 text-black-70 text-13-semibold"
                      onClick={() =>
                        setExpanded((s) => ({ ...s, [t.id]: false }))
                      }
                    >
                      상세보기 닫기
                    </button>
                    <button
                      className="px-3 py-2 rounded-lg bg-black-5 text-black-70 text-13-semibold"
                      onClick={() => {
                        if (storeId) nav(`/admin/orders/${storeId}`);
                        removeToast(t.id);
                      }}
                    >
                      확인
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

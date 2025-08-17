import React, { createContext, useState, useMemo } from "react";

export const IsDirtyContext = createContext<{
  isDirty: boolean;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
  saveFn: (() => void) | null;
  setSaveFn: React.Dispatch<React.SetStateAction<(() => void) | null>>;
  showUnsavedModal: boolean;
  setShowUnsavedModal: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isDirty: false,
  setIsDirty: () => {},
  saveFn: null,
  setSaveFn: () => {},
  showUnsavedModal: false,
  setShowUnsavedModal: () => {},
});

export function IsDirtyProvider({ children }: { children: React.ReactNode }) {
  const [isDirty, setIsDirty] = useState(false);
  const [saveFn, setSaveFn] = useState<(() => void) | null>(null);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);

  const value = useMemo(
    () => ({
      isDirty,
      setIsDirty,
      saveFn,
      setSaveFn,
      showUnsavedModal,
      setShowUnsavedModal,
    }),
    [isDirty, saveFn, showUnsavedModal]
  );

  return (
    <IsDirtyContext.Provider value={value}>{children}</IsDirtyContext.Provider>
  );
}

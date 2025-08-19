import { createRoot } from "react-dom/client";
import "./global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IsDirtyProvider } from "./Context/dirtyModeContext.tsx";
import AppRouter from "./AppRouter.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <IsDirtyProvider>
      <AppRouter />
    </IsDirtyProvider>
  </QueryClientProvider>

  // </StrictMode>
);

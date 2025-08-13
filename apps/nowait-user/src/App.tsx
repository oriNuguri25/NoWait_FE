import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";
import Toast from "./components/common/toast/Toast";
import { Suspense } from "react";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<div>로딩중..................</div>}>
          <Router />
        </Suspense>
        <Toast />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

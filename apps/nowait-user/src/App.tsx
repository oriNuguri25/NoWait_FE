import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";
import Toast from "./components/common/toast/Toast";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
        <Toast />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

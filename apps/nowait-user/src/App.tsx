import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";
import Toast from "./components/common/toast/Toast";
import { AnimatePresence } from "framer-motion";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* <AnimatePresence mode="wait"> */}
          <Router />
        {/* </AnimatePresence> */}
        <Toast />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

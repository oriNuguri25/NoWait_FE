import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";
import GlobalToast from "./components/common/Toast";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
        <GlobalToast/>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

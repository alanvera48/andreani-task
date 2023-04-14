import "./App.css";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={HTML5Backend}>
        <Header />
        <Home />
      </DndProvider>
    </QueryClientProvider>
  );
}

export default App;

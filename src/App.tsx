import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormPage } from "./pages/FormPage";
import { GamePage } from "./pages/GamePage";
import { GameSocketProdiver } from "./context/useSocket";

function App() {
  return (
    <div className="flex flex-1 h-screen w-screen items-center justify-center">
      <Router>
        <GameSocketProdiver>
          <Routes>
            <Route path="/" element={<FormPage />} />
            <Route path="/game/:id" element={<GamePage />} />
          </Routes>
        </GameSocketProdiver>
      </Router>
    </div>
  );
}

export default App;

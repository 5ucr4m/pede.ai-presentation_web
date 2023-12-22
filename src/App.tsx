import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormPage } from "./pages/FormPage";
import { GamePage } from "./pages/GamePage";
import { GameSocketProdiver } from "./context/useSocket";

function App() {
  return (
    <GameSocketProdiver>
      <div className="flex flex-1 h-screen w-screen items-center justify-center">
        <Router>
          <Routes>
            <Route path="/" element={<FormPage />} />
            <Route path="/game" element={<GamePage />} />
          </Routes>
        </Router>
      </div>
    </GameSocketProdiver>
  );
}

export default App;

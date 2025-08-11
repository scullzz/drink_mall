import { Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import useTelegramWebAppInit from "../utils/telegramInit";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Chat from "./pages/chat/Chat";

function App() {
  useTelegramWebAppInit();
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <div style={{ height: "100%", overflow: "auto" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/favorites" element={<Favorite />} /> */}
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>

      <Navigation />
    </div>
  );
}

export default App;

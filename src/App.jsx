import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./common-components/NavBar/Navbar.jsx"
import Home from "./pages/Home/Home.jsx"
import Polls from "./pages/Polls/Polls.jsx"
import YourPolls from "./pages/YourPolls/YourPolls.jsx"

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/yourpolls" element={<YourPolls />} />
      </Routes>
    </Router>
  );
}

export default App

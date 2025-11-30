import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Team from './components/Team';
import Contact from './components/Contact';
import MapViewer from './components/MapViewer';
import './App.css'; // You can keep this or clear its content

function App() {
  return (
    <Router>
      {/* Navbar stays at the top on every page */}
      <Navbar />
      
      {/* Main content area */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/map" element={<MapViewer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
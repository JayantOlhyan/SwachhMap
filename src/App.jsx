import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Report from './pages/Report';
import MapView from './pages/Map';
import List from './pages/List';
import ReportDetail from './pages/ReportDetail';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Shop from './pages/Shop';
import Leaderboard from './pages/Leaderboard';
import Privacy from './pages/Privacy';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/list" element={<List />} />
          <Route path="/report/:id" element={<ReportDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/settings/privacy" element={<Privacy />} />
          <Route path="/settings/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

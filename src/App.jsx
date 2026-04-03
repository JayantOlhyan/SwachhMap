import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Report from './pages/Report';
import MapView from './pages/Map';
import List from './pages/List';
import ReportDetail from './pages/ReportDetail';

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
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

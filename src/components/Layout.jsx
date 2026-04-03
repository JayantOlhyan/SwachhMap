import { useLocation, Link, useNavigate } from 'react-router-dom';
import { MapPin, Camera, User, Settings, ArrowLeft } from 'lucide-react';
import { clsx } from 'clsx';

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isHome = location.pathname === '/';
  const isMap = location.pathname === '/map';
  const isList = location.pathname === '/list';
  const isReport = location.pathname === '/report';
  const isDetail = location.pathname.startsWith('/report/');

  // Decide if we should show bottom nav
  const showBottomNav = isList; // Based on Image 4, Bottom Nav is in List View or Profile

  // Render varying headers based on route
  const renderHeader = () => {
    if (isHome) {
      return (
        <header className="bg-swachh-green text-white p-4 shadow-md sticky top-0 z-50 rounded-b-xl flex justify-center items-center">
          <div className="flex items-center gap-2">
            <MapPin className="text-white fill-white bg-green-700 rounded p-1" size={32} />
            <h1 className="text-2xl font-bold font-sans tracking-wide">SwachhMap</h1>
          </div>
        </header>
      );
    }
    
    if (isReport || isDetail) {
      return (
        <header className="bg-swachh-green text-white p-4 shadow-md sticky top-0 z-50 flex items-center">
          <button onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold font-sans">
            {isReport ? 'Report an Issue' : 'Issue Details'}
          </h1>
        </header>
      );
    }

    if (isList) {
      return (
        <header className="bg-swachh-green text-white px-4 py-4 pt-6 shadow-md rounded-b-2xl sticky top-0 z-50 flex justify-between items-center">
          <h1 className="text-2xl font-bold font-sans">All Reports</h1>
          <Link to="/map" className="bg-white text-swachh-green px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1">
            <MapPin size={16} /> Map View
          </Link>
        </header>
      );
    }

    if (isMap) {
      return (
        <header className="absolute top-4 left-4 right-4 z-[400] flex justify-between items-center bg-[#F4F1E1] shadow-lg rounded-2xl p-3">
          <h1 className="text-xl font-bold text-gray-900 font-sans">SwachhMap</h1>
          <Link to="/list" className="bg-white text-gray-800 px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm">
            <div className="w-5 h-5 bg-gray-200 rounded-full"></div> List View
          </Link>
        </header>
      );
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans max-w-md mx-auto shadow-2xl relative overflow-hidden">
      {renderHeader()}
      
      <main className={clsx("flex-1 flex flex-col relative", isMap && "h-screen")}>
        {children}
      </main>

      {showBottomNav && (
        <nav className="bg-white border-t border-gray-200 flex justify-between px-6 py-4 sticky bottom-0 z-50 pb-6 rounded-t-3xl shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
          <Link to="/report" className="flex flex-col items-center text-gray-500 hover:text-swachh-green">
            <p className="text-sm font-medium">Report an Issue</p>
          </Link>
          <Link to="#" className="flex flex-col items-center text-gray-500 hover:text-swachh-green">
             <p className="text-sm font-medium">My Profile</p>
          </Link>
          <Link to="#" className="flex flex-col items-center text-gray-500 hover:text-swachh-green">
             <p className="text-sm font-medium">Settings</p>
          </Link>
        </nav>
      )}
    </div>
  );
}

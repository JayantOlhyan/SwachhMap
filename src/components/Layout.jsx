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
  const isProfile = location.pathname === '/profile';
  const isSettings = location.pathname === '/settings';
  const isDetail = location.pathname.startsWith('/report/');

  // Show bottom nav on main utility pages
  const showBottomNav = isList || isProfile || isSettings || isHome;

  // Render varying headers based on route
  const renderHeader = () => {
    if (isHome) {
      return (
        <header className="bg-swachh-green text-white p-4 shadow-md sticky top-0 z-50 rounded-b-xl flex justify-center items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="SwachhMap Logo" className="w-10 h-10 object-contain rounded-lg bg-white p-0.5" />
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
        <header className="absolute top-4 left-4 right-4 z-[500] flex justify-between items-center bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-3 border border-swachh-emerald/20">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain rounded-full bg-white shadow-sm" />
            <h1 className="text-lg font-bold text-gray-900 font-sans tracking-tight">SwachhMap</h1>
          </div>
          <Link to="/list" className="bg-swachh-emerald text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-md hover:bg-swachh-green transition-all">
             List View
          </Link>
        </header>
      );
    }
    
    if (isProfile || isSettings) {
       return (
        <header className="bg-swachh-green text-white p-4 shadow-md sticky top-0 z-50 flex items-center">
          <button onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold font-sans">
            {isProfile ? 'My Profile' : 'Settings'}
          </h1>
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
        <nav className="bg-white/95 backdrop-blur-md border-t border-gray-100 flex justify-between px-6 py-4 sticky bottom-0 z-50 pb-6 rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
          <Link to="/list" className={clsx("flex flex-col items-center gap-1 transition-colors", isList ? "text-swachh-emerald" : "text-gray-400")}>
            <MapPin size={24} className={isList ? "fill-swachh-emerald/10" : ""} />
            <p className="text-[10px] font-bold uppercase tracking-tighter">Reports</p>
          </Link>
          <Link to="/report" className="flex flex-col items-center -mt-8">
            <div className="w-14 h-14 bg-swachh-emerald rounded-full flex items-center justify-center shadow-lg border-4 border-white text-white transform transition-transform hover:scale-110 active:scale-95">
               <Camera size={28} />
            </div>
            <p className="text-[10px] font-bold text-swachh-emerald uppercase tracking-tighter mt-1">Report</p>
          </Link>
          <Link to="/profile" className={clsx("flex flex-col items-center gap-1 transition-colors", isProfile ? "text-swachh-emerald" : "text-gray-400")}>
             <User size={24} className={isProfile ? "fill-swachh-emerald/10" : ""} />
             <p className="text-[10px] font-bold uppercase tracking-tighter">Profile</p>
          </Link>
          <Link to="/settings" className={clsx("flex flex-col items-center gap-1 transition-colors", isSettings ? "text-swachh-emerald" : "text-gray-400")}>
             <Settings size={24} />
             <p className="text-[10px] font-bold uppercase tracking-tighter">Settings</p>
          </Link>
        </nav>
      )}
    </div>
  );
}

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
        <header className="bg-swachh-green text-white p-4 shadow-xl sticky top-0 z-50 rounded-b-[2.5rem] border-b-4 border-swachh-emerald/30 flex justify-center items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-2xl shadow-inner">
              <img src="/logo.png" alt="SwachhMap Logo" className="w-9 h-9 object-contain rounded-xl" />
            </div>
            <h1 className="text-2xl font-black font-sans tracking-tight drop-shadow-sm">SwachhMap</h1>
          </div>
        </header>
      );
    }
    
    if (isReport || isDetail) {
      return (
        <header className="bg-swachh-green text-white p-4 pt-6 shadow-md sticky top-0 z-50 flex items-center border-b border-white/5">
          <button onClick={() => navigate(-1)} className="mr-4 p-2 bg-white/10 rounded-full active:scale-95 transition-transform">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold font-sans tracking-tight">
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
        <header className="absolute top-4 left-4 right-4 z-[500] flex justify-between items-center bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-3xl p-3 border border-gray-100">
          <div className="flex items-center gap-2 px-1">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain rounded-full bg-white shadow-sm" />
            <h1 className="text-lg font-black text-gray-900 font-sans tracking-tight">SwachhMap</h1>
          </div>
          <Link to="/list" className="bg-swachh-green text-white px-5 py-2 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg hover:brightness-110 active:scale-95 transition-all">
             List View
          </Link>
        </header>
      );
    }
    
    if (isProfile || isSettings) {
       return (
        <header className="bg-swachh-green text-white p-4 pt-8 pb-5 shadow-lg sticky top-0 z-50 flex items-center border-b-2 border-swachh-emerald/20 rounded-b-3xl">
          <button onClick={() => navigate(-1)} className="mr-4 p-2.5 bg-white/15 hover:bg-white/25 rounded-2xl active:scale-90 transition-all shadow-sm">
            <ArrowLeft size={22} className="stroke-[3]" />
          </button>
          <h1 className="text-xl font-black font-sans tracking-tight drop-shadow-sm">
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
          <Link to="/report" className="flex flex-col items-center -mt-10 relative group">
            <div className="w-16 h-16 bg-swachh-green rounded-2xl flex items-center justify-center shadow-[0_12px_40px_rgba(6,78,59,0.4)] border-4 border-white dark:border-slate-800 text-white transform transition-all hover:scale-110 active:scale-90 z-20 hover:-rotate-3 translate-y-1">
               <Camera size={34} className="stroke-[2.5]" />
            </div>
            <p className="text-[10px] font-black text-swachh-green dark:text-swachh-emerald uppercase tracking-[0.1em] mt-2 group-hover:scale-110 transition-transform">Report</p>
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

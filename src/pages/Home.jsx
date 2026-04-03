import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';
import { api } from '../lib/mockFirebase';
import { FileText, CheckCircle, Clock } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, resolved: 0, pending: 0 });

  useEffect(() => {
    // Fetch stats
    api.getReports().then(reps => {
      setStats({
        total: reps.length,
        resolved: reps.filter(r => r.status === 'Resolved').length,
        pending: reps.filter(r => r.status === 'Pending').length
      });
    });
  }, []);

  return (
    <div className="flex flex-col flex-1 pb-6 bg-gray-50 h-full">
      {/* Top Banner with map background */}
      <div 
        className="relative bg-white py-12 px-6 shadow-sm border-b border-gray-100 flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: `url('https://api.maptiler.com/maps/basic-v2/256/0/0/0.png?key=get_your_own_OpIi9ZULNHzrESv6T2vL')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]"></div>
        
        <div className="relative z-10 w-full max-w-sm flex flex-col gap-5 pt-8">
          <h2 className="text-3xl font-bold font-sans text-gray-900 mb-2 tracking-tight">Report it. Map it. Fix it.</h2>
          <Button onClick={() => navigate('/report')}>
            Report an Issue
          </Button>
          <Button variant="outline" onClick={() => navigate('/map')}>
            View Map
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex-1 px-5 pt-6 flex flex-col gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
          <div className="bg-gray-50 p-3 rounded-lg"><FileText size={32} className="text-gray-800" /></div>
          <div>
            <h3 className="text-gray-600 font-medium">Total Reports</h3>
            <p className="text-3xl font-black font-sans">{stats.total}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
          <div className="bg-gray-50 p-3 rounded-lg"><CheckCircle size={32} className="text-gray-800" /></div>
          <div>
            <h3 className="text-gray-600 font-medium">Resolved</h3>
            <p className="text-3xl font-black font-sans">{stats.resolved}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
          <div className="bg-gray-50 p-3 rounded-lg"><Clock size={32} className="text-gray-800" /></div>
          <div>
            <h3 className="text-gray-600 font-medium">Pending</h3>
            <p className="text-3xl font-black font-sans">{stats.pending}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto px-6 py-6 text-center text-sm text-gray-500">
        <div className="flex justify-center gap-4 mb-2">
          <a href="#" className="hover:text-swachh-green">About</a>
          <a href="#" className="hover:text-swachh-green">Privacy</a>
        </div>
        <p>Copyright © All Rights reserved.</p>
      </div>
    </div>
  );
}

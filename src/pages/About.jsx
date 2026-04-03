import { Info, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 pb-20">
      <div className="bg-swachh-green text-white p-6 pt-8 pb-12 shadow-xl sticky top-0 z-50 rounded-b-[2.5rem]">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-xl active:scale-95 transition-transform">
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1 flex flex-col items-center -ml-8">
             <div className="bg-white/10 p-2 rounded-2xl flex items-center justify-center mb-1">
               <Info size={28} className="text-white" />
             </div>
             <h1 className="text-2xl font-black font-sans tracking-tight">About SwachhMap</h1>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6">
         <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex flex-col items-center text-center">
            <img src="/logo.png" className="w-16 h-16 rounded-2xl shadow-sm mb-4" alt="SwachhMap Logo" />
            <h2 className="text-xl font-black text-swachh-green mb-2">Empowering Clean Communities</h2>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              SwachhMap is a community-driven initiative leveraging modern AI and Geospatial technologies to democratize civic cleanliness. By empowering citizens to easily report and track local waste issues, we bridge the gap between people and municipal authorities.
            </p>

            <div className="bg-green-50 p-4 rounded-2xl w-full text-left border border-green-100">
               <h3 className="font-bold text-swachh-emerald mb-1">Our Mission</h3>
               <p className="text-xs text-gray-700">To create a transparent, rewarding ecosystem where every citizen becomes an active stakeholder in their community's hygiene and environmental health.</p>
            </div>

            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-8">Version 1.1.0 • Build 8822</p>
         </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { User, Award, History, TrendingUp, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../lib/mockFirebase';

export default function Profile() {
  const [stats, setStats] = useState({
    points: 120,
    reportsCount: 5,
    resolvedCount: 2
  });

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 pb-20">
      {/* Profile Header */}
      <div className="bg-swachh-green text-white p-8 pt-10 rounded-b-[3rem] shadow-lg flex flex-col items-center relative">
        <h1 className="text-xl font-black font-sans tracking-tight mb-8 drop-shadow-sm">My Profile</h1>
        <div className="w-24 h-24 bg-white rounded-full p-1 shadow-inner relative mb-4">
          <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
             <User size={48} className="text-gray-400" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-yellow-400 p-2 rounded-full border-4 border-swachh-green shadow-sm">
             <Award size={16} className="text-swachh-green" />
          </div>
        </div>
        <h2 className="text-2xl font-bold">Jayant Olhyan</h2>
        <p className="text-green-100 text-sm">Community Hero</p>
        
        <div className="mt-6 flex gap-8 w-full justify-center">
          <Link to="/shop" className="flex flex-col items-center hover:scale-105 active:scale-95 transition-transform bg-white/10 p-3 px-6 rounded-2xl border border-white/20 shadow-sm cursor-pointer">
            <span className="text-2xl font-black">{stats.points}</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-yellow-300 drop-shadow-sm">Shop Now</span>
          </Link>
          <div className="w-px h-10 bg-white/20 self-center"></div>
          <div className="flex flex-col items-center p-3 px-6">
            <span className="text-2xl font-black">{stats.reportsCount}</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-green-200">Reports</span>
          </div>
        </div>
      </div>

      {/* Experience Bar */}
      <div className="px-6 -mt-6">
        <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100">
           <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase">Level 4</span>
              <span className="text-xs font-bold text-swachh-emerald">120 / 200 XP</span>
           </div>
           <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-swachh-emerald rounded-full" style={{ width: '60%' }}></div>
           </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-6 grid grid-cols-2 gap-4">
         <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-2">
            <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center">
               <History size={18} />
            </div>
            <span className="text-xl font-bold text-gray-800">{stats.reportsCount}</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase">Total Reports</span>
         </div>
         <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-2">
            <div className="w-8 h-8 bg-green-50 text-green-500 rounded-lg flex items-center justify-center">
               <Award size={18} />
            </div>
            <span className="text-xl font-bold text-gray-800">{stats.resolvedCount}</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase">Resolved</span>
         </div>
      </div>

      {/* Action List */}
      <div className="px-6 flex flex-col gap-3">
         <h3 className="font-bold text-gray-800 text-sm ml-1">Account Activity</h3>
         <Link to="/leaderboard" className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer active:scale-95">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-purple-50 text-purple-500 rounded-xl">
                  <TrendingUp size={20} />
               </div>
               <span className="font-bold text-gray-700 text-sm">View Leaderboard</span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
         </Link>
      </div>
    </div>
  );
}

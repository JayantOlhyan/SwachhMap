import { useState, useEffect } from 'react';
import { Trophy, Medal, Star, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_LEADERBOARD = [
  { id: 1, name: 'Ankita Sharma', points: 1450, rank: 1, avatar: 'A' },
  { id: 2, name: 'Jayant Olhyan', points: 120, rank: 2, avatar: 'J', isCurrentUser: true },
  { id: 3, name: 'Rohan Verma', points: 110, rank: 3, avatar: 'R' },
  { id: 4, name: 'Priya Singh', points: 85, rank: 4, avatar: 'P' },
  { id: 5, name: 'Vikram Gupta', points: 50, rank: 5, avatar: 'V' }
];

export default function Leaderboard() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 pb-20">
      {/* Premium Header */}
      <div className="bg-swachh-green text-white p-6 pt-8 pb-12 shadow-xl sticky top-0 z-50 rounded-b-[2.5rem]">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-xl active:scale-95 transition-transform">
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1 flex flex-col items-center -ml-8">
             <div className="bg-yellow-400/20 p-2 rounded-2xl flex items-center justify-center mb-1">
               <Trophy size={28} className="text-yellow-400" />
             </div>
             <h1 className="text-2xl font-black font-sans tracking-tight">Leaderboard</h1>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6">
         <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex flex-col gap-4">
            {MOCK_LEADERBOARD.map((user) => (
               <div key={user.id} className={`flex items-center gap-4 p-3 rounded-2xl ${user.isCurrentUser ? 'bg-green-50 border-2 border-swachh-emerald/30 shadow-sm' : 'hover:bg-gray-50 transition-colors border border-transparent'}`}>
                  
                  {/* Rank Badge */}
                  <div className="w-8 flex justify-center font-black text-lg">
                    {user.rank === 1 ? <Medal size={28} className="text-yellow-500 drop-shadow-sm" /> 
                     : user.rank === 2 ? <Medal size={24} className="text-gray-400" /> 
                     : user.rank === 3 ? <Medal size={24} className="text-orange-400" /> 
                     : <span className="text-gray-400">{user.rank}</span>}
                  </div>

                  {/* Avatar Avatar */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-sm ${user.isCurrentUser ? 'bg-swachh-green' : 'bg-gray-300'}`}>
                    {user.avatar}
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                     <h3 className={`font-bold ${user.isCurrentUser ? 'text-swachh-green' : 'text-gray-800'}`}>
                       {user.name} 
                       {user.isCurrentUser && <span className="text-[10px] ml-2 uppercase bg-swachh-emerald text-white px-2 py-0.5 rounded-full">You</span>}
                     </h3>
                     <p className="text-xs font-semibold text-gray-500">{user.points} pts</p>
                  </div>
                  
                  <div className="text-yellow-400">
                    <Star size={16} className={user.rank <= 3 ? "fill-yellow-400" : ""} />
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}

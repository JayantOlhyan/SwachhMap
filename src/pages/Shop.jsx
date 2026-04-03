import { useState, useEffect } from 'react';
import { ShoppingBag, ArrowLeft, Ticket, Coffee, Activity, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/mockFirebase';

const REWARDS = [
  { id: 1, title: 'Metro Day Pass', pts: 50, icon: Ticket, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 2, title: 'Local Coffee', pts: 30, icon: Coffee, color: 'text-orange-500', bg: 'bg-orange-50' },
  { id: 3, title: 'Grocery Voucher (₹100)', pts: 100, icon: ShoppingBag, color: 'text-swachh-emerald', bg: 'bg-green-50' },
  { id: 4, title: 'Fitness Session', pts: 150, icon: Activity, color: 'text-purple-500', bg: 'bg-purple-50' }
];

export default function Shop() {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [loadingMap, setLoadingMap] = useState({});
  const [redeemed, setRedeemed] = useState([]);

  useEffect(() => {
    api.getUserPoints().then(p => setPoints(p));
  }, []);

  const handleRedeem = (reward) => {
    if (points >= reward.pts) {
      setLoadingMap(prev => ({ ...prev, [reward.id]: true }));
      setTimeout(() => {
        setPoints(points - reward.pts);
        setRedeemed(prev => [...prev, reward.id]);
        setLoadingMap(prev => ({ ...prev, [reward.id]: false }));
      }, 800);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 pb-24">
      {/* Premium Header */}
      <div className="bg-swachh-green text-white p-6 pt-8 pb-12 shadow-xl sticky top-0 z-50 rounded-b-[2.5rem]">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-2xl flex items-center justify-center">
            <ShoppingBag size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black font-sans tracking-tight">Rewards Shop</h1>
            <p className="text-sm text-green-100/80 font-medium tracking-wide">Spend your Swachh Points</p>
          </div>
        </div>
      </div>

      {/* Points Balance Card (Overlapping header) */}
      <div className="px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex items-center justify-between">
           <div>
             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Your Balance</p>
             <h2 className="text-4xl font-black text-gray-800">{points} <span className="text-base text-gray-400 font-bold">pts</span></h2>
           </div>
           <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center border-4 border-yellow-50 shadow-sm">
             <span className="text-2xl">🪙</span>
           </div>
        </div>
      </div>

      {/* Shop Items Grid */}
      <div className="p-6">
        <h3 className="font-bold text-gray-800 text-lg mb-4 ml-1">Available Rewards</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {REWARDS.map(reward => {
            const Icon = reward.icon;
            const canAfford = points >= reward.pts;
            const isRedeemed = redeemed.includes(reward.id);
            const isLoading = loadingMap[reward.id];

            return (
              <div key={reward.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col items-center text-center relative overflow-hidden transition-all hover:shadow-md">
                {/* Decorative blob */}
                <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-20 ${reward.bg}`}></div>
                
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${reward.bg} ${reward.color}`}>
                  <Icon size={24} />
                </div>
                
                <h4 className="font-bold text-gray-800 text-sm leading-tight mb-1">{reward.title}</h4>
                <p className="text-xs font-bold text-swachh-emerald bg-green-50 px-3 py-1 rounded-full mb-4">
                  {reward.pts} pts
                </p>

                {isRedeemed ? (
                  <button disabled className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-500 font-bold text-xs flex justify-center items-center gap-1">
                    <CheckCircle2 size={16} /> Redeemed
                  </button>
                ) : (
                  <button 
                    onClick={() => handleRedeem(reward)}
                    disabled={!canAfford || isLoading}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all active:scale-95 flex justify-center items-center h-[36px]
                      ${canAfford 
                        ? 'bg-swachh-green text-white shadow-md hover:bg-emerald-900' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                  >
                    {isLoading ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      'Redeem'
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

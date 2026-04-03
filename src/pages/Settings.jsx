import { Bell, Shield, Moon, Fingerprint, LogOut, ChevronRight, HelpCircle, Info } from 'lucide-react';

export default function Settings() {
  const settingsOptions = [
    { icon: <Bell size={20} />, label: 'Notifications', color: 'bg-blue-50 text-blue-500' },
    { icon: <Shield size={20} />, label: 'Privacy & Security', color: 'bg-green-50 text-green-500' },
    { icon: <Moon size={20} />, label: 'Dark Mode', color: 'bg-indigo-50 text-indigo-500', toggle: true },
    { icon: <Fingerprint size={20} />, label: 'Biometric Access', color: 'bg-purple-50 text-purple-500' },
    { icon: <HelpCircle size={20} />, label: 'Help & Support', color: 'bg-orange-50 text-orange-500' },
    { icon: <Info size={20} />, label: 'About SwachhMap', color: 'bg-gray-100 text-gray-600' }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 pb-20 p-6">
      <div className="flex flex-col gap-4">
        {settingsOptions.map((option, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between transition-transform active:scale-[0.98]">
             <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl ${option.color}`}>
                   {option.icon}
                </div>
                <span className="font-bold text-gray-700 text-sm">{option.label}</span>
             </div>
             {option.toggle ? (
                <div className="w-10 h-6 bg-gray-200 rounded-full relative">
                   <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
             ) : (
                <ChevronRight size={18} className="text-gray-300" />
             )}
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
         <button className="w-full bg-red-50 text-red-500 p-4 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-sm active:scale-95 transition-transform">
            <LogOut size={20} />
            <span>Sign Out</span>
         </button>
      </div>

      <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-10">
         SwachhMap v1.0.4 • Build 8821
      </p>
    </div>
  );
}

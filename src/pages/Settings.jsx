import { useState, useEffect } from 'react';
import { Bell, Shield, Moon, Sun, Fingerprint, LogOut, ChevronRight, HelpCircle, Info, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

export default function Settings() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains('dark')
  );
  const [biometric, setBiometric] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleOptionClick = (label) => {
    if (label === 'Dark Mode') {
      setDarkMode(!darkMode);
      return;
    }
    if (label === 'Biometric Access') {
      setBiometric(!biometric);
      return;
    }
    if (label === 'Privacy & Security') {
      navigate('/settings/privacy');
      return;
    }
    if (label === 'About SwachhMap') {
      navigate('/settings/about');
      return;
    }
    
    setFeedback(`${label} settings updated!`);
    setTimeout(() => setFeedback(null), 3000);
  };

  const settingsOptions = [
    { icon: <Bell size={20} />, label: 'Notifications', color: 'bg-blue-50 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400' },
    { icon: <Shield size={20} />, label: 'Privacy & Security', color: 'bg-green-50 text-green-500 dark:bg-green-500/10 dark:text-green-400' },
    { 
      icon: darkMode ? <Sun size={20} /> : <Moon size={20} />, 
      label: 'Dark Mode', 
      color: 'bg-indigo-50 text-indigo-500 dark:bg-indigo-500/10 dark:text-indigo-400',
      isToggle: true,
      toggleState: darkMode
    },
    { 
      icon: <Fingerprint size={20} />, 
      label: 'Biometric Access', 
      color: 'bg-purple-50 text-purple-500 dark:bg-purple-500/10 dark:text-purple-400',
      isToggle: true,
      toggleState: biometric
    },
    { icon: <HelpCircle size={20} />, label: 'Help & Support', color: 'bg-orange-50 text-orange-500 dark:bg-orange-500/10 dark:text-orange-400' },
    { icon: <Info size={20} />, label: 'About SwachhMap', color: 'bg-gray-100 text-gray-600 dark:bg-gray-500/10 dark:text-gray-400' }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-slate-900 pb-20 p-6 transition-colors duration-300 relative">
      {feedback && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-swachh-green text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle size={20} className="text-swachh-emerald" />
          <span className="font-bold text-sm">{feedback}</span>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {settingsOptions.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionClick(option.label)}
            className="w-full bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700/50 flex items-center justify-between transition-all active:scale-[0.98] hover:border-swachh-emerald/30 group"
          >
             <div className="flex items-center gap-4">
                <div className={clsx("p-2 rounded-xl transition-colors", option.color)}>
                   {option.icon}
                </div>
                <span className="font-bold text-gray-700 dark:text-slate-200 text-sm">{option.label}</span>
             </div>
             {option.isToggle ? (
                <div className={clsx(
                  "w-12 h-6 rounded-full relative transition-colors duration-300",
                  option.toggleState ? "bg-swachh-emerald" : "bg-gray-200 dark:bg-slate-700"
                )}>
                   <div className={clsx(
                     "absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300",
                     option.toggleState ? "left-7" : "left-1"
                   )}></div>
                </div>
             ) : (
                <ChevronRight size={18} className="text-gray-300 dark:text-slate-600 group-hover:text-swachh-emerald transition-colors" />
             )}
          </button>
        ))}
      </div>

      <div className="mt-8 border-t border-gray-200 dark:border-slate-800 pt-6">
         <button 
           onClick={() => {
             setFeedback('Signing out...');
             setTimeout(() => setFeedback(null), 2000);
           }}
           className="w-full bg-red-50 dark:bg-red-500/10 text-red-500 p-4 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-sm active:scale-95 transition-all hover:bg-red-100 dark:hover:bg-red-500/20"
         >
            <LogOut size={20} />
            <span>Sign Out</span>
         </button>
      </div>

      <p className="text-center text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-10">
         SwachhMap v1.0.4 • Build 8821
      </p>
    </div>
  );
}

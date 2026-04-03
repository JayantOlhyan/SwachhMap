import { Shield, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Privacy() {
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
               <Shield size={28} className="text-white" />
             </div>
             <h1 className="text-2xl font-black font-sans tracking-tight">Privacy & Security</h1>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6">
         <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 prose prose-sm text-gray-600">
            <h2 className="text-gray-900 font-bold text-lg mb-2">1. Data Collection</h2>
            <p className="mb-4">We collect location data only when you actively submit a report to identify the problem area. Your biometric data is stored locally on your device and never transmitted to our servers.</p>
            
            <h2 className="text-gray-900 font-bold text-lg mb-2">2. How we use your data</h2>
            <p className="mb-4">Your reports images metadata are used to train AI models for verifying cleanup success automatically. We anonmyize your identity for public reports.</p>

            <h2 className="text-gray-900 font-bold text-lg mb-2">3. Security</h2>
            <p>SwachhMap utilizes end-to-end encryption for your profile information. Our servers are hosted on secure, compliant infrastructure ensuring your contribution data remains safe.</p>
         </div>
      </div>
    </div>
  );
}

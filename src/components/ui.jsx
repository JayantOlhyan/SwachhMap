import React from 'react';
import { clsx } from 'clsx';
import { MapPin } from 'lucide-react';

export function Button({ children, variant = 'primary', className, ...props }) {
  const baseStyle = "w-full py-3 px-4 rounded-full font-semibold text-lg transition-all duration-200 focus:outline-none flex justify-center items-center gap-2";
  const variants = {
    primary: "bg-swachh-emerald hover:bg-green-600 text-white shadow-lg",
    outline: "bg-white border-2 border-swachh-green text-swachh-green hover:bg-green-50 shadow-sm",
  };

  return (
    <button className={clsx(baseStyle, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function StatusBadge({ status }) {
  const isResolved = status === 'Resolved';
  return (
    <span className={clsx(
      "px-3 py-1 rounded-full text-xs font-bold",
      isResolved ? "bg-swachh-green text-white" : "bg-red-500 text-white"
    )}>
      {status}
    </span>
  );
}

export function ReportCard({ report, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 mb-4 cursor-pointer hover:shadow-md transition-shadow flex gap-4"
    >
      <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded-xl overflow-hidden">
        <img 
          src={report.images.before} 
          alt={report.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-bold text-gray-900 truncate text-lg">{report.title}</h3>
          <StatusBadge status={report.status} />
        </div>
        <p className="text-gray-500 text-sm flex items-center gap-1 mb-2 truncate">
          <MapPin size={14} /> {report.location.address}
        </p>
        <p className="text-gray-700 text-sm line-clamp-2 leading-snug">
          {report.description}
        </p>
      </div>
    </div>
  );
}

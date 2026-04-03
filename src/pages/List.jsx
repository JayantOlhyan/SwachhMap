import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/mockFirebase';
import { ReportCard } from '../components/ui';
import { clsx } from 'clsx';

export default function List() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState('All'); // All, Pending, Resolved

  useEffect(() => {
    api.getReports().then(reps => {
      setReports(reps);
    });
  }, []);

  const filteredReports = reports.filter(r => {
    if (filter === 'All') return true;
    return r.status === filter;
  });

  return (
    <div className="flex-1 flex flex-col pt-4 px-4 bg-gray-50 h-full overflow-hidden">
      {/* Filter Tabs */}
      <div className="flex gap-3 mb-6 bg-white p-1 rounded-full shadow-sm border border-gray-100">
        {['All', 'Pending', 'Resolved'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={clsx(
              "flex-1 py-2 text-sm font-semibold rounded-full transition-colors",
              filter === tab 
                ? "bg-swachh-green text-white shadow-sm" 
                : "text-gray-500 hover:bg-gray-50 border border-transparent hover:border-gray-200"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
        {filteredReports.map(report => (
          <ReportCard 
            key={report.id} 
            report={report} 
            onClick={() => navigate(`/report/${report.id}`)}
          />
        ))}

        {filteredReports.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No reports found.
          </div>
        )}
      </div>
    </div>
  );
}

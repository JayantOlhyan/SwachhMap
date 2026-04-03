import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../lib/mockFirebase';
import { StatusBadge, Button } from '../components/ui';
import { MapPin, Navigation, Clock, Upload, ArrowRight } from 'lucide-react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { formatDistanceToNow } from 'date-fns';

export default function ReportDetail() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resolving, setResolving] = useState(false);

  useEffect(() => {
    api.getReportById(id).then(rep => {
      setReport(rep);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="p-10 text-center text-gray-500">Loading...</div>;
  if (!report) return <div className="p-10 text-center text-gray-500">Report not found</div>;

  const handleResolve = async () => {
    setResolving(true);
    // Simulate image upload returning a new URL
    const afterImg = "https://images.unsplash.com/photo-1584824486516-0555a07fc511?auto=format&fit=crop&w=800&q=80"; // Clean street mock
    
    const updated = await api.resolveReport(report.id, afterImg);
    setReport(updated);
    setResolving(false);
  };

  const getPriorityColor = (p) => {
    switch(p) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-orange-600 bg-orange-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 font-sans pb-10">
      {/* Before / After Gallery */}
      <div className="relative h-64 bg-gray-200">
        {!report.images.after ? (
          <img src={report.images.before} alt="Before" className="w-full h-full object-cover" />
        ) : (
          <div className="flex h-full w-full">
            <div className="w-1/2 relative border-r-2 border-white">
              <img src={report.images.before} alt="Before" className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 text-xs font-bold rounded">BEFORE</div>
            </div>
            <div className="w-1/2 relative">
              <img src={report.images.after} alt="After" className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-swachh-green text-white px-2 py-1 text-xs font-bold rounded">AFTER</div>
            </div>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col gap-5">
        
        {/* Header Info */}
        <div>
          <div className="flex justify-between items-start gap-2 mb-2">
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">{report.title}</h2>
            <StatusBadge status={report.status} />
          </div>
          
          <div className="flex items-center gap-3 text-sm font-medium text-gray-500 mb-2">
            <span className={`px-2 py-0.5 rounded ${getPriorityColor(report.priority)}`}>
              {report.priority} Priority
            </span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock size={14}/> {formatDistanceToNow(new Date(report.createdAt), {addSuffix: true})}</span>
          </div>

          <p className="text-gray-700 leading-relaxed text-sm">{report.description}</p>
        </div>

        {/* Location Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h3 className="font-bold text-gray-900 mb-3 text-sm">Location</h3>
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <MapPin size={18} className="text-swachh-green" /> 
              {report.location.address}
            </p>
            <a 
              href={`https://www.google.com/maps/dir/?api=1&destination=${report.location.lat},${report.location.lng}`}
              target="_blank"
              rel="noreferrer"
              className="bg-green-50 text-swachh-green p-2 rounded-full"
            >
              <Navigation size={18} />
            </a>
          </div>
          <div className="h-32 rounded-lg overflow-hidden border border-gray-200">
            <MapContainer 
              center={[report.location.lat, report.location.lng]} 
              zoom={15} 
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
              dragging={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[report.location.lat, report.location.lng]} />
            </MapContainer>
          </div>
        </div>

        {/* Action Section */}
        {report.status === 'Pending' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mt-2">
            <h3 className="font-bold text-gray-900 mb-2 text-sm text-center">Resolve this Issue</h3>
            <p className="text-xs text-gray-500 text-center mb-4">Upload an 'After' photo showing the area is cleaned to mark it as resolved.</p>
            
            <Button onClick={handleResolve} disabled={resolving} className="flex justify-center items-center gap-2">
              <Upload size={18} /> {resolving ? 'Uploading...' : 'Upload "After" Photo'}
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}

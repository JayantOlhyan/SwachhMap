import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { api } from '../lib/mockFirebase';
import { StatusBadge } from '../components/ui';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom icons based on status
const createIcon = (color) => {
  return L.divIcon({
    className: 'custom-pin',
    html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-width="2">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
           </svg>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  });
};

const redIcon = createIcon('#EF4444');   // Pending
const greenIcon = createIcon('#10B981'); // Resolved

export default function MapView() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    api.getReports().then(reps => {
      setReports(reps);
    });
  }, []);

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={[28.6139, 77.2090]} // Delhi coordinates as base
        zoom={12} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap'
        />
        
        {reports.map((report) => (
          <Marker 
            key={report.id} 
            position={[report.location.lat, report.location.lng]}
            icon={report.status === 'Pending' ? redIcon : greenIcon}
          >
            <Popup className="swachhmap-popup">
               <div className="p-1 min-w-[200px]">
                 <img 
                    src={report.images.before} 
                    alt="Issue" 
                    className="w-full h-24 object-cover rounded-lg mb-2" 
                  />
                  <h3 className="font-bold text-gray-900 text-base leading-tight mb-1">{report.title}</h3>
                  <p className="text-xs text-gray-500 mb-2 truncate">{report.location.address}</p>
                  <StatusBadge status={report.status} />
               </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[400] bg-white px-4 py-2 rounded-full shadow-lg flex gap-4 text-sm font-semibold">
         <div className="flex items-center gap-1">
           <div className="w-3 h-3 rounded-full bg-red-500"></div> Pending
         </div>
         <div className="flex items-center gap-1">
           <div className="w-3 h-3 rounded-full bg-swachh-emerald"></div> Resolved
         </div>
      </div>
    </div>
  );
}

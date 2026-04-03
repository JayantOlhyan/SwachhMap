import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';
import { api } from '../lib/mockFirebase';
import { Upload, Map as MapIcon, ChevronDown } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon issue in React
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function LocationPicker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

export default function Report() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    address: ''
  });
  const [position, setPosition] = useState(null); // {lat, lng}
  // Mock image handling
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!position || !formData.category || !formData.description) {
      alert("Please fill all required fields, including location on map");
      return;
    }

    setLoading(true);
    const reportData = {
      title: formData.title || formData.category + ' Issue',
      description: formData.description,
      category: formData.category,
      location: { 
        lat: position.lat, 
        lng: position.lng, 
        address: formData.address || 'User Selected Location' 
      },
      images: {
        before: 'https://images.unsplash.com/photo-1595278069441-2f29f761a289?auto=format&fit=crop&w=800&q=80', // default mock photo
        after: null
      }
    };

    await api.submitReport(reportData);
    setLoading(false);
    navigate('/list');
  };

  return (
    <div className="flex-1 overflow-y-auto pb-10 bg-gray-50 font-sans">
      <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-6">
        
        {/* Image Upload Box */}
        <div 
          className="border-2 border-dashed border-swachh-green rounded-2xl p-6 bg-green-50 flex flex-col items-center justify-center text-center cursor-pointer transition-colors hover:bg-green-100"
          onClick={() => setImageUploaded(true)}
        >
          {imageUploaded ? (
            <div className="text-swachh-green font-bold flex flex-col items-center">
              <Upload size={32} className="mb-2" />
              Image Selected!
            </div>
          ) : (
            <>
              <Upload size={32} className="text-swachh-green mb-2" />
              <p className="font-bold text-gray-800">Upload Image</p>
              <p className="text-sm text-gray-500 mt-1">Take a photo or choose from gallery</p>
            </>
          )}
        </div>

        {/* Map Picker */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-800 text-sm">Mark Location on Map</label>
          <div className="h-48 w-full rounded-xl overflow-hidden border border-gray-200 shadow-inner z-0 relative">
            <MapContainer 
              center={[28.6139, 77.2090]} // default Delhi
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap'
              />
              <LocationPicker position={position} setPosition={setPosition} />
            </MapContainer>
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-800 text-sm">Manual Address (Optional)</label>
          <input 
            type="text" 
            placeholder="Enter address or landmark" 
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-swachh-green"
            value={formData.address}
            onChange={e => setFormData({...formData, address: e.target.value})}
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-800 text-sm">Category</label>
          <div className="relative">
            <select 
              className="w-full border border-gray-300 rounded-lg p-3 text-sm appearance-none bg-white focus:outline-swachh-green"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
              required
            >
              <option value="" disabled>Select Category</option>
              <option value="Garbage">Garbage</option>
              <option value="Sewage">Sewage</option>
              <option value="Illegal Dumping">Illegal Dumping</option>
              <option value="Pothole">Pothole</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-500 pointer-events-none" size={20} />
          </div>
        </div>

         {/* Description */}
         <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-800 text-sm">Description</label>
          <textarea 
            placeholder="Provide more details about the issue..." 
            className="w-full border border-gray-300 rounded-lg p-3 text-sm h-24 resize-none focus:outline-swachh-green"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            required
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Report'}
        </Button>
      </form>
    </div>
  );
}

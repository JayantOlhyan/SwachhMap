import { v4 as uuidv4 } from 'uuid';

// Mock Initial Data
let reports = [
  {
    id: '1',
    title: 'Overflowing Bin',
    description: 'Large pile, blocking walkway. Reported 2d ago.',
    category: 'Garbage',
    priority: 'Medium',
    status: 'Pending',
    location: { lat: 28.6328, lng: 77.2197, address: 'Gole Market, New Delhi' },
    images: {
      before: 'https://images.unsplash.com/photo-1595278069441-2f29f761a289?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      after: null
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    resolvedAt: null
  },
  {
    id: '2',
    title: 'E-Waste on Pavement',
    description: 'Old TVs and cables. Near park entrance.',
    category: 'Illegal Dumping',
    priority: 'Medium',
    status: 'Resolved',
    location: { lat: 28.5677, lng: 77.2433, address: 'Lajpat Nagar II, Delhi' },
    images: {
      before: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      after: 'https://images.unsplash.com/photo-1510506026173-149f1db13c9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    resolvedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    title: 'Sewage Leak',
    description: 'Nala overflowing. Needs immediate attention.',
    category: 'Sewage',
    priority: 'High',
    status: 'Pending',
    location: { lat: 28.6448, lng: 77.1670, address: 'South Patel Nagar, Delhi' },
    images: {
      before: 'https://images.unsplash.com/photo-1516024106209-661ece4b914a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      after: null
    },
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    resolvedAt: null
  }
];

let userData = {
  points: 120,
};

// Utilities for smart priority
const calculatePriority = (description) => {
  const desc = description.toLowerCase();
  if (desc.includes('hospital') || desc.includes('market') || desc.includes('child')) {
    return 'High';
  }
  if (desc.includes('street') || desc.includes('sewage')) {
    return 'Medium';
  }
  return 'Low';
};

export const api = {
  getReports: async () => {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 500));
    return [...reports].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  
  getReportById: async (id) => {
    await new Promise(r => setTimeout(r, 300));
    return reports.find(r => r.id === id);
  },

  submitReport: async (reportData) => {
    await new Promise(r => setTimeout(r, 800));
    
    const newReport = {
      id: uuidv4(),
      ...reportData,
      priority: calculatePriority(reportData.description),
      status: 'Pending',
      createdAt: new Date().toISOString(),
      resolvedAt: null
    };
    
    reports.unshift(newReport);
    userData.points += 10; // +10 points for reporting
    
    return newReport;
  },

  resolveReport: async (id, afterImageUrl) => {
    await new Promise(r => setTimeout(r, 800));
    
    reports = reports.map(r => {
      if (r.id === id) {
        return {
          ...r,
          status: 'Resolved',
          images: { ...r.images, after: afterImageUrl },
          resolvedAt: new Date().toISOString()
        };
      }
      return r;
    });

    userData.points += 50; // +50 points for resolving
    
    return reports.find(r => r.id === id);
  },

  getUserPoints: async () => {
    return userData.points;
  }
};

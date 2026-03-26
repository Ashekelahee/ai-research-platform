/**
 * Mock data service - simulates database with in-memory data
 * No dedicated database required
 */

export interface Lab {
  id: number;
  name: string;
  department: string;
  description: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  researchFields: string[];
  services: string[];
  facilities: string[]; // List of available facilities
  rooms: string[]; // Available rooms/spaces
  accessLevel: 'public' | 'restricted' | 'staffOnly' | 'contractOnly'; // Access restrictions
  agreementRequired: boolean; // Whether agreement is needed
  impactScore: string;
  publicationsCount: number;
  imageUrl: string;
  departmentColor?: string; // Hex color for department
  departmentColorLight?: string; // Light variant
  backgroundGradient?: string; // Soft gradient background
}

export interface Researcher {
  id: number;
  labId: number;
  name: string;
  title: string;
  expertise: string[];
  email: string;
  phone: string;
  bio: string;
  publicationsCount: number;
  citationCount: number;
  impactScore: string;
  imageUrl: string;
  availableForCollaboration: boolean;
}

export interface Equipment {
  id: number;
  labId: number;
  name: string;
  category: string;
  description: string;
  capabilities: string[];
  specifications: Record<string, string>;
  manufacturer: string;
  model: string;
  yearAcquired: number;
  available: boolean;
  bookingStatus: "available" | "booked" | "maintenance";
  requiresTraining: boolean; // Whether training is required to use
  restricted: boolean; // Whether access is restricted
  costType: 'free' | 'hourly' | 'project_based' | 'negotiable'; // Cost structure
  imageUrl: string;
}

export interface CollaborationRequest {
  id: number;
  requesterName: string;
  requesterEmail: string;
  requesterCompany?: string;
  requesterPhone?: string;
  labId?: number;
  researcherId?: number;
  equipmentId?: number;
  collaborationType: "contract_research" | "joint_project" | "pilot_testing" | "consultation";
  projectType: string; // Type of project being proposed
  ndaRequired: boolean; // Whether NDA is required
  customAgreement: boolean; // Whether custom agreement is needed
  description: string;
  budget?: string;
  timeline?: string;
  status: "pending" | "reviewed" | "needInfo" | "accepted" | "rejected" | "completed";
  createdAt: Date;
}

// Mock Labs Data
export const mockLabs: Lab[] = [
  {
    id: 1,
    name: "Photonics Laboratory",
    department: "Faculty of Science and Forestry",
    description:
      "Advanced photonics research facility specializing in laser technology, optical materials, and quantum photonics. Equipped with state-of-the-art laser systems and optical measurement equipment.",
    location: "Joensuu Campus, Building A",
    contactEmail: "photonics@uef.fi",
    contactPhone: "+358 50 123 4567",
    website: "https://www.uef.fi/photonics",
    researchFields: ["Photonics", "Laser Technology", "Optical Materials", "Quantum Physics"],
    services: [
      "Laser material processing",
      "Optical characterization",
      "Photonic device fabrication",
      "Consultation",
    ],
    impactScore: "8.5",
    publicationsCount: 156,
    imageUrl: "https://via.placeholder.com/400x300?text=Photonics+Lab",
    facilities: ["Laser laboratory", "Optical measurement room", "Fabrication workshop"],
    rooms: ["Main lab", "Measurement room", "Storage"],
    accessLevel: 'restricted',
    agreementRequired: true,
    departmentColor: "#6366f1",
    departmentColorLight: "#e0e7ff",
    backgroundGradient: "linear-gradient(135deg, #e0e7ff 0%, #f5f3ff 50%, #faf5ff 100%)",
  },
  {
    id: 2,
    name: "Chemistry Analysis Laboratory",
    department: "Faculty of Science and Forestry",
    description:
      "Comprehensive chemical analysis facility with advanced instrumentation for material characterization, environmental analysis, and quality control testing.",
    location: "Joensuu Campus, Building B",
    contactEmail: "chemistry@uef.fi",
    contactPhone: "+358 50 234 5678",
    website: "https://www.uef.fi/chemistry",
    researchFields: ["Chemistry", "Materials Science", "Environmental Analysis", "Analytical Chemistry"],
    services: [
      "ICP-MS analysis",
      "Spectroscopy",
      "Chromatography",
      "Material testing",
      "Environmental monitoring",
    ],
    impactScore: "8.2",
    publicationsCount: 203,
    imageUrl: "https://via.placeholder.com/400x300?text=Chemistry+Lab",
    facilities: ["Analysis laboratory", "Instrument room", "Sample preparation area"],
    rooms: ["Main lab", "Instrument room", "Office"],
    accessLevel: 'contractOnly',
    agreementRequired: true,
    departmentColor: "#f97316",
    departmentColorLight: "#fed7aa",
    backgroundGradient: "linear-gradient(135deg, #fed7aa 0%, #fef3c7 50%, #fffbeb 100%)",
  },
  {
    id: 3,
    name: "Forestry Research Center",
    department: "Faculty of Science and Forestry",
    description:
      "Leading facility for forest science research, wood material testing, and sustainable forestry practices. Specializes in wood durability, biomass conversion, and forest ecology.",
    location: "Joensuu Campus, Building C",
    contactEmail: "forestry@uef.fi",
    contactPhone: "+358 50 345 6789",
    website: "https://www.uef.fi/forestry",
    researchFields: ["Forestry", "Wood Science", "Biomass", "Environmental Science", "Sustainability"],
    services: [
      "Wood durability testing",
      "Biomass analysis",
      "Forest monitoring",
      "Sustainability consulting",
    ],
    impactScore: "8.8",
    publicationsCount: 189,
    imageUrl: "https://via.placeholder.com/400x300?text=Forestry+Lab",
    facilities: ["Testing laboratory", "Wood processing area", "Biomass analysis lab"],
    rooms: ["Main lab", "Testing chamber", "Storage"],
    accessLevel: 'public',
    agreementRequired: false,
    departmentColor: "#22c55e",
    departmentColorLight: "#dcfce7",
    backgroundGradient: "linear-gradient(135deg, #dcfce7 0%, #f0fdf4 50%, #f8fdf5 100%)",
  },
  {
    id: 4,
    name: "XR and Simulation Laboratory",
    department: "Faculty of Technology",
    description:
      "Cutting-edge facility for extended reality (XR), virtual reality (VR), and simulation technologies. Supports research in immersive technologies, digital twin development, and interactive systems.",
    location: "Joensuu Campus, Building D",
    contactEmail: "xr-lab@uef.fi",
    contactPhone: "+358 50 456 7890",
    website: "https://www.uef.fi/xr-lab",
    researchFields: ["Virtual Reality", "Augmented Reality", "Simulation", "Digital Technologies"],
    services: [
      "VR/AR application development",
      "Digital twin creation",
      "Simulation modeling",
      "User experience testing",
    ],
    impactScore: "8.0",
    publicationsCount: 127,
    imageUrl: "https://via.placeholder.com/400x300?text=XR+Lab",
    facilities: ["VR studio", "Motion capture room", "Simulation lab"],
    rooms: ["VR studio", "Motion capture", "Control room"],
    accessLevel: 'restricted',
    agreementRequired: true,
    departmentColor: "#a855f7",
    departmentColorLight: "#f3e8ff",
    backgroundGradient: "linear-gradient(135deg, #f3e8ff 0%, #faf5ff 50%, #fdfbff 100%)",
  },
  {
    id: 5,
    name: "Natural Resources Research Institute",
    department: "Faculty of Science and Forestry",
    description:
      "Multidisciplinary research center focused on sustainable management of natural resources, including water quality analysis, soil science, and ecosystem monitoring.",
    location: "Joensuu Campus, Building E",
    contactEmail: "natural-resources@uef.fi",
    contactPhone: "+358 50 567 8901",
    website: "https://www.uef.fi/natural-resources",
    researchFields: ["Environmental Science", "Water Quality", "Soil Science", "Ecology"],
    services: [
      "Water testing",
      "Soil analysis",
      "Ecosystem monitoring",
      "Environmental consulting",
    ],
    impactScore: "7.9",
    publicationsCount: 142,
    imageUrl: "https://via.placeholder.com/400x300?text=Natural+Resources",
    facilities: ["Field lab", "Water analysis lab", "Monitoring station"],
    rooms: ["Main lab", "Analysis room", "Equipment storage"],
    accessLevel: 'public',
    agreementRequired: false,
    departmentColor: "#06b6d4",
    departmentColorLight: "#cffafe",
    backgroundGradient: "linear-gradient(135deg, #cffafe 0%, #ecfdf5 50%, #f0fdfa 100%)",
  },
];

// Mock Researchers Data
export const mockResearchers: Researcher[] = [
  {
    id: 1,
    labId: 1,
    name: "Dr. Mikko Virtanen",
    title: "Senior Researcher, Photonics",
    expertise: ["Laser Technology", "Optical Materials", "Quantum Photonics"],
    email: "mikko.virtanen@uef.fi",
    phone: "+358 50 111 2222",
    bio: "20+ years of experience in photonics research and industrial applications. Published over 80 peer-reviewed articles.",
    publicationsCount: 87,
    citationCount: 1240,
    impactScore: "9.2",
    imageUrl: "https://via.placeholder.com/200x200?text=Dr.+Virtanen",
    availableForCollaboration: true,
  },
  {
    id: 2,
    labId: 2,
    name: "Dr. Liisa Mäki",
    title: "Principal Investigator, Chemistry",
    expertise: ["Analytical Chemistry", "Materials Analysis", "Environmental Testing"],
    email: "liisa.maki@uef.fi",
    phone: "+358 50 222 3333",
    bio: "Specializes in advanced analytical techniques and environmental chemistry. Leads multiple industrial collaboration projects.",
    publicationsCount: 124,
    citationCount: 2156,
    impactScore: "9.5",
    imageUrl: "https://via.placeholder.com/200x200?text=Dr.+Mäki",
    availableForCollaboration: true,
  },
  {
    id: 3,
    labId: 3,
    name: "Prof. Jari Korhonen",
    title: "Professor, Forest Science",
    expertise: ["Wood Science", "Biomass", "Sustainable Forestry"],
    email: "jari.korhonen@uef.fi",
    phone: "+358 50 333 4444",
    bio: "Leading expert in wood durability and sustainable forest management. Collaborates with major forest industry companies.",
    publicationsCount: 156,
    citationCount: 3421,
    impactScore: "9.8",
    imageUrl: "https://via.placeholder.com/200x200?text=Prof.+Korhonen",
    availableForCollaboration: true,
  },
  {
    id: 4,
    labId: 4,
    name: "Dr. Anna Salo",
    title: "Researcher, XR Technologies",
    expertise: ["Virtual Reality", "User Experience", "Digital Interaction"],
    email: "anna.salo@uef.fi",
    phone: "+358 50 444 5555",
    bio: "Focuses on immersive technologies and human-computer interaction. Active in VR/AR application development.",
    publicationsCount: 67,
    citationCount: 892,
    impactScore: "8.1",
    imageUrl: "https://via.placeholder.com/200x200?text=Dr.+Salo",
    availableForCollaboration: true,
  },
];

// Mock Equipment Data
export const mockEquipment: Equipment[] = [
  {
    id: 1,
    labId: 1,
    name: "High-Power Fiber Laser",
    category: "Laser Systems",
    description: "1000W fiber laser for material processing and research applications",
    capabilities: ["Material cutting", "Welding", "Engraving", "Surface treatment"],
    specifications: {
      power: "1000W",
      wavelength: "1064nm",
      beam_quality: "M² < 1.3",
      cooling: "Water-cooled",
    },
    manufacturer: "IPG Photonics",
    model: "YLS-1000",    yearAcquired: 2023,
    available: false,
    bookingStatus: "booked",
    requiresTraining: true,
    restricted: true,
    costType: 'negotiable',
    imageUrl: "https://via.placeholder.com/300x200?text=Motion+Capture",
  },
  {
    id: 2,
    labId: 2,
    name: "ICP-MS Spectrometer",
    category: "Analytical Equipment",
    description: "Inductively Coupled Plasma Mass Spectrometer for elemental analysis",
    capabilities: [
      "Trace element detection",
      "Multi-element analysis",
      "Isotope ratio measurement",
    ],
    specifications: {
      detection_limit: "ppt level",
      mass_range: "7-238 amu",
      sample_types: "Liquid, solid, gas",
    },
    manufacturer: "Thermo Fisher",
    model: "iCAP RQ",
    yearAcquired: 2022,
    available: true,
    bookingStatus: "available",
    requiresTraining: true,
    restricted: true,
    costType: 'project_based',
    imageUrl: "https://via.placeholder.com/300x200?text=ICP-MS",
  },
  {
    id: 3,
    labId: 3,
    name: "Wood Durability Testing Chamber",
    category: "Testing Equipment",
    description: "Environmental chamber for accelerated wood durability and weathering tests",
    capabilities: ["UV exposure", "Moisture cycling", "Temperature cycling", "Fungal resistance"],
    specifications: {
      temperature_range: "-20 to 70°C",
      humidity_range: "30-95% RH",
      chamber_size: "2m × 1.5m × 1.5m",
    },
    manufacturer: "Binder",
    model: "KBF 720",
    yearAcquired: 2020,
    available: true,
    bookingStatus: "available",
    requiresTraining: false,
    restricted: false,
    costType: 'hourly',
    imageUrl: "https://via.placeholder.com/300x200?text=Durability+Chamber",
  },
  {
    id: 4,
    labId: 4,
    name: "VR Motion Capture System",
    category: "XR Equipment",
    description: "Professional motion capture system with 16 cameras for full-body tracking",
    capabilities: ["Full-body tracking", "Real-time capture", "Multi-person support"],
    specifications: {
      cameras: "16 × Vicon Vantage",
      capture_volume: "10m × 8m × 3m",
      frame_rate: "200 fps",
    },
    manufacturer: "Vicon",
    model: "Vantage",
    yearAcquired: 2023,
    available: true,
    bookingStatus: "available",
    requiresTraining: true,
    restricted: false,
    costType: 'hourly',
    imageUrl: "https://via.placeholder.com/300x200?text=Fiber+Laser",
  },
  {
    id: 5,
    labId: 5,
    name: "Water Quality Analysis Kit",
    category: "Environmental Testing",
    description: "Comprehensive water quality testing equipment for environmental monitoring",
    capabilities: ["pH measurement", "Conductivity", "Dissolved oxygen", "Nutrient analysis"],
    specifications: {
      parameters: "20+ water quality parameters",
      accuracy: "±2% for most parameters",
      portability: "Field-portable",
    },
    manufacturer: "YSI",
    model: "ProDSS",
    yearAcquired: 2021,
    available: true,
    bookingStatus: "available",
    requiresTraining: false,
    restricted: false,
    costType: 'free',
    imageUrl: "https://via.placeholder.com/300x200?text=Water+Quality",
  },
];

// In-memory storage for collaboration requests
let collaborationRequests: CollaborationRequest[] = [];
let nextRequestId = 1;

/**
 * Mock Data API Functions
 */

export function getAllLabs(): Lab[] {
  return mockLabs;
}

export function getLabById(id: number): Lab | undefined {
  return mockLabs.find((lab) => lab.id === id);
}

export function getResearchersByLabId(labId: number): Researcher[] {
  return mockResearchers.filter((r) => r.labId === labId);
}

export function getResearcherById(id: number): Researcher | undefined {
  return mockResearchers.find((r) => r.id === id);
}

export function getEquipmentByLabId(labId: number): Equipment[] {
  return mockEquipment.filter((e) => e.labId === labId);
}

export function getEquipmentById(id: number): Equipment | undefined {
  return mockEquipment.find((e) => e.id === id);
}

export function createCollaborationRequest(
  data: Omit<CollaborationRequest, "id" | "createdAt">
): CollaborationRequest {
  const request: CollaborationRequest = {
    ...data,
    id: nextRequestId++,
    createdAt: new Date(),
  };
  collaborationRequests.push(request);
  return request;
}

export function getCollaborationRequestById(id: number): CollaborationRequest | undefined {
  return collaborationRequests.find((r) => r.id === id);
}

export function getCollaborationRequests(filters?: {
  status?: string;
  labId?: number;
}): CollaborationRequest[] {
  let results = [...collaborationRequests];

  if (filters?.status) {
    results = results.filter((r) => r.status === filters.status);
  }

  if (filters?.labId) {
    results = results.filter((r) => r.labId === filters.labId);
  }

  return results;
}

export function updateCollaborationRequestStatus(
  id: number,
  status: CollaborationRequest["status"]
): CollaborationRequest | undefined {
  const request = collaborationRequests.find((r) => r.id === id);
  if (request) {
    request.status = status;
  }
  return request;
}

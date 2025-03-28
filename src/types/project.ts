
export type TradeType = 'Electrical' | 'Plumbing' | 'Carpentry' | 'HVAC' | 'Welding' | 'Automotive' | 'Other';
export type SkillLevel = 'Pre-Apprentice' | 'Apprentice' | 'Journeyman';
export type LocationType = 'On-site' | 'Remote' | 'Hybrid';

export interface ProjectTemplate {
  id: string;
  title: string;
  description: string;
  tradeType: TradeType;
  requirements: string[];
  subcategories?: string[];
  skillLevel?: SkillLevel;
}

export interface ProjectFormData {
  // Project ID
  id?: string;

  // Step 1: Basic Information
  title: string;
  description: string;

  // Step 2: Trade Details
  tradeType: TradeType;
  subcategories: string[];
  skillLevel: SkillLevel;
  toolsProvided: boolean;
  requiredTools: string[];
  safetyRequirements: string[];

  // Step 3: Project Specifications
  startDate: Date;
  endDate: Date;
  locationType: LocationType;
  address?: string;
  positions: number;
  flexibility?: string;

  // Step 4: Learner Requirements
  certifications: string[];

  // Step 5: Media
  images: File[];
  documents: File[];

  // Additional fields
  additionalInfo?: string;
  expectations?: string;

  // Template
  templateId?: string;
  
  // Status
  status?: string;
}

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'plumbing-commercial',
    title: 'Commercial Plumbing Maintenance',
    description: 'Maintenance and repair of plumbing systems in commercial spaces',
    tradeType: 'Plumbing',
    requirements: ['Basic plumbing knowledge', 'Safety awareness', 'Physical stamina'],
    subcategories: ['Commercial', 'Maintenance', 'Repair'],
    skillLevel: 'Apprentice'
  },
  {
    id: 'electrical-residential',
    title: 'Residential Electrical Installation',
    description: 'Installation and maintenance of electrical systems in residential buildings',
    tradeType: 'Electrical',
    requirements: ['Basic electrical knowledge', 'Safety certification', 'Hand tools experience'],
    subcategories: ['Residential', 'Installation', 'Wiring'],
    skillLevel: 'Pre-Apprentice'
  },
  {
    id: 'hvac-maintenance',
    title: 'HVAC System Maintenance',
    description: 'Regular maintenance and repair of heating, ventilation, and air conditioning systems',
    tradeType: 'HVAC',
    requirements: ['HVAC basics', 'Diagnostic skills', 'Preventive maintenance'],
    subcategories: ['Maintenance', 'Repair', 'Installation'],
    skillLevel: 'Journeyman'
  }
];

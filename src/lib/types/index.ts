// Core entity types
export interface Company {
  id: string;
  slug: string;
  name: string;
  logoUrl?: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  services: string[];
  industries: string[];
  location?: string;
  hourlyRate?: string;
  description?: string;
  website?: string;
  foundedYear?: number;
  employeeCount?: string;
  headquarters?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    behance?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  companyId: string;
  title: string;
  content: string;
  rating: number;
  comms: number;
  quality: number;
  timeline: number;
  value: number;
  budget?: string;
  duration?: string;
  projectType?: string;
  industry?: string;
  reviewerName?: string;
  reviewerTitle?: string;
  reviewerCompany?: string;
  isVerified: boolean;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CaseStudy {
  id: string;
  companyId: string;
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
  clientName?: string;
  projectType: string;
  industry: string;
  budget?: string;
  duration?: string;
  results?: string[];
  technologies?: string[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Filter and search types
export interface FilterOptions {
  services: string[];
  industries: string[];
  countries: string[];
  ratingMin: number;
  ratingMax: number;
  priceMin: number;
  priceMax: number;
  verified: boolean;
  foundedYearMin: number;
  foundedYearMax: number;
  employeeCount: string[];
}

export interface SortOption {
  value: string;
  label: string;
  field: string;
  order: 'asc' | 'desc';
}

export interface SearchFilters {
  query?: string;
  services?: string[];
  industries?: string[];
  countries?: string[];
  ratingMin?: number;
  ratingMax?: number;
  priceMin?: number;
  priceMax?: number;
  verified?: boolean;
  foundedYearMin?: number;
  foundedYearMax?: number;
  employeeCount?: string[];
  sort?: string;
  page?: number;
  limit?: number;
}

// UI state types
export interface CompareState {
  selectedCompanies: Company[];
  maxSelections: number;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

// Form types
export interface ReviewFormData {
  // Step 1: Project meta
  projectType: string;
  industry: string;
  budget: string;
  duration: string;
  servicesUsed: string[];
  
  // Step 2: Ratings
  rating: number;
  comms: number;
  quality: number;
  timeline: number;
  value: number;
  
  // Step 3: Written feedback
  title: string;
  content: string;
  reviewerName: string;
  reviewerTitle: string;
  reviewerCompany: string;
  isAnonymous: boolean;
}

export interface CompanyFormData {
  name: string;
  description: string;
  website: string;
  location: string;
  foundedYear: number;
  employeeCount: string;
  headquarters: string;
  services: string[];
  industries: string[];
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    behance?: string;
  };
}

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: PaginationState;
}

export interface SearchResponse {
  companies: Company[];
  pagination: PaginationState;
  filters: FilterOptions;
  totalResults: number;
}

// Component prop types
export interface CompanyCardProps {
  company: Company;
  onAddToCompare?: (company: Company) => void;
  onRemoveFromCompare?: (company: Company) => void;
  isInCompare?: boolean;
  showCompareButton?: boolean;
}

export interface ReviewCardProps {
  review: Review;
  onHelpful?: (reviewId: string) => void;
  isHelpful?: boolean;
  showFullContent?: boolean;
}

export interface FilterChipProps {
  label: string;
  value: string;
  onRemove: (value: string) => void;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

// Utility types
export type SortField = 'rating' | 'reviews' | 'newest' | 'name' | 'price';
export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}

// Theme types
export interface ThemeConfig {
  colors: {
    brand: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    card: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Analytics types
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp: number;
}

export interface PageView {
  path: string;
  title: string;
  timestamp: number;
  referrer?: string;
}

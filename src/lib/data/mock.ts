import { Company, Review, CaseStudy, FilterOptions } from '../types';

// Mock companies data
export const mockCompanies: Company[] = [
  {
    id: '1',
    slug: 'techcorp-solutions',
    name: 'TechCorp Solutions',
    logoUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
    verified: true,
    rating: 4.8,
    reviewCount: 127,
    services: ['Web Development', 'Mobile App Development', 'Cloud Solutions', 'DevOps'],
    industries: ['Technology', 'Healthcare', 'Finance'],
    location: 'San Francisco, CA',
    hourlyRate: '$150-200',
    description: 'Leading technology solutions provider specializing in custom software development and digital transformation.',
    website: 'https://techcorp.com',
    foundedYear: 2015,
    employeeCount: '50-100',
    headquarters: 'San Francisco, CA',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/techcorp',
      twitter: 'https://twitter.com/techcorp',
    },
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    slug: 'digital-agency-pro',
    name: 'Digital Agency Pro',
    logoUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop&crop=center',
    verified: true,
    rating: 4.6,
    reviewCount: 89,
    services: ['Digital Marketing', 'Brand Design', 'Content Strategy', 'SEO'],
    industries: ['Marketing', 'E-commerce', 'Retail'],
    location: 'New York, NY',
    hourlyRate: '$120-180',
    description: 'Full-service digital marketing agency focused on driving growth through innovative strategies.',
    website: 'https://digitalagencypro.com',
    foundedYear: 2018,
    employeeCount: '20-50',
    headquarters: 'New York, NY',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/digital-agency-pro',
      facebook: 'https://facebook.com/digitalagencypro',
    },
    createdAt: '2023-02-20T00:00:00Z',
    updatedAt: '2024-02-20T00:00:00Z',
  },
  {
    id: '3',
    slug: 'cloud-innovators',
    name: 'Cloud Innovators',
    logoUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=100&h=100&fit=crop&crop=center',
    verified: true,
    rating: 4.9,
    reviewCount: 203,
    services: ['Cloud Migration', 'AWS Consulting', 'Azure Solutions', 'DevOps'],
    industries: ['Technology', 'Healthcare', 'Finance', 'Government'],
    location: 'Seattle, WA',
    hourlyRate: '$200-300',
    description: 'Premier cloud consulting firm specializing in AWS and Azure migrations and optimizations.',
    website: 'https://cloudinnovators.com',
    foundedYear: 2012,
    employeeCount: '100-200',
    headquarters: 'Seattle, WA',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/cloud-innovators',
      twitter: 'https://twitter.com/cloudinnovators',
    },
    createdAt: '2023-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
  },
  {
    id: '4',
    slug: 'creative-studio-x',
    name: 'Creative Studio X',
    logoUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop&crop=center',
    verified: false,
    rating: 4.3,
    reviewCount: 45,
    services: ['UI/UX Design', 'Brand Identity', 'Web Design', 'Graphic Design'],
    industries: ['Design', 'E-commerce', 'Startups'],
    location: 'Austin, TX',
    hourlyRate: '$80-150',
    description: 'Creative design studio focused on modern UI/UX and brand identity solutions.',
    website: 'https://creativestudiox.com',
    foundedYear: 2020,
    employeeCount: '10-20',
    headquarters: 'Austin, TX',
    socialLinks: {
      instagram: 'https://instagram.com/creativestudiox',
      behance: 'https://behance.net/creativestudiox',
    },
    createdAt: '2023-03-05T00:00:00Z',
    updatedAt: '2024-03-05T00:00:00Z',
  },
  {
    id: '5',
    slug: 'data-analytics-plus',
    name: 'Data Analytics Plus',
    logoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center',
    verified: true,
    rating: 4.7,
    reviewCount: 156,
    services: ['Data Analytics', 'Business Intelligence', 'Machine Learning', 'Data Visualization'],
    industries: ['Technology', 'Finance', 'Healthcare', 'Retail'],
    location: 'Boston, MA',
    hourlyRate: '$180-250',
    description: 'Advanced data analytics and business intelligence solutions for enterprise clients.',
    website: 'https://dataanalyticsplus.com',
    foundedYear: 2016,
    employeeCount: '50-100',
    headquarters: 'Boston, MA',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/data-analytics-plus',
      twitter: 'https://twitter.com/dataanalyticsplus',
    },
    createdAt: '2023-01-25T00:00:00Z',
    updatedAt: '2024-01-25T00:00:00Z',
  },
  {
    id: '6',
    slug: 'cybersecurity-guardians',
    name: 'Cybersecurity Guardians',
    logoUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop&crop=center',
    verified: true,
    rating: 4.9,
    reviewCount: 78,
    services: ['Cybersecurity', 'Penetration Testing', 'Security Audits', 'Compliance'],
    industries: ['Technology', 'Finance', 'Healthcare', 'Government'],
    location: 'Washington, DC',
    hourlyRate: '$250-400',
    description: 'Leading cybersecurity firm providing comprehensive security solutions and compliance services.',
    website: 'https://cybersecurityguardians.com',
    foundedYear: 2014,
    employeeCount: '100-200',
    headquarters: 'Washington, DC',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/cybersecurity-guardians',
    },
    createdAt: '2023-02-10T00:00:00Z',
    updatedAt: '2024-02-10T00:00:00Z',
  },
];

// Mock reviews data
export const mockReviews: Review[] = [
  {
    id: '1',
    companyId: '1',
    title: 'Excellent web development service',
    content: 'TechCorp Solutions delivered an outstanding web application that exceeded our expectations. Their team was professional, responsive, and delivered on time. The quality of code and attention to detail was impressive. Highly recommended for any web development needs.',
    rating: 5,
    comms: 5,
    quality: 5,
    timeline: 4,
    value: 5,
    budget: '$50,000 - $100,000',
    duration: '3-6 months',
    projectType: 'Web Development',
    industry: 'Healthcare',
    reviewerName: 'Sarah Johnson',
    reviewerTitle: 'CTO',
    reviewerCompany: 'HealthTech Inc',
    isVerified: true,
    helpfulCount: 12,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    companyId: '1',
    title: 'Great mobile app development',
    content: 'We worked with TechCorp on our mobile app and were very satisfied with the results. The team understood our requirements well and provided valuable suggestions throughout the development process.',
    rating: 4,
    comms: 4,
    quality: 4,
    timeline: 5,
    value: 4,
    budget: '$25,000 - $50,000',
    duration: '2-3 months',
    projectType: 'Mobile App Development',
    industry: 'Finance',
    reviewerName: 'Mike Chen',
    reviewerTitle: 'Product Manager',
    reviewerCompany: 'FinTech Solutions',
    isVerified: true,
    helpfulCount: 8,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
  },
  {
    id: '3',
    companyId: '2',
    title: 'Outstanding digital marketing results',
    content: 'Digital Agency Pro transformed our online presence completely. Their SEO and content strategy increased our organic traffic by 300% in just 6 months. The team is knowledgeable and results-driven.',
    rating: 5,
    comms: 5,
    quality: 5,
    timeline: 5,
    value: 5,
    budget: '$10,000 - $25,000',
    duration: '6-12 months',
    projectType: 'Digital Marketing',
    industry: 'E-commerce',
    reviewerName: 'Emily Rodriguez',
    reviewerTitle: 'Marketing Director',
    reviewerCompany: 'E-commerce Plus',
    isVerified: true,
    helpfulCount: 15,
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
  {
    id: '4',
    companyId: '3',
    title: 'Seamless cloud migration',
    content: 'Cloud Innovators helped us migrate our entire infrastructure to AWS. The process was smooth, well-planned, and executed flawlessly. Our system performance improved significantly after the migration.',
    rating: 5,
    comms: 5,
    quality: 5,
    timeline: 4,
    value: 5,
    budget: '$100,000+',
    duration: '6-12 months',
    projectType: 'Cloud Migration',
    industry: 'Technology',
    reviewerName: 'David Kim',
    reviewerTitle: 'VP of Engineering',
    reviewerCompany: 'TechStart Inc',
    isVerified: true,
    helpfulCount: 22,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
  },
  {
    id: '5',
    companyId: '4',
    title: 'Beautiful UI/UX design',
    content: 'Creative Studio X created an amazing user interface for our application. The design is modern, intuitive, and our users love it. The team was creative and understood our brand perfectly.',
    rating: 4,
    comms: 4,
    quality: 5,
    timeline: 4,
    value: 4,
    budget: '$15,000 - $30,000',
    duration: '2-4 months',
    projectType: 'UI/UX Design',
    industry: 'Startups',
    reviewerName: 'Lisa Wang',
    reviewerTitle: 'Founder',
    reviewerCompany: 'StartupXYZ',
    isVerified: false,
    helpfulCount: 6,
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z',
  },
];

// Mock case studies data
export const mockCaseStudies: CaseStudy[] = [
  {
    id: '1',
    companyId: '1',
    title: 'Healthcare Platform Modernization',
    description: 'Complete modernization of a legacy healthcare platform with improved performance and user experience.',
    content: 'We helped a major healthcare provider modernize their patient management system, resulting in 40% faster load times and 60% improvement in user satisfaction.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop',
    clientName: 'HealthTech Inc',
    projectType: 'Web Development',
    industry: 'Healthcare',
    budget: '$100,000+',
    duration: '6-12 months',
    results: [
      '40% faster load times',
      '60% improvement in user satisfaction',
      '50% reduction in support tickets',
      '99.9% uptime achieved'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    isVerified: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    companyId: '2',
    title: 'E-commerce Growth Strategy',
    description: 'Comprehensive digital marketing strategy that increased online sales by 250%.',
    content: 'We developed and executed a complete digital marketing strategy for an e-commerce client, including SEO, PPC, social media, and content marketing.',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    clientName: 'E-commerce Plus',
    projectType: 'Digital Marketing',
    industry: 'E-commerce',
    budget: '$25,000 - $50,000',
    duration: '6-12 months',
    results: [
      '250% increase in online sales',
      '300% increase in organic traffic',
      '150% improvement in conversion rate',
      '200% increase in social media engagement'
    ],
    technologies: ['Google Analytics', 'Facebook Ads', 'Google Ads', 'HubSpot'],
    isVerified: true,
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
  {
    id: '3',
    companyId: '3',
    title: 'Enterprise Cloud Migration',
    description: 'Successful migration of enterprise infrastructure to AWS with zero downtime.',
    content: 'We migrated a large enterprise client from on-premises infrastructure to AWS, ensuring zero downtime and improved scalability.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    clientName: 'TechStart Inc',
    projectType: 'Cloud Migration',
    industry: 'Technology',
    budget: '$100,000+',
    duration: '6-12 months',
    results: [
      'Zero downtime migration',
      '50% cost reduction',
      '99.9% uptime achieved',
      '3x faster deployment times'
    ],
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    isVerified: true,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
  },
];

// Mock filter options
export const mockFilterOptions: FilterOptions = {
  services: [
    'Web Development',
    'Mobile App Development',
    'Cloud Solutions',
    'DevOps',
    'Digital Marketing',
    'Brand Design',
    'Content Strategy',
    'SEO',
    'Cloud Migration',
    'AWS Consulting',
    'Azure Solutions',
    'UI/UX Design',
    'Brand Identity',
    'Web Design',
    'Graphic Design',
    'Data Analytics',
    'Business Intelligence',
    'Machine Learning',
    'Data Visualization',
    'Cybersecurity',
    'Penetration Testing',
    'Security Audits',
    'Compliance'
  ],
  industries: [
    'Technology',
    'Healthcare',
    'Finance',
    'Government',
    'Marketing',
    'E-commerce',
    'Retail',
    'Design',
    'Startups'
  ],
  countries: [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Australia',
    'Japan',
    'India',
    'Brazil',
    'Mexico'
  ],
  ratingMin: 1,
  ratingMax: 5,
  priceMin: 50,
  priceMax: 500,
  verified: true,
  foundedYearMin: 2010,
  foundedYearMax: 2024,
  employeeCount: [
    '1-10',
    '10-20',
    '20-50',
    '50-100',
    '100-200',
    '200-500',
    '500+'
  ]
};

// Mock sort options
export const mockSortOptions = [
  { value: 'rating_desc', label: 'Highest Rated', field: 'rating', order: 'desc' as const },
  { value: 'rating_asc', label: 'Lowest Rated', field: 'rating', order: 'asc' as const },
  { value: 'reviews_desc', label: 'Most Reviews', field: 'reviewCount', order: 'desc' as const },
  { value: 'reviews_asc', label: 'Fewest Reviews', field: 'reviewCount', order: 'asc' as const },
  { value: 'newest', label: 'Newest', field: 'createdAt', order: 'desc' as const },
  { value: 'oldest', label: 'Oldest', field: 'createdAt', order: 'asc' as const },
  { value: 'name_asc', label: 'Name A-Z', field: 'name', order: 'asc' as const },
  { value: 'name_desc', label: 'Name Z-A', field: 'name', order: 'desc' as const },
];

// Helper functions
export function getCompanyById(id: string): Company | undefined {
  return mockCompanies.find(company => company.id === id);
}

export function getCompanyBySlug(slug: string): Company | undefined {
  return mockCompanies.find(company => company.slug === slug);
}

export function getReviewsByCompanyId(companyId: string): Review[] {
  return mockReviews.filter(review => review.companyId === companyId);
}

export function getCaseStudiesByCompanyId(companyId: string): CaseStudy[] {
  return mockCaseStudies.filter(caseStudy => caseStudy.companyId === companyId);
}

export function searchCompanies(query: string, filters: Partial<FilterOptions> = {}): Company[] {
  let results = [...mockCompanies];

  // Text search
  if (query) {
    const searchTerm = query.toLowerCase();
    results = results.filter(company => 
      company.name.toLowerCase().includes(searchTerm) ||
      company.description?.toLowerCase().includes(searchTerm) ||
      company.services.some(service => service.toLowerCase().includes(searchTerm)) ||
      company.industries.some(industry => industry.toLowerCase().includes(searchTerm)) ||
      company.location?.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by services
  if (filters.services && filters.services.length > 0) {
    results = results.filter(company => 
      filters.services!.some(service => company.services.includes(service))
    );
  }

  // Filter by industries
  if (filters.industries && filters.industries.length > 0) {
    results = results.filter(company => 
      filters.industries!.some(industry => company.industries.includes(industry))
    );
  }

  // Filter by countries (extract country from location)
  if (filters.countries && filters.countries.length > 0) {
    results = results.filter(company => {
      if (!company.location) return false;
      return filters.countries!.some(country => 
        company.location!.toLowerCase().includes(country.toLowerCase())
      );
    });
  }

  // Filter by rating
  if (filters.ratingMin !== undefined) {
    results = results.filter(company => company.rating >= filters.ratingMin!);
  }
  if (filters.ratingMax !== undefined) {
    results = results.filter(company => company.rating <= filters.ratingMax!);
  }

  // Filter by price range (extract numeric value from hourlyRate)
  if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
    results = results.filter(company => {
      if (!company.hourlyRate) return false;
      
      // Extract numeric values from strings like "$150-200" or "$200-300"
      const priceMatch = company.hourlyRate.match(/\$(\d+)-(\d+)/);
      if (!priceMatch) return false;
      
      const minPrice = parseInt(priceMatch[1]);
      const maxPrice = parseInt(priceMatch[2]);
      
      if (filters.priceMin !== undefined && maxPrice < filters.priceMin) return false;
      if (filters.priceMax !== undefined && minPrice > filters.priceMax) return false;
      
      return true;
    });
  }

  // Filter by founded year
  if (filters.foundedYearMin !== undefined) {
    results = results.filter(company => 
      company.foundedYear && company.foundedYear >= filters.foundedYearMin!
    );
  }
  if (filters.foundedYearMax !== undefined) {
    results = results.filter(company => 
      company.foundedYear && company.foundedYear <= filters.foundedYearMax!
    );
  }

  // Filter by employee count
  if (filters.employeeCount && filters.employeeCount.length > 0) {
    results = results.filter(company => 
      company.employeeCount && filters.employeeCount!.includes(company.employeeCount)
    );
  }

  // Filter by verified status
  if (filters.verified !== undefined) {
    results = results.filter(company => company.verified === filters.verified);
  }

  return results;
}

export function getRandomCompanies(count: number = 6): Company[] {
  const shuffled = [...mockCompanies].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getTopRatedCompanies(count: number = 6): Company[] {
  return [...mockCompanies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count);
}

export function getLatestCompanies(count: number = 6): Company[] {
  return [...mockCompanies]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, count);
}

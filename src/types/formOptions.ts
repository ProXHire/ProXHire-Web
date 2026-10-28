export const DEFAULT_POPULAR_SKILLS: string[] = [
  'React',
  'Node.js',
  'TypeScript',
  'JavaScript',
  'Python',
  'Java',
  'SQL',
  'AWS',
  'Docker',
  'Git',
  'Next.js',
  'MongoDB',
  'Tailwind CSS',
  'GraphQL',
  'Express'
]

export interface FormOptions {
  highestEducation: string[]
  preferredRole: string[]
  workExperience: string[]
  currentLocation: string[]
  industry: string[]
  companySize: string[]
  popularSkills: string[]
  updatedAt?: any
}

export const DEFAULT_FORM_OPTIONS: FormOptions = {
  popularSkills: DEFAULT_POPULAR_SKILLS,
  highestEducation: [
    'B.Tech / B.E.',
    'MCA / BCA / B.Sc (IT)',
    'MBA / PGDM',
    'B.Com / M.Com / Finance',
    'Diploma / Polytechnic',
    'Any Graduate / Post Graduate',
    'Other'
  ],
  preferredRole: [
    'Software Engineer / Developer',
    'Frontend / UI Engineer',
    'Backend / Fullstack Engineer',
    'Data Analyst / Data Scientist',
    'Business Development / Sales',
    'HR & Talent Acquisition',
    'Finance & Accounting',
    'Operations & Logistics',
    'Customer Experience / Support',
    'Mechanical / Core Engineering'
  ],
  workExperience: [
    'Fresher / Entry Level (0-1 yrs)',
    '1 - 3 Years',
    '3 - 5 Years',
    '5 - 8 Years',
    '8+ Years (Senior / Lead)'
  ],
  currentLocation: [
    'Bengaluru / Bangalore',
    'Hyderabad',
    'Chennai',
    'Pune',
    'Mumbai',
    'Delhi NCR',
    'Kolkata',
    'Other Location'
  ],
  industry: [
    'IT & Software Services',
    'Healthcare & Life Sciences',
    'BFSI (Banking & Financial)',
    'Manufacturing & Engineering',
    'Sales, Retail & E-commerce',
    'Logistics & Supply Chain',
    'Hospitality & Tourism',
    'Education & EdTech',
    'Other Industry'
  ],
  companySize: [
    '1-10 employees (Startup)',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '500+ employees (Enterprise)'
  ]
}

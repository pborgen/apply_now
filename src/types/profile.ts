export type LinkedInProfile = {
  name?: string;
  headline?: string;
  location?: string;
  about?: string;
  contact?: {
    email?: string;
    phone?: string;
    websites?: string[];
    linkedin?: string;
  };
  experience?: Array<{
    title?: string;
    company?: string;
    employmentType?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
    description?: string;
  }>;
  education?: Array<{
    school?: string;
    degree?: string;
    field?: string;
    startDate?: string;
    endDate?: string;
  }>;
  skills?: string[];
  certifications?: Array<{
    name?: string;
    issuer?: string;
    issuedDate?: string;
    expirationDate?: string;
    credentialId?: string;
  }>;
};

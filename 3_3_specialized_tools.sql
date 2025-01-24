-- Add more specialized categories first
INSERT INTO categories (name) VALUES
  ('MLOps & DevOps'),
  ('Data Governance'),
  ('Cloud AI Infrastructure'),
  ('Edge AI Computing'),
  ('Enterprise Security'),
  ('Industry Compliance'),
  ('Healthcare AI'),
  ('Financial AI'),
  ('Legal AI'),
  ('Education AI');

-- Add specialized tools
INSERT INTO tools (name, description, category_id, pricing, features, website_url, logo_url) VALUES
-- MLOps & DevOps Tools
(
  'Domino Data Lab',
  'Enterprise MLOps platform with advanced model management and deployment features',
  (SELECT id FROM categories WHERE name = 'MLOps & DevOps'),
  'paid',
  ARRAY['Model registry', 'Experiment tracking', 'GPU cluster management', 'Model deployment', 'Team collaboration', 'Compliance tracking'],
  'https://dominodatalab.com',
  'https://dominodatalab.com/favicon.ico'
),

-- Healthcare AI Tools
(
  'Tempus',
  'AI platform for precision medicine and clinical analytics',
  (SELECT id FROM categories WHERE name = 'Healthcare AI'),
  'paid',
  ARRAY['Clinical data analysis', 'Genomic sequencing', 'Drug discovery', 'Patient matching', 'Treatment optimization'],
  'https://tempus.com',
  'https://tempus.com/favicon.ico'
),

-- Financial AI Tools
(
  'Alpaca',
  'AI-powered stock trading and market analysis platform',
  (SELECT id FROM categories WHERE name = 'Financial AI'),
  'freemium',
  ARRAY['Algorithmic trading', 'Market analysis', 'Real-time data', 'Risk management', 'Portfolio optimization'],
  'https://alpaca.markets',
  'https://alpaca.markets/favicon.ico'
),

-- Legal AI Tools
(
  'Harvey AI',
  'AI-powered legal research and document analysis platform',
  (SELECT id FROM categories WHERE name = 'Legal AI'),
  'paid',
  ARRAY['Legal research', 'Document review', 'Contract analysis', 'Case law search', 'Compliance checking'],
  'https://harvey.ai',
  'https://harvey.ai/favicon.ico'
),

-- Education AI Tools
(
  'Century Tech',
  'AI-powered adaptive learning platform for education',
  (SELECT id FROM categories WHERE name = 'Education AI'),
  'paid',
  ARRAY['Personalized learning', 'Progress tracking', 'Content adaptation', 'Student analytics', 'Teacher dashboard'],
  'https://century.tech',
  'https://century.tech/favicon.ico'
),

-- Cloud Infrastructure Tools
(
  'Determined AI',
  'End-to-end MLOps platform for large-scale model training',
  (SELECT id FROM categories WHERE name = 'Cloud AI Infrastructure'),
  'paid',
  ARRAY['Distributed training', 'Resource scheduling', 'Experiment management', 'Model serving', 'GPU optimization'],
  'https://determined.ai',
  'https://determined.ai/favicon.ico'
),

-- Edge Computing Tools
(
  'Edge Impulse',
  'Development platform for edge AI and TinyML',
  (SELECT id FROM categories WHERE name = 'Edge AI Computing'),
  'freemium',
  ARRAY['Edge optimization', 'Device management', 'Model compression', 'Hardware acceleration', 'Power optimization'],
  'https://edgeimpulse.com',
  'https://edgeimpulse.com/favicon.ico'
),

-- Data Governance Tools
(
  'Collibra',
  'AI-powered data governance and catalog platform',
  (SELECT id FROM categories WHERE name = 'Data Governance'),
  'paid',
  ARRAY['Data lineage', 'Policy management', 'Compliance tracking', 'Data quality', 'Metadata management'],
  'https://collibra.com',
  'https://collibra.com/favicon.ico'
),

-- Enterprise Security Tools
(
  'Abnormal Security',
  'AI-powered email security platform',
  (SELECT id FROM categories WHERE name = 'Enterprise Security'),
  'paid',
  ARRAY['Threat detection', 'Behavioral analysis', 'Account takeover protection', 'Supply chain defense', 'API security'],
  'https://abnormalsecurity.com',
  'https://abnormalsecurity.com/favicon.ico'
),

-- Compliance Tools
(
  'OneTrust',
  'AI-enhanced privacy and compliance platform',
  (SELECT id FROM categories WHERE name = 'Industry Compliance'),
  'paid',
  ARRAY['Privacy management', 'Consent management', 'Risk assessment', 'Vendor management', 'Data mapping'],
  'https://onetrust.com',
  'https://onetrust.com/favicon.ico'
); 
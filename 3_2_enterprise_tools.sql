-- Add enterprise and specialized tools
INSERT INTO tools (name, description, category_id, pricing, features, website_url, logo_url) VALUES
-- Enterprise AI Tools
(
  'Anthropic Claude',
  'Enterprise-grade AI assistant with advanced reasoning and safety features',
  (SELECT id FROM categories WHERE name = 'Chat Bot'),
  'paid',
  ARRAY['100k context window', 'Constitutional AI', 'Advanced reasoning', 'Code analysis', 'Research assistance', 'Enterprise security'],
  'https://anthropic.com',
  'https://anthropic.com/favicon.ico'
),

-- Data Analysis Tools
(
  'H2O.ai',
  'Enterprise AI and automated machine learning platform',
  (SELECT id FROM categories WHERE name = 'Data Analysis'),
  'paid',
  ARRAY['AutoML', 'Model deployment', 'Feature engineering', 'Model monitoring', 'MLOps automation'],
  'https://h2o.ai',
  'https://h2o.ai/favicon.ico'
),

-- Computer Vision Tools
(
  'Roboflow',
  'End-to-end computer vision platform',
  (SELECT id FROM categories WHERE name = 'Image Generation'),
  'freemium',
  ARRAY['Dataset management', 'Model training', 'Deployment tools', 'Real-time inference', 'API access'],
  'https://roboflow.com',
  'https://roboflow.com/favicon.ico'
),

-- Development Tools
(
  'Weights & Biases',
  'MLOps platform for machine learning experiment tracking',
  (SELECT id FROM categories WHERE name = 'Data Analysis'),
  'freemium',
  ARRAY['Experiment tracking', 'Model versioning', 'Collaborative dashboards', 'Hardware monitoring', 'Dataset versioning'],
  'https://wandb.ai',
  'https://wandb.ai/favicon.ico'
),

-- Security Tools
(
  'Darktrace',
  'Enterprise AI cybersecurity platform',
  (SELECT id FROM categories WHERE name = 'Data Analysis'),
  'paid',
  ARRAY['Threat detection', 'Autonomous response', 'Network analysis', 'Email security', 'Cloud security'],
  'https://darktrace.com',
  'https://darktrace.com/favicon.ico'
),

-- Voice Tools
(
  'ElevenLabs',
  'AI voice cloning and synthesis platform',
  (SELECT id FROM categories WHERE name = 'Audio & Speech'),
  'freemium',
  ARRAY['Voice cloning', 'Text to speech', 'Voice design', 'Language support', 'API access'],
  'https://elevenlabs.io',
  'https://elevenlabs.io/favicon.ico'
),

-- Productivity Tools
(
  'Otter.ai',
  'AI meeting transcription and note-taking assistant',
  (SELECT id FROM categories WHERE name = 'Productivity'),
  'freemium',
  ARRAY['Real-time transcription', 'Meeting summaries', 'Speaker identification', 'Custom vocabulary', 'Calendar integration'],
  'https://otter.ai',
  'https://otter.ai/favicon.ico'
);

-- Update the migration script to include this file too 
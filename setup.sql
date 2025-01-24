-- Create enum for pricing types
CREATE TYPE pricing_type AS ENUM ('free', 'freemium', 'paid');

-- Create categories table
CREATE TABLE categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create tools table
CREATE TABLE tools (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  pricing pricing_type NOT NULL,
  features text[] NOT NULL DEFAULT '{}',
  website_url text NOT NULL,
  logo_url text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  pricing_details text,
  demo_url text,
  github_url text,
  documentation_url text,
  twitter_handle text,
  launch_date timestamp with time zone
);

-- Create reviews table
CREATE TABLE reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id uuid REFERENCES tools(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert initial data first
INSERT INTO categories (name) values
  ('Content Creation'),
  ('Productivity'),
  ('Image Generation'),
  ('Code Assistant'),
  ('Chat Bot'),
  ('Data Analysis'),
  ('Video Generation'),
  ('Audio & Speech'),
  ('Research & Writing'),
  ('Marketing & SEO'),
  ('3D & Animation'),
  ('Business Intelligence'),
  ('Social Media Management'),
  ('Translation & Localization'),
  ('Web Development'),
  ('AI Model Training'),
  ('Computer Vision'),
  ('Document Processing'),
  ('Financial Analysis'),
  ('Game Development'),
  ('Legal Tech'),
  ('Scientific Research'),
  ('Speech Recognition'),
  ('Text Analysis'),
  ('Voice Cloning'),
  ('Manufacturing AI'),
  ('Retail Intelligence'),
  ('Supply Chain AI'),
  ('Real Estate AI'),
  ('Cybersecurity AI'),
  ('HR & Recruitment'),
  ('Customer Service AI'),
  ('Insurance AI'),
  ('Construction AI'),
  ('Agriculture AI');

-- Insert initial tools
INSERT INTO tools (name, description, category_id, pricing, features, website_url, logo_url) VALUES
-- Content Creation Tools
(
  'ChatGPT',
  'Advanced language model for conversation and content creation',
  (SELECT id FROM categories WHERE name = 'Content Creation'),
  'freemium',
  ARRAY['Text generation', 'Content writing', 'Editing', 'Brainstorming'],
  'https://chat.openai.com',
  'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg'
);

-- Start transaction for updates
BEGIN;

-- Update existing tools with features
UPDATE tools 
SET features = array_cat(
  features,
  CASE
    WHEN pricing = 'paid' AND description LIKE '%Enterprise%' THEN
      ARRAY[
        'FDA 21 CFR Part 11',
        'CMMC compliance',
        'SOC 1/2/3 compliance',
        'ISO 27017/27018',
        'LGPD compliance',
        'PDPA compliance'
      ]
    WHEN description LIKE '%cloud%' OR description LIKE '%Cloud%' THEN
      ARRAY[
        'DigitalOcean integration',
        'Heroku deployment',
        'Cloudflare integration'
      ]
    ELSE
      ARRAY[]::text[]
  END
);

-- Update hardware-focused tools
UPDATE tools 
SET features = array_cat(
  features,
  ARRAY[
    'Xilinx FPGA support',
    'Graphcore IPU optimization',
    'Habana Labs acceleration'
  ]
)
WHERE category_id IN (SELECT id FROM categories WHERE name LIKE '%Hardware%' OR name LIKE '%Edge%');

-- Update enterprise tools
UPDATE tools 
SET features = array_cat(
  features,
  ARRAY[
    'SAP integration',
    'Oracle ERP connection',
    'Workday HR integration'
  ]
)
WHERE pricing = 'paid' AND description LIKE '%Enterprise%';

COMMIT;

-- Insert some sample categories
insert into categories (name) values
  ('Content Creation'),
  ('Productivity'),
  ('Image Generation'),
  ('Code Assistant'),
  ('Chat Bot'),
  ('Data Analysis');

-- Insert more categories if needed
insert into categories (name) values
  ('Content Creation'),
  ('Productivity'),
  ('Image Generation'),
  ('Code Assistant'),
  ('Chat Bot'),
  ('Data Analysis'),
  ('Video Generation'),
  ('Audio & Speech'),
  ('Research & Writing'),
  ('Marketing & SEO');

-- Insert a comprehensive list of tools
insert into tools (name, description, category_id, pricing, features, website_url, logo_url) values
-- Content Creation Tools
(
  'ChatGPT',
  'Advanced language model for conversation and content creation with capabilities ranging from writing to analysis',
  (select id from categories where name = 'Content Creation'),
  'freemium',
  array['Text generation', 'Content writing', 'Editing', 'Brainstorming', 'Multiple languages'],
  'https://chat.openai.com',
  'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg'
),
(
  'Copy.ai',
  'AI-powered copywriting tool for marketing content and social media',
  (select id from categories where name = 'Content Creation'),
  'freemium',
  array['Blog writing', 'Social media posts', 'Email templates', 'Ad copy', 'Product descriptions'],
  'https://www.copy.ai',
  'https://assets.website-files.com/628288c5cd3e8411b90a36a4/629a508f4496d93dc4a487b1_app_icon.svg'
),

-- Image Generation Tools
(
  'DALL-E',
  'Create realistic images and art from natural language descriptions',
  (select id from categories where name = 'Image Generation'),
  'paid',
  array['Text to image', 'Image editing', 'Variations', 'High resolution', 'Commercial usage'],
  'https://openai.com/dall-e-2',
  'https://seeklogo.com/images/D/dall-e-logo-1DD89A832D-seeklogo.com.png'
),
(
  'Midjourney',
  'AI art generator creating stunning images from text descriptions',
  (select id from categories where name = 'Image Generation'),
  'paid',
  array['Discord integration', 'High-quality art', 'Style customization', 'Commercial license'],
  'https://www.midjourney.com',
  'https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png'
),

-- Code Assistant Tools
(
  'GitHub Copilot',
  'AI pair programmer that helps you write code faster',
  (select id from categories where name = 'Code Assistant'),
  'paid',
  array['Code completion', 'Documentation generation', 'Test writing', 'Multi-language support'],
  'https://github.com/features/copilot',
  'https://github.gallerycdn.vsassets.io/extensions/github/copilot/1.77.9225/1677787102885/Microsoft.VisualStudio.Services.Icons.Default'
),
(
  'Tabnine',
  'AI code completion assistant supporting multiple IDEs',
  (select id from categories where name = 'Code Assistant'),
  'freemium',
  array['Code completion', 'Multiple IDE support', 'Team collaboration', 'Custom models'],
  'https://www.tabnine.com',
  'https://assets-global.website-files.com/627a1044fc1b957de5f505d6/6296ba1162c45d75d9b68f52_tabnine.png'
),

-- Video Generation Tools
(
  'Synthesia',
  'Create AI videos with digital avatars',
  (select id from categories where name = 'Video Generation'),
  'paid',
  array['Custom avatars', 'Multiple languages', 'Script to video', 'Templates'],
  'https://www.synthesia.io',
  'https://assets-global.website-files.com/61dc0796f359b6145bc06ea6/61dc0796f359b66acec06edb_5f69a3bd3815898323b35b11_favicon-256.png'
),

-- Audio & Speech Tools
(
  'Murf AI',
  'AI voice generator and text-to-speech platform',
  (select id from categories where name = 'Audio & Speech'),
  'freemium',
  array['Voice synthesis', 'Multiple languages', 'Voice customization', 'Studio editor'],
  'https://murf.ai',
  'https://murf.ai/static/murf-logo-new.svg'
),

-- Research & Writing Tools
(
  'Notion AI',
  'AI-powered writing assistant integrated with Notion',
  (select id from categories where name = 'Research & Writing'),
  'paid',
  array['Writing assistance', 'Summarization', 'Translation', 'Brainstorming'],
  'https://notion.so',
  'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png'
),

-- Marketing & SEO Tools
(
  'Jasper',
  'AI content platform for marketing and business content',
  (select id from categories where name = 'Marketing & SEO'),
  'paid',
  array['Blog posts', 'Social media', 'Email marketing', 'SEO optimization'],
  'https://www.jasper.ai',
  'https://assets-global.website-files.com/60e5f2de011b86acebc30db7/60e5f2de011b8635acc30dcd_Favicon%20256.png'
);

-- Add more tools as needed...

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON tools
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON reviews
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for review owners" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Enable delete for review owners" ON reviews
  FOR DELETE USING (auth.uid() = user_id);

-- Wrap all UPDATE statements in a transaction
BEGIN;

-- Update DALL-E image URL
UPDATE tools 
SET logo_url = 'https://seeklogo.com/images/D/dall-e-logo-1DD89A832D-seeklogo.com.png'
WHERE name = 'DALL-E';

-- Update existing tools with features in a single statement
UPDATE tools 
SET features = array_cat(
  features,
  CASE
    WHEN pricing = 'paid' AND description LIKE '%Enterprise%' THEN
      array[
        'FDA 21 CFR Part 11',
        'CMMC compliance',
        'SOC 1/2/3 compliance',
        'ISO 27017/27018',
        'LGPD compliance',
        'PDPA compliance',
        'UK Data Protection compliance',
        'UAE Personal Data Law',
        'Russia Data Localization',
        'Vietnam Cybersecurity Law',
        'Thailand PDPA compliance',
        'Indonesia Data Privacy Law',
        'SAP integration',
        'Oracle ERP connection',
        'Workday HR integration',
        'Siemens MindSphere',
        'PTC ThingWorx support',
        'IBM Maximo integration'
      ]
    WHEN (description LIKE '%cloud%' OR description LIKE '%Cloud%') THEN
      array[
        'DigitalOcean integration',
        'Heroku deployment',
        'Cloudflare integration',
        'VMware compatibility',
        'Terraform support',
        'CloudFormation templates'
      ]
    WHEN category_id IN (select id from categories where name LIKE '%Edge%') THEN
      array[
        'ARM processor support',
        'NVIDIA Jetson support',
        'Intel NUC optimization',
        'Raspberry Pi deployment',
        'Arduino compatibility',
        'Edge TPU support',
        'LoRaWAN device support',
        'Zigbee protocol integration',
        'BLE device management',
        'MQTT protocol support',
        'CoAP protocol support',
        'NB-IoT compatibility'
      ]
    WHEN pricing IN ('paid', 'freemium') THEN
      array[
        'REST API access',
        'GraphQL support',
        'Webhook integration',
        'SSO via SAML/OIDC',
        'Active Directory integration',
        'Zapier integration',
        'Microsoft Teams integration',
        'Slack integration',
        'Salesforce connection',
        'ServiceNow integration'
      ]
    ELSE
      array[]::text[]
  END
);

-- Update hardware-focused tools
UPDATE tools 
SET features = array_cat(
  features,
  array[
    'Xilinx FPGA support',
    'Graphcore IPU optimization',
    'Habana Labs acceleration',
    'Intel NNP integration',
    'AWS Inferentia support',
    'Azure NPU optimization'
  ]
)
WHERE category_id IN (select id from categories where name LIKE '%Hardware%' OR name LIKE '%Edge%');

-- Update industry-specific security standards
UPDATE tools 
SET features = array_cat(
  features,
  array[
    'IEC 62443 compliance',
    'DO-178C certification',
    'ISO 26262 compliance',
    'IEC 61508 certification',
    'EN 50128 compliance',
    'MIL-STD-882E compliance'
  ]
)
WHERE pricing = 'paid' AND (
  description LIKE '%Industrial%' OR 
  description LIKE '%Manufacturing%' OR 
  description LIKE '%Aviation%'
);

COMMIT;

-- Update the categories insertion to combine all categories
insert into categories (name) values
  ('Content Creation'),
  ('Productivity'),
  ('Image Generation'),
  ('Code Assistant'),
  ('Chat Bot'),
  ('Data Analysis'),
  ('Video Generation'),
  ('Audio & Speech'),
  ('Research & Writing'),
  ('Marketing & SEO'),
  ('3D & Animation'),
  ('Business Intelligence'),
  ('Education & Learning'),
  ('Healthcare & Medical'),
  ('Music & Audio Production'),
  ('Natural Language Processing'),
  ('Personal Assistant'),
  ('Social Media Management'),
  ('Translation & Localization'),
  ('Web Development'),
  ('AI Model Training'),
  ('Computer Vision'),
  ('Document Processing'),
  ('Financial Analysis'),
  ('Game Development'),
  ('Legal Tech'),
  ('Scientific Research'),
  ('Speech Recognition'),
  ('Text Analysis'),
  ('Voice Cloning'),
  ('Manufacturing AI'),
  ('Retail Intelligence'),
  ('Supply Chain AI'),
  ('Real Estate AI'),
  ('Cybersecurity AI'),
  ('HR & Recruitment'),
  ('Customer Service AI'),
  ('Insurance AI'),
  ('Construction AI'),
  ('Agriculture AI');

-- Add more tools with detailed features
insert into tools (name, description, category_id, pricing, features, website_url, logo_url) values
-- Productivity Tools
(
  'Otter.ai',
  'AI-powered meeting transcription and note-taking assistant with real-time collaboration',
  (select id from categories where name = 'Productivity'),
  'freemium',
  array['Real-time transcription', 'Meeting summaries', 'Speaker identification', 'Custom vocabulary', 'Calendar integration', 'Mobile app'],
  'https://otter.ai',
  'https://assets-global.website-files.com/618e9316785b3582a5178502/61f0a42e3d7c6582c6a1b172_Otter%20Logo%20Mark%20-%20Purple%20-%20RGB%402x-p-500.png'
),
(
  'Motion',
  'AI calendar and task management tool that automatically schedules your work',
  (select id from categories where name = 'Productivity'),
  'paid',
  array['Smart scheduling', 'Task prioritization', 'Time blocking', 'Team coordination', 'Meeting optimization'],
  'https://www.usemotion.com',
  'https://www.usemotion.com/favicon.png'
),

-- Data Analysis Tools
(
  'Obviously AI',
  'No-code machine learning platform for prediction and analysis',
  (select id from categories where name = 'Data Analysis'),
  'paid',
  array['Automated ML', 'Predictive analytics', 'Data visualization', 'No-code interface', 'CSV integration'],
  'https://www.obviously.ai',
  'https://www.obviously.ai/favicon.ico'
),
(
  'MindsDB',
  'Machine learning platform for making predictions using SQL',
  (select id from categories where name = 'Data Analysis'),
  'freemium',
  array['SQL integration', 'AutoML', 'Time-series forecasting', 'Database integration', 'Cloud deployment'],
  'https://mindsdb.com',
  'https://mindsdb.com/favicon.ico'
),

-- 3D & Animation Tools
(
  'Runway ML',
  'AI-powered creative tools for video editing and visual effects',
  (select id from categories where name = '3D & Animation'),
  'freemium',
  array['Green screen removal', 'Motion tracking', 'Text to video', 'Style transfer', 'Inpainting'],
  'https://runwayml.com',
  'https://runwayml.com/favicon.ico'
),

-- Education & Learning Tools
(
  'Duolingo Max',
  'AI-enhanced language learning platform with advanced conversation practice',
  (select id from categories where name = 'Education & Learning'),
  'freemium',
  array['AI conversations', 'Personalized learning', 'Instant feedback', 'Progress tracking', 'Gamification'],
  'https://www.duolingo.com',
  'https://d35aaqx5ub95lt.cloudfront.net/favicon.ico'
),

-- Healthcare & Medical Tools
(
  'Ada Health',
  'AI-powered health assessment and symptom checking platform',
  (select id from categories where name = 'Healthcare & Medical'),
  'free',
  array['Symptom assessment', 'Medical database', 'Personal health insights', 'Doctor recommendations', 'Health tracking'],
  'https://ada.com',
  'https://ada.com/favicon.ico'
),

-- Music & Audio Production
(
  'Soundraw',
  'AI music generation platform for creators',
  (select id from categories where name = 'Music & Audio Production'),
  'paid',
  array['Custom music generation', 'Genre selection', 'Mood-based creation', 'Commercial license', 'Export options'],
  'https://soundraw.io',
  'https://soundraw.io/favicon.ico'
),

-- Personal Assistant Tools
(
  'Pi',
  'Advanced conversational AI assistant with personality',
  (select id from categories where name = 'Personal Assistant'),
  'freemium',
  array['Natural conversations', 'Personality adaptation', 'Knowledge assistance', 'Task management', 'Multi-context memory'],
  'https://pi.ai',
  'https://pi.ai/favicon.ico'
),

-- Social Media Management
(
  'Lately',
  'AI-powered social media content creation and management platform',
  (select id from categories where name = 'Social Media Management'),
  'paid',
  array['Content generation', 'Social scheduling', 'Analytics', 'Brand voice training', 'Multi-platform support'],
  'https://www.lately.ai',
  'https://www.lately.ai/favicon.ico'
),

-- Translation & Localization
(
  'DeepL',
  'AI-powered translation platform with superior accuracy',
  (select id from categories where name = 'Translation & Localization'),
  'freemium',
  array['Neural machine translation', 'Document translation', 'API access', 'CAT tool integration', 'Glossary support'],
  'https://www.deepl.com',
  'https://www.deepl.com/favicon.ico'
),

-- Web Development
(
  'Builder.io',
  'AI-powered visual development platform',
  (select id from categories where name = 'Web Development'),
  'freemium',
  array['Visual editing', 'Code generation', 'A/B testing', 'Performance optimization', 'Headless CMS'],
  'https://www.builder.io',
  'https://cdn.builder.io/favicon.ico'
);

-- Add some free tools to provide more pricing variety
insert into tools (name, description, category_id, pricing, features, website_url, logo_url) values
(
  'Stable Diffusion',
  'Open-source AI image generation model',
  (select id from categories where name = 'Image Generation'),
  'free',
  array['Local installation', 'Custom training', 'Community models', 'No usage limits', 'Full control'],
  'https://stability.ai',
  'https://stability.ai/favicon.ico'
),
(
  'LangChain',
  'Open-source framework for building AI applications',
  (select id from categories where name = 'Development'),
  'free',
  array['Chain management', 'Model integration', 'Memory systems', 'Tool integration', 'Open source'],
  'https://langchain.com',
  'https://langchain.com/favicon.ico'
);

-- Add more specialized categories
insert into categories (name) values
  ('AI Model Training'),
  ('Computer Vision'),
  ('Document Processing'),
  ('Financial Analysis'),
  ('Game Development'),
  ('Legal Tech'),
  ('Scientific Research'),
  ('Speech Recognition'),
  ('Text Analysis'),
  ('Voice Cloning');

-- Add more tools with detailed pricing and descriptions
insert into tools (name, description, category_id, pricing, features, website_url, logo_url) values
-- AI Model Training Tools
(
  'Weights & Biases',
  'MLOps platform for machine learning experiment tracking and model management. Pricing starts at $50/month for teams, with a generous free tier for individual researchers.',
  (select id from categories where name = 'AI Model Training'),
  'freemium',
  array['Experiment tracking', 'Model versioning', 'Collaborative dashboards', 'Hardware monitoring', 'Dataset versioning', 'Integration with major ML frameworks'],
  'https://wandb.ai',
  'https://wandb.ai/favicon.ico'
),

-- Computer Vision Tools
(
  'Roboflow',
  'End-to-end computer vision platform with annotation, training, and deployment tools. Enterprise plans available with custom pricing, free tier includes 1000 source images.',
  (select id from categories where name = 'Computer Vision'),
  'freemium',
  array['Dataset management', 'Image annotation', 'Model training', 'API deployment', 'Real-time inference', 'Export to multiple formats'],
  'https://roboflow.com',
  'https://roboflow.com/favicon.ico'
),

-- Document Processing
(
  'Docugami',
  'AI-powered document engineering platform for business documents. Enterprise pricing based on volume, with plans starting at $499/month for small teams.',
  (select id from categories where name = 'Document Processing'),
  'paid',
  array['Document understanding', 'Semantic analysis', 'Data extraction', 'Template generation', 'Batch processing', 'API access'],
  'https://docugami.com',
  'https://docugami.com/favicon.ico'
),

-- Financial Analysis
(
  'Alpaca',
  'AI-powered stock trading API platform. Commission-free trading API with tiered pricing based on features, starting free for basic access.',
  (select id from categories where name = 'Financial Analysis'),
  'freemium',
  array['Market data', 'Trading automation', 'Paper trading', 'Real-time data', 'Historical data', 'Risk management'],
  'https://alpaca.markets',
  'https://alpaca.markets/favicon.ico'
),

-- Game Development
(
  'Inworld AI',
  'Platform for creating AI-powered game characters. Free tier available for prototyping, paid plans start at $50/month for commercial use.',
  (select id from categories where name = 'Game Development'),
  'freemium',
  array['Character creation', 'Dialogue generation', 'Emotion simulation', 'Unity integration', 'Unreal integration', 'Voice synthesis'],
  'https://inworld.ai',
  'https://inworld.ai/favicon.ico'
),

-- Legal Tech
(
  'Harvey AI',
  'AI-powered legal analysis and document review platform. Enterprise pricing with custom quotes based on firm size and usage volume.',
  (select id from categories where name = 'Legal Tech'),
  'paid',
  array['Contract analysis', 'Legal research', 'Document review', 'Case law analysis', 'Compliance checking', 'Risk assessment'],
  'https://harvey.ai',
  'https://harvey.ai/favicon.ico'
),

-- Scientific Research
(
  'Elicit',
  'AI research assistant for scientific literature review. Free for academic use, premium features available for institutional subscriptions.',
  (select id from categories where name = 'Scientific Research'),
  'freemium',
  array['Paper summarization', 'Citation analysis', 'Research synthesis', 'Trend identification', 'Methodology analysis', 'Data extraction'],
  'https://elicit.org',
  'https://elicit.org/favicon.ico'
),

-- Speech Recognition
(
  'Whisper Plus',
  'Enhanced version of OpenAI''s Whisper model with additional features. Custom pricing based on usage, with plans starting at $99/month.',
  (select id from categories where name = 'Speech Recognition'),
  'paid',
  array['Real-time transcription', 'Speaker diarization', 'Custom vocabulary', 'Multi-language support', 'Noise reduction', 'Timestamp generation'],
  'https://whisperplus.com',
  'https://whisperplus.com/favicon.ico'
),

-- Text Analysis
(
  'MonkeyLearn',
  'No-code text analysis and machine learning platform. Flexible pricing based on volume, starting at $299/month for business use.',
  (select id from categories where name = 'Text Analysis'),
  'paid',
  array['Sentiment analysis', 'Text classification', 'Keyword extraction', 'Intent detection', 'Custom models', 'API integration'],
  'https://monkeylearn.com',
  'https://monkeylearn.com/favicon.ico'
),

-- Voice Cloning
(
  'Eleven Labs',
  'AI voice cloning and speech synthesis platform. Free tier with limited voices, premium plans start at $22/month for additional features.',
  (select id from categories where name = 'Voice Cloning'),
  'freemium',
  array['Voice cloning', 'Emotion control', 'Language support', 'Real-time generation', 'API access', 'Custom voice design'],
  'https://elevenlabs.io',
  'https://elevenlabs.io/favicon.ico'
);

-- Add more tools to existing categories with pricing details
insert into tools (name, description, category_id, pricing, features, website_url, logo_url) values
(
  'Claude Pro',
  'Advanced AI assistant with enhanced capabilities and longer context. Premium subscription at $20/month includes higher usage limits and priority access.',
  (select id from categories where name = 'Chat Bot'),
  'paid',
  array['100k context window', 'Priority processing', 'Early feature access', 'Multiple personas', 'File analysis', 'Code execution'],
  'https://anthropic.com/claude',
  'https://anthropic.com/favicon.ico'
),
(
  'Gamma',
  'AI-powered presentation and document creation platform. Team plans start at $30/user/month, with a limited free tier available.',
  (select id from categories where name = 'Content Creation'),
  'freemium',
  array['Presentation generation', 'Smart templates', 'Content suggestions', 'Asset library', 'Team collaboration', 'Export options'],
  'https://gamma.app',
  'https://gamma.app/favicon.ico'
);

-- Add industry-specific categories
insert into categories (name) values
  ('Manufacturing AI'),
  ('Retail Intelligence'),
  ('Supply Chain AI'),
  ('Real Estate AI'),
  ('Cybersecurity AI'),
  ('HR & Recruitment'),
  ('Customer Service AI'),
  ('Insurance AI'),
  ('Construction AI'),
  ('Agriculture AI');

-- Add enterprise and industry-specific tools with technical details
insert into tools (name, description, category_id, pricing, features, website_url, logo_url) values
-- Manufacturing AI Tools
(
  'Augury',
  'Enterprise-grade AI platform for manufacturing diagnostics and predictive maintenance. Uses advanced sensors and deep learning models for real-time equipment monitoring. Enterprise pricing with custom quotes based on facility size.',
  (select id from categories where name = 'Manufacturing AI'),
  'paid',
  array['Machine learning diagnostics', 'Real-time monitoring', 'Predictive maintenance', 'Sensor integration', 'Digital twin modeling', 'API access', 'Custom model training'],
  'https://www.augury.com',
  'https://www.augury.com/favicon.ico'
),

-- Cybersecurity AI Tools
(
  'Darktrace',
  'Enterprise AI cybersecurity platform using self-learning AI to detect and respond to threats. Implements autonomous response technology. Enterprise pricing based on infrastructure size.',
  (select id from categories where name = 'Cybersecurity AI'),
  'paid',
  array['Autonomous response', 'Zero-trust enforcement', 'Network mapping', 'Threat visualization', 'Email security', 'Cloud security', 'Industrial systems protection'],
  'https://www.darktrace.com',
  'https://www.darktrace.com/favicon.ico'
),

-- HR & Recruitment Tools
(
  'HiredScore',
  'Enterprise AI recruitment and talent intelligence platform. Uses deep learning for candidate matching and workforce planning. Custom enterprise pricing.',
  (select id from categories where name = 'HR & Recruitment'),
  'paid',
  array['AI candidate matching', 'Skills taxonomy', 'Bias detection', 'Compliance monitoring', 'Integration with ATS', 'Workforce analytics', 'Custom workflows'],
  'https://www.hiredscore.com',
  'https://www.hiredscore.com/favicon.ico'
),

-- Add more technical tools to existing categories
insert into tools (name, description, category_id, pricing, features, website_url, logo_url) values
-- Code Assistant Advanced Tools
(
  'Amazon CodeWhisperer',
  'Enterprise-grade AI code assistant with advanced security features. Includes code vulnerability scanning and license compliance checking. Enterprise pricing includes SSO and compliance features.',
  (select id from categories where name = 'Code Assistant'),
  'freemium',
  array['Security scan', 'License compliance', 'Enterprise SSO', 'Custom training', 'Multi-repository support', 'CI/CD integration', 'Code reference tracking'],
  'https://aws.amazon.com/codewhisperer',
  'https://aws.amazon.com/favicon.ico'
),

-- Data Analysis Enterprise Tools
(
  'H2O.ai',
  'Enterprise AI and ML platform for automated machine learning and decision intelligence. Includes advanced features for model deployment and monitoring. Custom enterprise pricing.',
  (select id from categories where name = 'Data Analysis'),
  'paid',
  array['AutoML', 'Model monitoring', 'Feature engineering', 'Model interpretability', 'MLOps automation', 'Time series analysis', 'Custom model deployment'],
  'https://h2o.ai',
  'https://h2o.ai/favicon.ico'
),

-- Customer Service AI
(
  'Cognigy',
  'Enterprise conversational AI platform for customer service automation. Includes advanced NLP and integration capabilities. Enterprise pricing based on usage volume.',
  (select id from categories where name = 'Customer Service AI'),
  'paid',
  array['Voice bot integration', 'Multi-language NLP', 'Enterprise security', 'Custom flow builder', 'Analytics dashboard', 'Omnichannel support', 'Live agent handover'],
  'https://www.cognigy.com',
  'https://www.cognigy.com/favicon.ico'
),

-- Add more specialized technical tools
(
  'Scale AI',
  'Enterprise data annotation and synthetic data generation platform. Includes advanced features for ML training data preparation. Custom enterprise pricing based on volume.',
  (select id from categories where name = 'AI Model Training'),
  'paid',
  array['Data annotation', 'Synthetic data generation', 'Quality assurance', 'API integration', 'Custom workflows', 'Enterprise security', 'Model evaluation'],
  'https://scale.com',
  'https://scale.com/favicon.ico'
),

-- Insurance AI Tools
(
  'Tractable',
  'AI platform for insurance claim assessment and processing. Uses computer vision for damage assessment. Enterprise pricing with custom quotes.',
  (select id from categories where name = 'Insurance AI'),
  'paid',
  array['Visual damage assessment', 'Claim automation', 'Repair cost estimation', 'Fraud detection', 'Mobile integration', 'API access', 'Custom model training'],
  'https://tractable.ai',
  'https://tractable.ai/favicon.ico'
),

-- Agriculture AI Tools
(
  'Prospera',
  'AI-powered agriculture intelligence platform. Uses computer vision and climate data for crop management. Enterprise pricing based on acreage.',
  (select id from categories where name = 'Agriculture AI'),
  'paid',
  array['Crop monitoring', 'Disease prediction', 'Yield optimization', 'Weather integration', 'Drone compatibility', 'Mobile app', 'Data analytics'],
  'https://prospera.ag',
  'https://prospera.ag/favicon.ico'
);

-- Add Enterprise Security & Compliance category
insert into categories (name) values
  ('Enterprise Security'),
  ('MLOps & DevOps'),
  ('Data Governance'),
  ('Cloud AI Infrastructure'),
  ('Edge AI Computing');

-- Add enterprise security and compliance tools
insert into tools (name, description, category_id, pricing, features, website_url, logo_url) values
(
  'Robust Intelligence',
  'Enterprise AI security platform for model protection and monitoring. Features advanced threat detection and compliance frameworks. Enterprise pricing includes 24/7 support and custom deployment options.',
  (select id from categories where name = 'Enterprise Security'),
  'paid',
  array['Model vulnerability scanning', 'Adversarial attack protection', 'Data drift monitoring', 'SOC2 compliance', 'GDPR compliance tools', 'Audit logging', 'Role-based access control', 'SSO integration', 'End-to-end encryption'],
  'https://robustintelligence.com',
  'https://robustintelligence.com/favicon.ico'
),

-- Add MLOps tools with detailed technical specifications
(
  'Domino Data Lab',
  'Enterprise MLOps platform with advanced security and compliance features. Supports hybrid and multi-cloud deployments with comprehensive audit trails. Enterprise pricing includes dedicated support and custom SLAs.',
  (select id from categories where name = 'MLOps & DevOps'),
  'paid',
  array['Kubernetes orchestration', 'Model registry with versioning', 'Automated CI/CD pipelines', 'GPU cluster management', 'Environment reproducibility', 'Model A/B testing', 'Resource monitoring', 'Cost optimization'],
  'https://dominodatalab.com',
  'https://dominodatalab.com/favicon.ico'
),

-- Add Data Governance tool with enterprise features
(
  'Collibra AI',
  'Enterprise data governance platform with AI capabilities. Includes advanced data lineage and impact analysis. Custom enterprise pricing based on data volume and users.',
  (select id from categories where name = 'Data Governance'),
  'paid',
  array['Automated data classification', 'PII detection', 'Regulatory compliance', 'Data quality monitoring', 'Impact analysis', 'Workflow automation', 'Integration with major data platforms', 'Custom policy enforcement'],
  'https://collibra.com',
  'https://collibra.com/favicon.ico'
),

-- Add Cloud AI Infrastructure tool
(
  'Determined AI',
  'End-to-end MLOps platform for large-scale model training and deployment. Features distributed training and advanced resource management. Enterprise pricing includes dedicated support.',
  (select id from categories where name = 'Cloud AI Infrastructure'),
  'paid',
  array['Distributed training', 'Hyperparameter optimization', 'Resource scheduling', 'Multi-cloud support', 'Custom hardware integration', 'Model serving', 'Experiment tracking', 'Cost monitoring'],
  'https://determined.ai',
  'https://determined.ai/favicon.ico'
),

-- Add Edge AI Computing tool
(
  'Edge Impulse',
  'End-to-end edge AI development platform. Includes tools for data collection, model training, and deployment to edge devices. Enterprise features include custom hardware support.',
  (select id from categories where name = 'Edge AI Computing'),
  'freemium',
  array['Edge model optimization', 'Hardware acceleration', 'Power consumption analysis', 'Over-the-air updates', 'Device management', 'Real-time monitoring', 'Custom hardware support', 'Deployment automation'],
  'https://edgeimpulse.com',
  'https://edgeimpulse.com/favicon.ico'
);

-- Add integration-focused tools
insert into tools (name, description, category_id, pricing, features, website_url, logo_url) values
(
  'Zapier AI',
  'AI-powered workflow automation platform with extensive integration capabilities. Supports 5000+ app integrations with AI-enhanced automation features. Enterprise plans include advanced security and dedicated support.',
  (select id from categories where name = 'Productivity'),
  'freemium',
  array['AI workflow suggestions', 'Custom integration building', 'Error handling automation', 'Version control', 'Enterprise SSO', 'Audit logs', 'Data encryption', 'API rate limiting'],
  'https://zapier.com',
  'https://zapier.com/favicon.ico'
),

-- Update existing tools with more security features
UPDATE tools 
SET features = array_cat(features, array['SOC2 compliance', 'GDPR compliance', 'HIPAA compliance', 'Data encryption at rest', 'Data encryption in transit'])
WHERE pricing = 'paid' AND description LIKE '%Enterprise%';

-- Update existing tools with more integration details
UPDATE tools 
SET features = array_cat(features, array['REST API access', 'GraphQL support', 'Webhook integration', 'SSO via SAML/OIDC', 'Active Directory integration'])
WHERE pricing IN ('paid', 'freemium') AND description LIKE '%Enterprise%';

-- Add Compliance & Integration specific categories
insert into categories (name) values
  ('Industry Compliance'),
  ('Cloud Integration'),
  ('Edge Computing'),
  ('API Management');

-- Add compliance-focused tools
insert into tools (name, description, category_id, pricing, features, website_url, logo_url) values
(
  'ComplianceAI',
  'AI-powered compliance management platform supporting multiple regulatory frameworks including GDPR, CCPA, HIPAA, SOX, and ISO standards. Features real-time monitoring and automated reporting.',
  (select id from categories where name = 'Industry Compliance'),
  'paid',
  array['GDPR compliance', 'HIPAA compliance', 'SOX compliance', 'ISO 27001', 'PCI DSS', 'NIST framework', 'FedRAMP certification', 'FINRA compliance', 'SEC compliance'],
  'https://compliance.ai',
  'https://compliance.ai/favicon.ico'
),

-- Add cloud integration tools
(
  'MultiCloud AI',
  'Enterprise platform for managing AI workloads across AWS, Azure, and Google Cloud. Features cost optimization and automated resource management.',
  (select id from categories where name = 'Cloud Integration'),
  'paid',
  array['AWS integration', 'Azure integration', 'Google Cloud integration', 'Alibaba Cloud support', 'Oracle Cloud integration', 'IBM Cloud integration', 'Kubernetes management', 'Cross-cloud monitoring'],
  'https://multicloud.ai',
  'https://multicloud.ai/favicon.ico'
),

-- Add more edge computing tools
(
  'EdgeMatrix',
  'Distributed edge computing platform for AI model deployment. Supports IoT devices and edge servers with advanced monitoring.',
  (select id from categories where name = 'Edge Computing'),
  'paid',
  array['5G edge deployment', 'IoT device management', 'Edge model optimization', 'Bandwidth optimization', 'Local inference', 'Offline operation', 'Edge security', 'Remote updates'],
  'https://edgematrix.ai',
  'https://edgematrix.ai/favicon.ico'
),

-- Add API management tools
(
  'APIForge',
  'AI-powered API management and integration platform. Features automatic documentation and testing.',
  (select id from categories where name = 'API Management'),
  'freemium',
  array['API monitoring', 'Rate limiting', 'OAuth support', 'OpenAPI integration', 'API versioning', 'Usage analytics', 'Developer portal', 'Custom documentation'],
  'https://apiforge.ai',
  'https://apiforge.ai/favicon.ico'
);

-- Update existing enterprise tools with additional compliance features
UPDATE tools 
SET features = array_cat(features, array[
  'FDA 21 CFR Part 11',
  'CMMC compliance',
  'SOC 1/2/3 compliance',
  'ISO 27017/27018',
  'LGPD compliance',
  'PDPA compliance'
])
WHERE pricing = 'paid' AND description LIKE '%Enterprise%';

-- Update cloud-based tools with additional integrations
UPDATE tools 
SET features = array_cat(features, array[
  'DigitalOcean integration',
  'Heroku deployment',
  'Cloudflare integration',
  'VMware compatibility',
  'Terraform support',
  'CloudFormation templates'
])
WHERE description LIKE '%cloud%' OR description LIKE '%Cloud%';

-- Update edge computing tools with IoT features
UPDATE tools 
SET features = array_cat(features, array[
  'ARM processor support',
  'NVIDIA Jetson support',
  'Intel NUC optimization',
  'Raspberry Pi deployment',
  'Arduino compatibility',
  'Edge TPU support'
])
WHERE category_id IN (select id from categories where name LIKE '%Edge%');

-- Add integration capabilities to all paid tools
UPDATE tools 
SET features = array_cat(features, array[
  'Zapier integration',
  'Microsoft Teams integration',
  'Slack integration',
  'Salesforce connection',
  'ServiceNow integration'
])
WHERE pricing IN ('paid', 'freemium');

-- Add Regional Compliance & Hardware categories
insert into categories (name) values
  ('Regional Compliance'),
  ('Hardware Acceleration'),
  ('IoT Platforms'),
  ('Industry Integration');

-- Add regional compliance tools and standards
insert into tools (name, description, category_id, pricing, features, website_url, logo_url) values
(
  'GlobalComplianceAI',
  'Comprehensive AI compliance platform supporting global and regional standards. Features automated compliance checking and reporting for multiple jurisdictions.',
  (select id from categories where name = 'Regional Compliance'),
  'paid',
  array[
    'EU AI Act compliance', 
    'China Personal Information Protection Law',
    'Brazil LGPD compliance',
    'India Data Protection Bill',
    'Singapore PDPA',
    'Australia Privacy Principles',
    'Canada PIPEDA compliance',
    'Japan APPI compliance',
    'South Korea PIPA compliance'
  ],
  'https://globalcompliance.ai',
  'https://globalcompliance.ai/favicon.ico'
);

-- Add hardware optimization tools
insert into tools (name, description, category_id, pricing, features, website_url, logo_url) values
(
  'AI Accelerator Hub',
  'Hardware optimization platform for AI model deployment across various accelerators and processors.',
  (select id from categories where name = 'Hardware Acceleration'),
  'paid',
  array[
    'NVIDIA GPU optimization',
    'Intel CPU/GPU optimization',
    'AMD acceleration support',
    'Apple Silicon optimization',
    'Google TPU support',
    'FPGA acceleration',
    'ARM processor optimization',
    'Qualcomm AI Engine support',
    'Custom ASIC integration'
  ],
  'https://aiaccelerator.hub',
  'https://aiaccelerator.hub/favicon.ico'
);

-- Add IoT platform support
insert into tools (name, description, category_id, pricing, features, website_url, logo_url) values
(
  'IoT AI Platform',
  'Comprehensive IoT device management and AI deployment platform supporting wide range of devices.',
  (select id from categories where name = 'IoT Platforms'),
  'paid',
  array[
    'Industrial IoT support',
    'Smart home device integration',
    'Wearable device support',
    'Medical device integration',
    'Agricultural sensor support',
    'Smart city infrastructure',
    'Vehicle telematics integration',
    'Energy grid sensors',
    'Environmental monitoring'
  ],
  'https://iotai.platform',
  'https://iotai.platform/favicon.ico'
);

-- Update existing tools with regional compliance
UPDATE tools 
SET features = array_cat(features, array[
  'UK Data Protection compliance',
  'UAE Personal Data Law',
  'Russia Data Localization',
  'Vietnam Cybersecurity Law',
  'Thailand PDPA compliance',
  'Indonesia Data Privacy Law'
])
WHERE pricing = 'paid' AND description LIKE '%Enterprise%';

-- Update hardware-focused tools with specific optimizations
UPDATE tools 
SET features = array_cat(features, array[
  'Xilinx FPGA support',
  'Graphcore IPU optimization',
  'Habana Labs acceleration',
  'Intel NNP integration',
  'AWS Inferentia support',
  'Azure NPU optimization'
])
WHERE category_id IN (select id from categories where name LIKE '%Hardware%' OR name LIKE '%Edge%');

-- Add industry-specific integrations
UPDATE tools 
SET features = array_cat(features, array[
  'SAP integration',
  'Oracle ERP connection',
  'Workday HR integration',
  'Siemens MindSphere',
  'PTC ThingWorx support',
  'IBM Maximo integration'
])
WHERE pricing = 'paid' AND description LIKE '%Enterprise%';

-- Expand IoT device support
UPDATE tools 
SET features = array_cat(features, array[
  'LoRaWAN device support',
  'Zigbee protocol integration',
  'BLE device management',
  'MQTT protocol support',
  'CoAP protocol support',
  'NB-IoT compatibility'
])
WHERE category_id IN (select id from categories where name LIKE '%IoT%' OR name LIKE '%Edge%');

-- Add industry-specific security standards
UPDATE tools 
SET features = array_cat(features, array[
  'IEC 62443 compliance',
  'DO-178C certification',
  'ISO 26262 compliance',
  'IEC 61508 certification',
  'EN 50128 compliance',
  'MIL-STD-882E compliance'
])
WHERE pricing = 'paid' AND (
  description LIKE '%Industrial%' OR 
  description LIKE '%Manufacturing%' OR 
  description LIKE '%Aviation%'
);

-- Create tool_submissions table
CREATE TABLE tool_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  pricing pricing_type NOT NULL,
  features text[] NOT NULL DEFAULT '{}',
  website_url text NOT NULL,
  logo_url text NOT NULL,
  pricing_details text,
  demo_url text,
  github_url text,
  documentation_url text,
  twitter_handle text,
  launch_date timestamp with time zone,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create admin_users table
CREATE TABLE admin_users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on new tables
ALTER TABLE tool_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for tool_submissions
CREATE POLICY "Enable read access for all users" ON tool_submissions
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON tool_submissions
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for admins only" ON tool_submissions
  FOR DELETE USING (
    auth.uid() IN (
      SELECT user_id FROM admin_users
    )
  );

-- Create policies for admin_users
CREATE POLICY "Enable read access for all users" ON admin_users
  FOR SELECT USING (true); 
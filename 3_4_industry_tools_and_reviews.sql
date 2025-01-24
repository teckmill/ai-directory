-- Add industry-specific categories
INSERT INTO categories (name) VALUES
  ('Manufacturing AI'),
  ('Retail AI'),
  ('Agriculture AI'),
  ('Construction AI'),
  ('Real Estate AI'),
  ('Transportation AI'),
  ('Energy AI'),
  ('Gaming AI'),
  ('Research AI'),
  ('Media AI');

-- Add industry-specific tools
INSERT INTO tools (name, description, category_id, pricing, features, website_url, logo_url) VALUES
-- Manufacturing AI Tools
(
  'Augury',
  'AI-powered predictive maintenance and machine health monitoring',
  (SELECT id FROM categories WHERE name = 'Manufacturing AI'),
  'paid',
  ARRAY['Predictive maintenance', 'Machine diagnostics', 'Sensor integration', 'Real-time monitoring', 'Failure prediction'],
  'https://augury.com',
  'https://augury.com/favicon.ico'
),

-- Retail AI Tools
(
  'Standard AI',
  'Autonomous retail and inventory management platform',
  (SELECT id FROM categories WHERE name = 'Retail AI'),
  'paid',
  ARRAY['Autonomous checkout', 'Inventory tracking', 'Customer analytics', 'Loss prevention', 'Store optimization'],
  'https://standard.ai',
  'https://standard.ai/favicon.ico'
),

-- Agriculture AI Tools
(
  'Prospera',
  'AI-powered agriculture intelligence platform',
  (SELECT id FROM categories WHERE name = 'Agriculture AI'),
  'paid',
  ARRAY['Crop monitoring', 'Disease prediction', 'Yield optimization', 'Weather integration', 'Irrigation management'],
  'https://prospera.ag',
  'https://prospera.ag/favicon.ico'
),

-- Gaming AI Tools
(
  'Inworld AI',
  'AI character and NPC creation platform for games',
  (SELECT id FROM categories WHERE name = 'Gaming AI'),
  'freemium',
  ARRAY['Character creation', 'Dialogue generation', 'Behavior modeling', 'Voice synthesis', 'Unity integration'],
  'https://inworld.ai',
  'https://inworld.ai/favicon.ico'
);

-- Add sample reviews
INSERT INTO reviews (tool_id, user_id, rating, comment) VALUES
-- ChatGPT reviews
(
  (SELECT id FROM tools WHERE name = 'ChatGPT'),
  '00000000-0000-0000-0000-000000000001',
  5,
  'Incredibly versatile and helpful for content creation. The responses are well-structured and informative.'
),
(
  (SELECT id FROM tools WHERE name = 'ChatGPT'),
  '00000000-0000-0000-0000-000000000002',
  4,
  'Great for brainstorming and writing assistance. Sometimes needs fact-checking but overall very useful.'
),

-- DALL-E reviews
(
  (SELECT id FROM tools WHERE name = 'DALL-E'),
  '00000000-0000-0000-0000-000000000001',
  5,
  'Amazing image generation capabilities. The quality and creativity of the outputs are impressive.'
),
(
  (SELECT id FROM tools WHERE name = 'DALL-E'),
  '00000000-0000-0000-0000-000000000003',
  4,
  'Excellent for creating unique illustrations. The style variations are particularly useful.'
),

-- GitHub Copilot reviews
(
  (SELECT id FROM tools WHERE name = 'GitHub Copilot'),
  '00000000-0000-0000-0000-000000000002',
  5,
  'Significantly improves coding productivity. The suggestions are often exactly what I need.'
),
(
  (SELECT id FROM tools WHERE name = 'GitHub Copilot'),
  '00000000-0000-0000-0000-000000000003',
  4,
  'Great for boilerplate code and common patterns. Sometimes needs adjustment but saves a lot of time.'
); 
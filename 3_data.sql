-- Insert initial categories
INSERT INTO categories (name) VALUES
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

-- Insert initial tools
INSERT INTO tools (name, description, category_id, pricing, features, website_url, logo_url) VALUES
(
  'ChatGPT',
  'Advanced language model for conversation and content creation',
  (SELECT id FROM categories WHERE name = 'Content Creation'),
  'freemium',
  ARRAY['Text generation', 'Content writing', 'Editing', 'Brainstorming'],
  'https://chat.openai.com',
  'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg'
); 
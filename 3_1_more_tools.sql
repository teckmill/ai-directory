-- Add more tools
INSERT INTO tools (name, description, category_id, pricing, features, website_url, logo_url) VALUES
-- Content Creation Tools
(
  'Copy.ai',
  'AI-powered copywriting tool for marketing content and social media',
  (SELECT id FROM categories WHERE name = 'Content Creation'),
  'freemium',
  ARRAY['Blog writing', 'Social media posts', 'Email templates', 'Ad copy', 'Product descriptions'],
  'https://www.copy.ai',
  'https://assets.website-files.com/628288c5cd3e8411b90a36a4/629a508f4496d93dc4a487b1_app_icon.svg'
),

-- Image Generation Tools
(
  'DALL-E',
  'Create realistic images and art from natural language descriptions',
  (SELECT id FROM categories WHERE name = 'Image Generation'),
  'paid',
  ARRAY['Text to image', 'Image editing', 'Variations', 'High resolution', 'Commercial usage'],
  'https://openai.com/dall-e-2',
  'https://seeklogo.com/images/D/dall-e-logo-1DD89A832D-seeklogo.com.png'
),
(
  'Midjourney',
  'AI art generator creating stunning images from text descriptions',
  (SELECT id FROM categories WHERE name = 'Image Generation'),
  'paid',
  ARRAY['Discord integration', 'High-quality art', 'Style customization', 'Commercial license'],
  'https://www.midjourney.com',
  'https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png'
),

-- Code Assistant Tools
(
  'GitHub Copilot',
  'AI pair programmer that helps you write code faster',
  (SELECT id FROM categories WHERE name = 'Code Assistant'),
  'paid',
  ARRAY['Code completion', 'Documentation generation', 'Test writing', 'Multi-language support'],
  'https://github.com/features/copilot',
  'https://github.gallerycdn.vsassets.io/extensions/github/copilot/1.77.9225/1677787102885/Microsoft.VisualStudio.Services.Icons.Default'
),
(
  'Tabnine',
  'AI code completion assistant supporting multiple IDEs',
  (SELECT id FROM categories WHERE name = 'Code Assistant'),
  'freemium',
  ARRAY['Code completion', 'Multiple IDE support', 'Team collaboration', 'Custom models'],
  'https://www.tabnine.com',
  'https://assets-global.website-files.com/627a1044fc1b957de5f505d6/6296ba1162c45d75d9b68f52_tabnine.png'
),

-- Video Generation Tools
(
  'Synthesia',
  'Create AI videos with digital avatars',
  (SELECT id FROM categories WHERE name = 'Video Generation'),
  'paid',
  ARRAY['Custom avatars', 'Multiple languages', 'Script to video', 'Templates'],
  'https://www.synthesia.io',
  'https://assets-global.website-files.com/61dc0796f359b6145bc06ea6/61dc0796f359b66acec06edb_5f69a3bd3815898323b35b11_favicon-256.png'
),

-- Audio & Speech Tools
(
  'Murf AI',
  'AI voice generator and text-to-speech platform',
  (SELECT id FROM categories WHERE name = 'Audio & Speech'),
  'freemium',
  ARRAY['Voice synthesis', 'Multiple languages', 'Voice customization', 'Studio editor'],
  'https://murf.ai',
  'https://murf.ai/static/murf-logo-new.svg'
),

-- Research & Writing Tools
(
  'Notion AI',
  'AI-powered writing assistant integrated with Notion',
  (SELECT id FROM categories WHERE name = 'Research & Writing'),
  'paid',
  ARRAY['Writing assistance', 'Summarization', 'Translation', 'Brainstorming'],
  'https://notion.so',
  'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png'
),

-- Marketing & SEO Tools
(
  'Jasper',
  'AI content platform for marketing and business content',
  (SELECT id FROM categories WHERE name = 'Marketing & SEO'),
  'paid',
  ARRAY['Blog posts', 'Social media', 'Email marketing', 'SEO optimization'],
  'https://www.jasper.ai',
  'https://assets-global.website-files.com/60e5f2de011b86acebc30db7/60e5f2de011b8635acc30dcd_Favicon%20256.png'
); 
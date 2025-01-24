const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function generateFavicons() {
  const sizes = {
    'favicon-16x16.png': 16,
    'favicon-32x32.png': 32,
    'apple-touch-icon.png': 180,
    'android-chrome-192x192.png': 192,
    'android-chrome-512x512.png': 512
  };

  const inputSvg = path.join(__dirname, '../public/favicon.svg');
  const publicDir = path.join(__dirname, '../public');

  // Ensure public directory exists
  await fs.mkdir(publicDir, { recursive: true });

  // Generate PNGs
  for (const [filename, size] of Object.entries(sizes)) {
    await sharp(inputSvg)
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, filename));
    
    console.log(`Generated ${filename}`);
  }

  // Generate favicon.ico (using 16x16 and 32x32)
  const favicon16 = await sharp(inputSvg)
    .resize(16, 16)
    .toBuffer();
  
  const favicon32 = await sharp(inputSvg)
    .resize(32, 32)
    .toBuffer();

  await sharp(favicon16)
    .toFile(path.join(publicDir, 'favicon.ico'));
  
  console.log('Generated favicon.ico');
}

generateFavicons().catch(console.error); 
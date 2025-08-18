const fs = require('fs');
const https = require('https');
const path = require('path');

const PLACEHOLDERS = [
  {
    url: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=800&auto=format&fit=crop&q=80',
    filename: 'placeholder-1.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1505373876331-7d4ec9d6f1e0?w=800&auto=format&fit=crop&q=80',
    filename: 'placeholder-2.jpg'
  }
];

const imagesDir = path.join(__dirname, '../public/images');

// Create images directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Download function
function downloadImage(url, filename) {
  const filePath = path.join(imagesDir, filename);
  const file = fs.createWriteStream(filePath);
  
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {
        console.error(`Error downloading ${filename}:`, err);
        reject(err);
      });
    });
  });
}

// Download all placeholders
async function downloadAll() {
  try {
    console.log('Downloading placeholder images...');
    await Promise.all(
      PLACEHOLDERS.map(item => downloadImage(item.url, item.filename))
    );
    console.log('All placeholders downloaded successfully!');
  } catch (error) {
    console.error('Error downloading placeholders:', error);
    process.exit(1);
  }
}

downloadAll();

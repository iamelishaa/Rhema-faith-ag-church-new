const fs = require('fs-extra');
const path = require('path');

// Define source and destination directories
const sourceDir = path.join(__dirname, '../public/images');
const destDir = path.join(__dirname, '../out/images');

// List of image files to copy (relative to public/images directory)
const imageFiles = [
  'logo.png',
  'profile.png',
  'pastor.png',
  'pastor-family.jpg',
  'placeholder.jpg'
];

// Ensure destination directory exists
fs.ensureDirSync(destDir);

// Copy each image file
let success = true;
imageFiles.forEach(file => {
  const sourceFile = path.join(sourceDir, file);
  const destFile = path.join(destDir, file);
  
  try {
    if (fs.existsSync(sourceFile)) {
      fs.copySync(sourceFile, destFile, { overwrite: true });
      console.log(`✅ Copied ${file}`);
    } else {
      console.warn(`⚠️  Warning: ${file} not found in public directory`);
      success = false;
    }
  } catch (err) {
    console.error(`❌ Error copying ${file}:`, err);
    success = false;
  }
});

if (success) {
  console.log('✅ All images copied successfully!');
} else {
  console.warn('⚠️  Some images may not have been copied. Check the logs above for details.');
  process.exit(1);
}

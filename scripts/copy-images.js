const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, '../public/images');
const destDir = path.join(__dirname, '../out/_next/static/media');

// Ensure destination directory exists
fs.ensureDirSync(destDir);

// Copy images from public/images to out/_next/static/media
fs.copySync(sourceDir, destDir, { overwrite: true });

console.log('Images copied successfully!');

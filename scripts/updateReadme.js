const fs = require('fs');
const path = require('path');

// Read screenshots directory
const screenshotsDir = path.join(__dirname, '../screenshots');
const screenshots = fs.readdirSync(screenshotsDir)
    .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

// Generate markdown for screenshots
const screenshotsMarkdown = `
## Screenshots

<div align="center">

${screenshots.map(img => {
    // Encode the image path to handle spaces
    const encodedPath = encodeURIComponent(img);
    // Create a clean title from filename
    const title = img.split('.')[0]
                    .replace(/-/g, ' ')
                    .replace(/Screenshot \d{4} \d{2} \d{2} at /i, '')
                    .replace(/\.\d{2}\.\d{2}/g, '');
    
    return `![${title}](screenshots/${encodedPath})`;
}).join('\n\n')}

</div>

`;

// Read existing README
const readmePath = path.join(__dirname, '../README.md');
let readme = fs.readFileSync(readmePath, 'utf8');

// Replace screenshots section or add it if it doesn't exist
const screenshotsRegex = /## Screenshots[\s\S]*?(?=##|$)/;
if (readme.match(screenshotsRegex)) {
    readme = readme.replace(screenshotsRegex, screenshotsMarkdown);
} else {
    readme += '\n' + screenshotsMarkdown;
}

// Write updated README
fs.writeFileSync(readmePath, readme); 
const fs = require('fs');
const path = require('path');

const BASE_URL_CONFIG_PATH = 'src/config/api.js';

// Create config file
if (!fs.existsSync('src/config')) {
  fs.mkdirSync('src/config');
}
fs.writeFileSync(BASE_URL_CONFIG_PATH, `export const BASE_URL = 'http://localhost:5000/api';\n`);

const filesToUpdate = [
  "src/components/Certifications/Certifications.jsx",
  "src/pages/Admin/SkillManager.jsx",
  "src/components/Skills/Skills.jsx",
  "src/components/Projects/Projects.jsx",
  "src/components/Navbar/Navbar.jsx",
  "src/components/Hero/Hero.jsx",
  "src/components/Experience/Experience.jsx",
  "src/components/Education/Education.jsx",
  "src/components/Contact/Contact.jsx",
  "src/pages/Admin/ProjectManager.jsx",
  "src/pages/Admin/ProfileManager.jsx",
  "src/pages/Admin/Login.jsx",
  "src/pages/Admin/MessageManager.jsx",
  "src/pages/Admin/EducationManager.jsx",
  "src/pages/Admin/ExperienceManager.jsx",
  "src/pages/Admin/CertificationManager.jsx",
  "src/components/About/About.jsx",
  "src/pages/Admin/Dashboard.jsx"
];

filesToUpdate.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Figure out relative path to config
  const fileDir = path.dirname(fullPath);
  const configDir = path.join(process.cwd(), 'src/config');
  let relativePath = path.relative(fileDir, configDir).replace(/\\/g, '/');
  if (!relativePath.startsWith('.')) relativePath = './' + relativePath;
  const importStatement = `import { BASE_URL } from '${relativePath}/api';\n`;
  
  // Check if we need to modify
  if (content.includes('http://localhost:5000/api')) {
    // Inject import (after first import or at top)
    if (!content.includes('BASE_URL')) {
        const importMatch = content.match(/^import .*?;\n/m);
        if (importMatch) {
            content = content.replace(importMatch[0], importMatch[0] + importStatement);
        } else {
            content = importStatement + content;
        }
    }

    // Replace strict string endpoints
    content = content.replace(/'http:\/\/localhost:5000\/api(.*?)'/g, "`\\${BASE_URL}$1`");
    
    // Replace template literal endpoints (already using backticks)
    content = content.replace(/http:\/\/localhost:5000\/api/g, "\\${BASE_URL}");
    
    fs.writeFileSync(fullPath, content);
    console.log(`Updated ${file}`);
  }
});

console.log('Mass replacement complete!');

const fs = require('fs');
const path = require('path');

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
  
  // The literal string currently has a slash before the dollar sign: \${BASE_URL}
  // We want to replace it with ${BASE_URL}
  if (content.includes('\\${BASE_URL}')) {
    content = content.replace(/\\\$\{BASE_URL\}/g, '${BASE_URL}');
    fs.writeFileSync(fullPath, content);
    console.log(`Fixed formatting in ${file}`);
  }
});

console.log('Template literal fix complete!');

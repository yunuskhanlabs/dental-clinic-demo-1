const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

// Dental terms to check outside of the Three.js canvas setup
const terms = ['tooth', 'teeth', 'smile', 'dental', 'dentist', 'implant', 'root canal', 'oral', 'gum'];

console.log("Scanning index.html for hardcoded dental terms...");

const lines = indexHtml.split('\n');
const found = [];

lines.forEach((line, idx) => {
  const lineNum = idx + 1;
  // Ignore lines inside Three.js script (approx lines 950 to 1180)
  if (lineNum >= 955 && lineNum <= 1185) return;
  
  const lower = line.toLowerCase();
  for (const term of terms) {
    if (lower.includes(term)) {
      found.push({ lineNum, term, text: line.trim() });
      break;
    }
  }
});

console.log(`Found ${found.length} lines containing dental terms outside Three.js 3D model script:`);
found.forEach(f => {
  console.log(`Line ${f.lineNum} [${f.term}]: ${f.text.substring(0, 100)}`);
});

const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return Array.prototype.concat(...files);
}

const files = getFiles(path.join(process.cwd(), 'src'));
const tsFiles = files.filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));

let mismatches = [];

// For Windows, to get the actual case on disk, we can use fs.readdirSync
function getExtantCase(dir, base) {
  try {
    const list = fs.readdirSync(dir);
    for (const item of list) {
      if (item.toLowerCase() === base.toLowerCase()) {
        return item;
      }
    }
  } catch(e) {}
  return null;
}

tsFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Match both import and dynamic import
  const importRegex = /(?:import\s+(?:.*?\s+from\s+)?|import\()(['"])(.*?)\1/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPathOrig = match[2];
    if (importPathOrig.startsWith('@/') || importPathOrig.startsWith('.')) {
      let resolvedDir, baseName;
      if (importPathOrig.startsWith('@/')) {
        const relative = importPathOrig.substring(2);
        const parts = relative.split('/');
        baseName = parts.pop();
        resolvedDir = path.join(process.cwd(), 'src', ...parts);
      } else {
        const parts = importPathOrig.split('/');
        baseName = parts.pop();
        resolvedDir = path.join(path.dirname(file), ...parts);
      }
      
      // Is it a file or a folder index?
      // Need to test without extension, with .ts, with .tsx
      let attempts = [baseName, baseName + '.ts', baseName + '.tsx', baseName + '.js', baseName + '.css'];
      let foundExact = false;
      let actualDiskCase = null;
      
      for (let attempt of attempts) {
         let diskName = getExtantCase(resolvedDir, attempt);
         if (diskName) {
            actualDiskCase = diskName;
            // Check if what we wanted (baseName or baseName+ext) equals what is on disk
            // Actually, if diskName without extension equals baseName exactly, it's correct case.
            let diskBase = diskName.replace(/\.(ts|tsx|js|jsx|css)$/, '');
            if (diskBase === baseName || diskName === baseName) {
               foundExact = true;
               break;
            }
         }
      }
      
      // Also might be a folder with index.ts
      if (!actualDiskCase) {
         let dirAsName = getExtantCase(resolvedDir, baseName);
         if (dirAsName === baseName) {
            foundExact = true;
         }
      }

      if (!foundExact && actualDiskCase) {
         mismatches.push({
           file: file.substring(process.cwd().length).replace(/\\/g, '/'),
           importPath: importPathOrig,
           expectedOnDisk: actualDiskCase,
           got: baseName
         });
      }
    }
  }
});

console.log('Mismatches Found:');
mismatches.forEach(m => console.log(m));
if (mismatches.length === 0) console.log('None.');

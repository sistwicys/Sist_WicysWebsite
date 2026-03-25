const fs = require('fs');

// ─── 1. Fix Navbar.tsx: remove unused LOGO_SRC ───────────────────────────────
{
  const path = 'src/components/layout/Navbar.tsx';
  let content = fs.readFileSync(path, 'utf8');
  const lines = content.split('\n');
  const filtered = lines.filter(line => !line.trimStart().startsWith('const LOGO_SRC ='));
  content = filtered.join('\n');
  fs.writeFileSync(path, content, 'utf8');
  console.log('Navbar.tsx: removed LOGO_SRC');
}

// ─── 2. Fix BackgroundMusic.tsx: rename unused error param ───────────────────
{
  const path = 'src/components/ctf/BackgroundMusic.tsx';
  let content = fs.readFileSync(path, 'utf8');
  // Rename catch (error) to catch (_error) so it's not flagged as unused
  content = content.replace('} catch (error) {', '} catch (_error) {');
  fs.writeFileSync(path, content, 'utf8');
  console.log('BackgroundMusic.tsx: suppressed unused error param');
}

// ─── 3. Fix obscura/page.tsx: remove unused imports + fix unescaped quotes ────
{
  const path = 'src/app/obscura/page.tsx';
  let content = fs.readFileSync(path, 'utf8');

  // Remove unused useTransform import
  content = content.replace(
    'import { motion, useScroll, useTransform } from "framer-motion";',
    'import { motion, useScroll } from "framer-motion";'
  );

  // Remove unused Link import
  content = content.replace(
    'import Link from "next/link";\n',
    ''
  );

  // Remove unused scrollYProgress variable
  content = content.replace(
    `  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });`,
    `  useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });`
  );

  // Fix unescaped quotes on line 248
  content = content.replace(
    '"The cipher is not broken by strength, but by seeing what others dare not look at."',
    '&quot;The cipher is not broken by strength, but by seeing what others dare not look at.&quot;'
  );

  fs.writeFileSync(path, content, 'utf8');
  console.log('obscura/page.tsx: removed unused imports/vars, fixed quotes');
}

console.log('\nAll fixes applied successfully!');

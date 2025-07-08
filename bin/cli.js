#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const projectName = process.argv[2];
if (!projectName) {
  console.error('Please provide a name for your project.');
  process.exit(1);
}

const gitRepo = 'https://github.com/Leoj030/express-project-boilerplate.git';
const projectPath = path.join(process.cwd(), projectName);

try {
  console.log('Downloading files...');
  execSync(`git clone --depth 1 ${gitRepo} ${projectPath}`);

  process.chdir(projectPath);

  console.log('Installing dependencies...');
  execSync('npm install');

  console.log('Removing unnecessary files...');
  execSync('npx rimraf ./.git');
  // Assuming 'bin' is part of the boilerplate and needs to be removed
  if (fs.existsSync(path.join(projectPath, 'bin'))) {
    fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true });
  }
  
  console.log('\nInstallation is done! The project is ready to use.');
  console.log('\nTo start the development server with auto-reload, run:');
  console.log(`  cd ${projectName}`);
  console.log('  npm run dev:start');

  console.log('\nTo only check for type errors without running the server, you can run:');
  console.log('  npm run dev:type-check');

} catch (error) {
  console.error(`An error occurred: ${error.message}`);
}
#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

async function main() {
  const ora = (await import('ora')).default;
  const chalk = (await import('chalk')).default;

  const projectName = process.argv[2];
  if (!projectName) {
    console.error(chalk.red('Error: Please provide a name for your project.'));
    process.exit(1);
  }

  const spinner = ora();

  try {
    // 1. Define Paths
    const projectPath = path.join(process.cwd(), projectName);
    const templatePath = path.resolve(__dirname, '..', 'template');

    // 2. Create Project Directory
    spinner.start(chalk.cyan(`Creating a new Express app in ${chalk.yellow(projectPath)}`));
    fs.mkdirSync(projectPath);
    spinner.succeed();

    // 3. Copy Template Files
    spinner.start(chalk.cyan('Copying project files...'));
    fs.cpSync(templatePath, projectPath, { recursive: true });
    spinner.succeed();

    // 4. Handle .gitignore
    fs.renameSync(
      path.join(projectPath, 'gitignore'),
      path.join(projectPath, '.gitignore')
    );

    // 5. Create a dynamic package.json
    const packageJsonPath = path.join(projectPath, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Update the project name
    packageJson.name = projectName;
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // 6. Install Dependencies
    process.chdir(projectPath);
    spinner.start(chalk.cyan('Installing dependencies (this may take a moment)...'));
    execSync('npm install');
    spinner.succeed(chalk.green('Dependencies installed!'));

    // --- Final Instructions ---
    console.log(chalk.bold.green('\n🚀 Project is ready to use!'));
    console.log(chalk.bold('\nTo get started, run the following commands:'));
    console.log(chalk.blue(`  cd "${projectName}"`));
    console.log(chalk.blue('  npm run dev:start'));

  } catch (error) {
    spinner.fail(chalk.red('An error occurred during setup.'));
    console.error(error);
    process.exit(1);
  }
}

main();
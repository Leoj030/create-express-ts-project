#!/usr/bin/env node

const { exec } = require('child_process');
const util = require('util');
const path = require('path');
const fs = require('fs');

const asyncExec = util.promisify(exec);

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
    const projectPath = path.join(process.cwd(), projectName);
    const templatePath = path.resolve(__dirname, '..', 'template');

    spinner.start(chalk.cyan(`Creating a new Express app in ${chalk.yellow(projectPath)}`));
    fs.mkdirSync(projectPath, { recursive: true });
    spinner.succeed();

    fs.cpSync(templatePath, projectPath, { recursive: true });

    fs.renameSync(
      path.join(projectPath, 'gitignore'),
      path.join(projectPath, '.gitignore')
    );
    
    const packageJsonPath = path.join(projectPath, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = projectName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    process.chdir(projectPath);
    spinner.start(chalk.cyan('Installing dependencies (this may take a moment)...'));
    await asyncExec('npm install');
    spinner.succeed(chalk.green('Dependencies installed!'));

    await asyncExec('git init');

    console.log(chalk.bold.green('\n🚀 Project is ready to use!'));
    console.log(chalk.bold('\nTo get started, run:'));
    console.log(chalk.blue(`  cd "${projectName}"`));
    console.log(chalk.blue('  npm run dev:start'));

  } catch (error) {
    spinner.fail(chalk.red('An error occurred during setup.'));
    console.error(error);
    process.exit(1);
  }
}

main();
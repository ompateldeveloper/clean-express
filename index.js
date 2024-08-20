#!/usr/bin/env node

import inquirer from 'inquirer';
import shell from 'shelljs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createProject() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: 'clean-express-project',
    },
  ]);

  const targetDir = join(process.cwd(), answers.projectName);
  shell.mkdir(targetDir);
  shell.cp('-R', join(__dirname, 'template/*'), targetDir);

  console.log(`\nProject created in ${targetDir}`);
}

createProject();

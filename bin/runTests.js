const {execSync} = require('child_process');

let output;
console.info('Checking for updated packages');
try {
  output = execSync(`npx lerna updated`);
} catch (error) {
  console.info(`No project updates - skipping tests`);
  process.exit(0);
}

const updatedProjects = output
  .toString()
  .replace(/- /g, '')
  .match(/[^\r\n]+/g);

console.info('Building all packages');
execSync(`yarn dist`, {stdio: [0, 1]});

updatedProjects.forEach(project => {
  console.info(`Running tests for project "${project}"`);
  execSync(`npx lerna run --scope ${project} test`, {stdio: [0, 1]});
});

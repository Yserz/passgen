const {execSync} = require('child_process');

let output;
console.info('Checking for updated packages');
try {
  output = execSync('npx lerna changed --all --json');
} catch (error) {
  console.info('No local packages have changed since the last tagged releases.');
  process.exit(0);
}

const changedPackages = JSON.parse(output.toString());
const packageNames = changedPackages.map(project => project.name);

const scopes = packageNames.map(packageName => `--scope ${packageName}`).join(' ');
console.info(`Building packages "${scopes}"`);
execSync(`npx lerna run dist --include-dependencies ${scopes}`, {stdio: [0, 1]});

console.info(`Running tests for packages "${packageNames}"...`);
execSync(`npx lerna run test --no-sort --concurrency 8 ${scopes}`, {stdio: [0, 1]});

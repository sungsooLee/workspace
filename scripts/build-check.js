const { execSync } = require('child_process');

const BASE_CANDIDATES = ['origin/dev', 'origin/main'];

const getMergeBaseDistance = (branch1, branch2) => {
  try {
    const mergeBase = execSync(`git merge-base ${branch1} ${branch2}`).toString().trim();
    const logCount = execSync(`git rev-list --count ${mergeBase}..${branch2}`).toString().trim();
    return parseInt(logCount, 10);
  } catch (e) {
    return Infinity; // merge-base 실패 시 우선순위에서 제외
  }
};

// Base Branch가 dev 인지, main인지 찾음
const getBaseBranch = () => {
  try {
    execSync('git fetch origin', { stdio: 'ignore' });

    const currentBranch = execSync('git rev-parse HEAD').toString().trim();

    const distances = BASE_CANDIDATES.map((candidate) => {
      const distance = getMergeBaseDistance(candidate, currentBranch);
      return { branch: candidate, distance };
    });

    distances.sort((a, b) => a.distance - b.distance);

    const bestMatch = distances[0];
    if (bestMatch.distance === Infinity) {
      throw new Error('No common ancestor found with base branches');
    }

    return bestMatch.branch.replace('origin/', '');
  } catch (error) {
    console.error('Failed to determine base branch:', error.message);
    process.exit(1);
  }
};

// Determine configuration based on base branch
const getConfiguration = (branch) => {
  if (branch === 'main') {
    return 'production';
  }
  return 'dev';
};

// Main execution
const main = () => {
  const baseBranch = getBaseBranch();
  const configuration = getConfiguration(baseBranch);

  console.log(`Base branch: ${baseBranch}`);
  console.log(`Using configuration: ${configuration}`);

  try {
    execSync(
      `pnpm nx affected --target=build --configuration=${configuration} --base=origin/${baseBranch} --head=HEAD`,
      { stdio: 'inherit' },
    );
  } catch (error) {
    console.error('Build check failed:', error);
    process.exit(1);
  }
};

// main();

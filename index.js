// eslint-disable-next-line @typescript-eslint/no-var-requires
const child_process = require('child_process');

const formatDate = function (date) {
  function pad(value) {
    return `${value < 10 ? '0' : ''}${value}`;
  }

  let year = date.getFullYear();
  let month = pad(date.getMonth() + 1);
  let day = pad(date.getDate());
  let hour = pad(date.getHours());
  let minutes = pad(date.getMinutes());
  let seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
};

const execSync = function (command) {
  return child_process.execSync(command).toString().trim();
};

const loadBranch = function () {
  let b = process.env.GIT_BRANCH;
  if (!b) {
    b = execSync('git rev-parse --abbrev-ref HEAD').replace(/\s+/, '');
  }
  return b;
};

// git 最后一次提交的 Head
let commit, commitAuthor, commitEmail, commitDateObj, commitDate, buildDate, branch;
// git 最后一次提交的 Head
try {
  commit = execSync('git show -s --format=%H');
  commitAuthor = execSync('git show -s --format=%cn');
  commitEmail = execSync('git show -s --format=%ce');
  commitDateObj = new Date(execSync(`git show -s --format=%cd`));
  commitDate = formatDate(commitDateObj);
  buildDate = formatDate(new Date());
  branch = loadBranch();
} catch (err) {
  console.log('your current branch does not have any commits yet');
}

module.exports = { commit, commitAuthor, commitEmail, commitDate, buildDate, branch };

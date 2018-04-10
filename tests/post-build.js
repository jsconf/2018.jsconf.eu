const fs = require('fs');

// Check that output looks good to deploy.

function fail(message) {
  console.error(message)
  process.exitCode = 1;
}

function checkDir(name, minCount) {
  var count = fs.readdirSync(name).length;
  if (count < minCount) {
    fail(`Unexpected low count of files in ${name}: ${count} < ${minCount}. Was there a problem in the spreadsheet import?`);
  }
}

checkDir('contents/speakers/', 40);
checkDir('build/speakers/', 40);
checkDir('contents/sponsors/', 5);
checkDir('contents/mcs/', 3);
checkDir('contents/team/', 3);
checkDir('contents/images/speaker/', 40);
checkDir('contents/images/sponsor/', 5);

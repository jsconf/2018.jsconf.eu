const purifycss = require('purify-css');
const find = require('find');

const content = ['build/**/*.js', 'build/**/*.html'];


find.file(/main\.css$/, 'build/', files => {
  if (files.length != 1) {
    throw new Error('Expected exactly 1 css file: ' + files.join(', '));
  }
  console.log('Purifying ' + files);
  purifycss(content, files, {
    // Comment in for debugging.
    // rejected: true,

    // Change in-place
    output: files[0],
  });
});

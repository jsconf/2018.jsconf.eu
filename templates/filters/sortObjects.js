const objectPath = require('object-path');

module.exports = function(
  arr,
  keyPath,
  defaultValue = 0,
  compareAs = 'number'
) {
  return arr.slice(0).sort((objA, objB) => {
    const a = objectPath.get(objA, keyPath, defaultValue);
    const b = objectPath.get(objB, keyPath, defaultValue);

    switch (compareAs) {
      case 'number':
        return a - b;
      case 'string':
        return a.localeCompare(b);
      case 'date':
        throw new Error('sort-object: compareAs=date not yet implemented.');
    }
  });
};

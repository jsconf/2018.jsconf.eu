const fs = require('fs');
const path = require('path');
const svgstore = require('svgstore');

const readFile = promisify(fs.readFile);

module.exports = (env, cb) => {
  /**
   * Only really needed to provide the actual sprite markup to templates
   * (This is not available by default)
   */
  class SVGSpritePlugin extends env.ContentPlugin {
    constructor(filename, sprite) {
      super();
      this._filename = filename;
      this._sprite = sprite;
    }

    getFilename() {
      return this._filename;
    }

    get sprite() {
      return this._sprite;
    }
   
    getView() {
      return (env, locals, contents, templates, cb) => {
        cb(null, new Buffer(this._sprite));
      }
    }
  }

  env.registerGenerator('SVGSprite', (contents, cb) => {
    // The sprite will always live here in the content tree
    const filename = 'svg/sprite.svg';
    const filenameContentPairs = keyValPairs(contents.svg);
    
    const readSvgs = () => (
      Promise.all(filenameContentPairs.map(([filename, content]) => (
        Promise.all([
          Promise.resolve(filename.replace('.svg', '')),
          readFile(content.filepath.full, 'utf8')
        ])
      )))
    );

    const concatToSprite = idBufferPairs => (
      idBufferPairs.reduce((sprite, [id, buffer]) => (
        sprite.add(id, buffer)
      ), svgstore())
    );

    const createContentTree = spriteObj => (
      set(
        {},
        filename.split('/'),
        new SVGSpritePlugin(filename, spriteObj.toString())
      )
    );
    
    Promise.resolve()
      .then(readSvgs)
      .then(concatToSprite)
      .then(createContentTree)
      .then(tree => {
        cb(null, tree);
      });
  })

  cb();
}

function keyValPairs (obj) {
  return Object.keys(obj).map(key => [key, obj[key]]);
}

function set (obj, path, val) {
  const keys = typeof path === 'string' ? path.split('.') : path;
  return keys.reduce((child, key, i) => {
    if (i === keys.length - 1) {
      child[key] = val;
      return obj;
    } else {
      if (child[key] === undefined)
        child[key] = {}
      return child[key];
    }    
  }, obj);
}

function promisify (fn) {
  return (...args) => (
    new Promise((resolve, reject) => (
      fn(...args, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    ))
  );
}

function print (prefix) {
  return (result) => {
    console.log(`${prefix}:`, result);
    return result;
  };
}

const nunjucks = require('nunjucks');
const path = require('path');
const minify = require('html-minifier').minify;

module.exports = function(env, callback) {
  const optionDefaults = {
    autoescape: false,
    filterdir: process.cwd(),
    filters: [],
    filtermodules: [],
    extensions: {}
  };
  Object.assign(env.config.locals, require('../locals-generated.json'));

  // Load the new nunjucks environment.
  const loaderOpts = {
    watch: env.mode === 'preview'
  };
  const loader = new nunjucks.FileSystemLoader(env.templatesPath, loaderOpts);
  const nenv = new nunjucks.Environment(loader);

  // Load the filters
  const options = Object.assign({}, optionDefaults, env.config.nunjucks);

  options.filters.map(function(name) {
    const file = path.join(options.filterdir, name + '.js');
    const filter = env.loadModule(env.resolvePath(file), true);
    nenv.addFilter(name, filter);
  });

  options.filtermodules.map(function(name) {
    const filter = require(name);
    filter.install(nenv);
  });

  Object.keys(options.extensions).map(extName => {
    const file = options.extensions[extName];
    const extension = env.loadModule(env.resolvePath(file), true);

    nenv.addExtension(extName, extension);
  });

  nenv.opts.autoescape = options.autoescape;

  class NunjucksTemplate extends env.TemplatePlugin {
    constructor(template) {
      super();
      this.template = template;
    }

    render(locals, callback) {
      try {
        let html = this.template.render(locals);
        html = minify(html, {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
          sortClassName: true,
          sortAttributes: true,
        });
        callback(null, new Buffer(html));
      } catch (error) {
        callback(error);
      }
    }

    static fromFile(filepath, callback) {
      callback(null, new NunjucksTemplate(nenv.getTemplate(filepath.relative)));
    }
  }

  nenv.addFilter('notDraft', function(array) {
    return array.filter(function(item) {
      return !item.metadata.draft;
    })
  });

  env.registerTemplatePlugin('**/*.*(html|nunjucks|njk)', NunjucksTemplate);
  // Transform static URLs into the form:
  // /immutable/$fileHash/filename
  env.plugins.StaticFile.prototype.getFilename = function getFilename () {
    // Top level files such as CNAME and manifest.json should not be renamed.
    if (!(/\//.test(this.filepath.relative))) {
      return this.filepath.relative;
    }
    const hash = require('crypto').createHash('sha1');
    hash.update(require('fs').readFileSync(this.filepath.full), 'utf8');
    return 'immutable/' + hash.digest('hex') + '/' + this.filepath.relative;
  }
  // OMG, super hacky way to make local server emit a long max-age. This dramatically
  // speeds up the dev server responses since all resources are cached unless they
  // actually changed (in that case the URL changes and hence there is no cache hit).
  const writeHead = require('http').ServerResponse.prototype.writeHead;
  require('http').ServerResponse.prototype.writeHead = function(status, headers) {
    headers['cache-control'] = 'public, max-age=8640000';
    writeHead.call(this, status, headers);
  };
  callback();
};

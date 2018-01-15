const nunjucks = require('nunjucks');
const path = require('path');

module.exports = function(env, callback) {
  const optionDefaults = {
    autoescape: false,
    filterdir: process.cwd(),
    filters: [],
    filtermodules: [],
    extensions: {}
  };

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
        callback(null, new Buffer(this.template.render(locals)));
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
  callback();
};

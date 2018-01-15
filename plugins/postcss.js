const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

function loadPlugin(pluginSpec) {
  if (typeof pluginSpec === 'string') {
    pluginSpec = {path: pluginSpec};
  }

  const {path:pluginPath, params} = pluginSpec;

  let plugin;
  if (pluginPath.startsWith('.') || pluginPath.startsWith('/')) {
    plugin = require(path.join(process.cwd(), pluginPath));
  } else {
    plugin = require(pluginPath);
  }

  return plugin(params);
}

module.exports = (wintersmith, callback) => {
  class PostCSSPlugin extends wintersmith.ContentPlugin {
    constructor(_filepath, _text) {
      super();
      this._filepath = _filepath;
      this._text = _text;
    }

    getFilename() {
      return this._filepath.relative;
    }

    getView() {
      return (env, locals, contents, templates, callback) => {
        try {
          const options = env.config.postcss || {};
          options.filename = this.getFilename();
          options.paths = [path.dirname(this._filepath.full)];
          options.plugins = options.plugins || [];

          wintersmith.logger.verbose('loading postcss-plugins');
          const plugins = options.plugins.map(loadPlugin);

          wintersmith.logger.verbose('compile css');
          postcss(plugins)
            .process(this._text, options)
            .then(result => callback(null, new Buffer(result.css)))
            .catch(error => wintersmith.logger.error(error.toString()));
        } catch (error) {
          callback(error);
        }
      };
    }
  }

  PostCSSPlugin.fromFile = (filepath, callback) => {
    fs.readFile(filepath.full, (error, buffer) => {
      if (error) return callback(error);
      callback(null, new PostCSSPlugin(filepath, buffer.toString()));
    });
  };

  const files = wintersmith.config.postcss.entrypoint || '**/*.css';
  wintersmith.registerContentPlugin('styles', files, PostCSSPlugin);

  callback();
};

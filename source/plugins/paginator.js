module.exports = function (env, callback) {

  function Page() {
    var rtn = new env.plugins.Page();

    rtn.getFilename = function() {
      return 'index.html';
    },

    rtn.getView = function() {
      return function(env, locals, contents, templates, callback) {
        var error = null;
        var context = {};
        env.utils.extend(context, locals);
        var buffer = new Buffer(templates['index.jade'].fn(context));
        callback(error, buffer);
      };
    };
    return rtn;
  };

  /** Generates a custom index page */
  function gen(contents, callback) {
    var p = Page();
    var pages = {'index.page': p};
    var error = null;
    callback(error, pages);
  };

  env.registerGenerator('magic', gen);
  callback();
};

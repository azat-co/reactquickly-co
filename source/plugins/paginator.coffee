
module.exports = (env, callback) ->
  ### Paginator plugin. Defaults can be overridden in config.json
      e.g. "paginator": {"perPage": 10} ###

  defaults =
    template: 'index.html' # template that renders pages
    articles: 'projects' # directory containing contents to paginate

  # assign defaults any option not set in the config file
  options = env.config.paginator or {}
  for key, value of defaults
    options[key] ?= defaults[key]

  getArticles = (contents) ->
    # helper that returns a list of articles found in *contents*
    # note that each article is assumed to have its own directory in the articles directory
    articles = contents[options.articles]._.directories.map (item) -> item.index
    # skip articles that does not have a template associated
    articles = articles.filter (item) -> item.template isnt 'none'
    return articles

  class PaginatorPage extends env.plugins.Page
    ### A page has a number and a list of articles ###

    constructor: (@articles) ->

    getFilename: ->
        options.filename.replace '%d'

    getView: -> (env, locals, contents, templates, callback) ->
      # simple view to pass articles and pagenum to the paginator template
      # note that this function returns a funciton

      # get the pagination template
      template = templates[options.template]
      if not template?
        return callback new Error "unknown paginator template '#{ options.template }'"

      # setup the template context
      ctx = {@articles}

      # extend the template context with the enviroment locals
      env.utils.extend ctx, locals

      # finally render the template
      template.render ctx, callback

  # register a generator, 'paginator' here is the content group generated content will belong to
  # i.e. contents._.paginator
  env.registerGenerator 'paginator', (contents, callback) ->

    # find all articles
    articles = getArticles contents




    # callback with the generated contents
    callback null

  # add the article helper to the environment so we can use it later
  env.helpers.getArticles = getArticles

  # tell the plugin manager we are done
  callback()

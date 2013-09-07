var jsonSelect = require('JSONSelect'),
	_ = require('underscore'),
  flowActions = require('./flow');

exports.collectExpandedFlow = function(pathSelector, previewrFlow) {
  var flow = exports.collectFlow(pathSelector, previewrFlow);

  if (flow)
    return exports.expandFlow(flow, previewrFlow);

  return null;
}

// Returns the original array so be careful what you add or remove to it.
exports.collectFlow = function(pathSelector, previewrFlow) {
	var match = jsonSelect.match(exports.toCssSelector(pathSelector), previewrFlow);

  if (match.length == 0) {
    return null;
  }

  // Assume we only match one for now.
  var flow = match[0];
  if (!_.isArray(flow)) {
		flow = flow[exports.actionKey(flow)];
  }

  if (flow.length === 0) {
  	throw 'All flows must contain at least one action';
  }

  return flow;
}

exports.toCssSelector = function(pathSelector) {
  return '.' + pathSelector.replace(/\./g, ' .');
}

// Creates a copy of the array
exports.expandFlow = function(flow, previewrFlow) {
  var clonedFlow = [];
  flow.forEach(function(obj) {
    clonedFlow.push(_.clone(obj));
  });

  if (exports.actionKey(clonedFlow[0]) === 'inherit') {
  	var inheritSelector = clonedFlow.shift().inherit;
  	clonedFlow = exports.collectExpandedFlow(inheritSelector, previewrFlow).concat(clonedFlow);
  }

  return clonedFlow;
}

exports.actionKey = function(action) {
  return Object.keys(action)[0];
}

exports.actionDetails = function(action) {
  var name = exports.actionKey(action);
  return {
    name: name,
    value: action[name]
  };
}

exports.flowRunner = function(flow, cb) {
  var context = { scopes : [] };
  var runner = this;
  console.info('== flow runner ==');

  this.actionComplete = function(err) {
    console.info('== action complete ==');
    if (err)
      return cb(err);

    if (flow.length === 0) {
      context.$('body').append("<script>document.write('<script src=\"http://' + location.host.split(':')[0] + ':35729/livereload.js\"></' + 'script>')</script>");
      return cb(null, context.$.html());
    }

    runner.runNextFlow(flow);
  }

  this.runNextFlow = function(flow) {
    var action = exports.actionDetails(flow.shift());
    console.info('== starting action ' + action.name + '===');

    if (_.isUndefined(flowActions[action.name])) {
      throw 'The action "' + action.name + '" does not exist, please create it.';
    }

    console.info(action);
    flowActions[action.name](action.value, context, runner.actionComplete);
  }

  this.runNextFlow(flow);
}

exports.correctPathLocations = function(flow, root) {
  _.each(flow, function(action) {
    _.each(action, function(value, key) {
      if (key == "layout" || key == "load") {
        action[key] = root + action[key];
      }
    })
  });
}
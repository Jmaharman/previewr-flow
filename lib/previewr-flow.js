var _ = require('underscore'),
  flowUtils = require('./flowutils');


module.exports = exports = function(selector, previewrConfig, cb) {
  var flow = flowUtils.collectExpandedFlow(selector, previewrConfig);
  // TODO: Work out how to do this and what affects it.
  flowUtils.correctPathLocations(flow, './static/');

  if (flow == null)
    return cb('Flow not found for ' + selector, null);

  flowUtils.flowRunner(flow, cb);
};
var _ = require('underscore'),
  flowUtils = require('./flowutils');


module.exports = exports = function(pageUrl, dir, flowDetails, cb) {

  var flow = flowUtils.collectExpandedFlow(pageUrl, flowDetails);
  // TODO: Work out how to do this and what affects it.
  flowUtils.correctPathLocations(flow, dir);

  if (flow == null)
    return cb('Flow not found for ' + pageUrl, null);

  flowUtils.flowRunner(flow, cb);
};
'use strict';

var _ = require('lodash');
var Subformtext = require('./subformtext.model');

// Get list of subformtexts
exports.index = function(req, res) {
  Subformtext.find(function (err, subformtexts) {
    if(err) { return handleError(res, err); }
    return res.json(200, subformtexts);
  });
};

// Get a single subformtext
exports.show = function(req, res) {
  Subformtext.findById(req.params.id, function (err, subformtext) {
    if(err) { return handleError(res, err); }
    if(!subformtext) { return res.send(404); }
    return res.json(subformtext);
  });
};

// Creates a new subformtext in the DB.
exports.create = function(req, res) {
  Subformtext.create(req.body, function(err, subformtext) {
    if(err) { return handleError(res, err); }
    return res.json(201, subformtext);
  });
};

// Updates an existing subformtext in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Subformtext.findById(req.params.id, function (err, subformtext) {
    if (err) { return handleError(res, err); }
    if(!subformtext) { return res.send(404); }
    var updated = _.merge(subformtext, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, subformtext);
    });
  });
};

// Deletes a subformtext from the DB.
exports.destroy = function(req, res) {
  Subformtext.findById(req.params.id, function (err, subformtext) {
    if(err) { return handleError(res, err); }
    if(!subformtext) { return res.send(404); }
    subformtext.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Subformtext = require('./subformtext.model');

exports.register = function(socket) {
  Subformtext.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Subformtext.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('subformtext:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('subformtext:remove', doc);
}
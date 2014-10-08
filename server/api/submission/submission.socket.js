/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Submission = require('./submission.model');

exports.register = function(socket) {
  Submission.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Submission.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('submission:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('submission:remove', doc);
}
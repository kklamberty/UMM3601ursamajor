'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SubmissionSchema = new Schema({
  presenterName: String,
  coPresenters: Array,
  discipline: String,
  status: String,
  adviser: String,
  approval: Boolean,
  title: String,
  abstract: String
});

module.exports = mongoose.model('Submission', SubmissionSchema);
const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
  coursecode: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    min: [0, 'Cannot be negative'],
  },
});

module.exports = GradeSchema;

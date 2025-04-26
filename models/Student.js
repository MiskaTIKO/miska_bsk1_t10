const mongoose = require('mongoose');
const GradeSchema = require('./Grade');

const StudentSchema = new mongoose.Schema({
  studentcode: {
    type: String,
    unique: true,
    required: true,
    // match: /^[a-z]{1}[0-9]{4}$/,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  studypoints: {
    type: Number,
    required: true,
    min: [0, 'Cannot be negative'],
  },
  grades: { type: [GradeSchema], required: true },
});

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;

require('../dbconnection');
const Student = require('../models/Student');

(async () => {
  const students = await Student.find({ studypoints: { $lte: 5 } });
  console.log(students);
})();

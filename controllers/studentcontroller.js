/*
Kontrolleri on olio, joka sisältää metodeja. Se tehty siksi, että
saadaan erotettua reitit ja tietokantahakujen sovelluslogiikka toisistaan.
Se on siis arkkitehtuuriratkaisu. Eli saamme aikaan järkevämmän arkkitehtuurin
kun jaamme eri asioita tekevän koodin eri tiedostoihin ja kansioihin.
*/

const Student = require('../models/Student'); // haetaan model

// Tietokannan käsittelymetodit tehdään olion sisään
const StudentController = {
  /* 1) findAll -metodi hakee kaikki opiskelijat
  Student-modelin find-metodilla */
  findAll(req, res) {
    Student.find()
      .then((students) => {
        res.json(students);
      })
      .catch((error) => {
        throw error;
      });
  },
  //2) Yhden opiskelijan haku ID:n perusteella
  findById(req, res) {
    Student.findOne({ _id: req.params.id })
      //Perus virheenkäsittely - Jos ei tule virheitä, saadaan opiskelija json-muodossa
      .then((student) => {
        res.json(student);
      })
      .catch((error) => {
        throw error;
      });
  },

  //3) Haku opiskelijakoodin perusteella
  findByStudentCode(req, res) {
    Student.findOne({ studentcode: req.params.scode })
      .then((student) => {
        res.json(student);
      })
      .catch((error) => {
        throw error;
      });
  },

  //4) Uuden opiskelijan lisääminen
  async add(req, res) {
    const newstudent = Student(req.body);

    const student = await Student.create(newstudent).catch((err) => {
      throw err;
    });

    console.log('Success! Student added to db: ' + student);
    res.json(student);
  },

  //5) Opiskelijan poistaminen ID:n perusteella
  deleteById(req, res) {
    Student.findOneAndDelete({ _id: req.params.id })
      .then((student) => {
        res.json(student);
      })
      .catch((error) => {
        throw error;
      });
  },

  //6) Opiskelijan muokkaus
  async update(req, res, next) {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).catch((err) => {
      throw err;
    });
    res.json(student);
  },

  //7) Haetaan opiskelija, joilla on URL:ssa annettua arvoa vähemmän pisteitä
  async findByStudyPoints(req, res) {
    Student.find({
      studypoints: { $lte: req.params.studypoints },
    })
      .then((students) => {
        res.json(students);
      })
      .catch((error) => {
        throw error;
      });
  },

  //8) Arvosanan ja opintopisteiden lisäys samalla
  async addGrade(req, res) {
    try {
      const studentId = req.params.id;
      const { coursecode, grade } = req.body;
      const student = await Student.findById(studentId);

      student.grades.push({ coursecode, grade });
      const totalPoints = student.grades.reduce(
        (total, grade) => total + grade.grade,
        0
      );
      student.studypoints = totalPoints;
      await student.save();

      res.json(student);
    } catch (error) {
      throw error;
    }
  },
  //9) Arvosanan muokkaus
  updateGrade: (req, res) => {
    Student.findOneAndUpdate(
      {
        studentcode: req.params.scode,
        'grades.coursecode': req.params.ccode,
      },
      {
        $set: { 'grades.$.grade': req.body.grade },
      }
    ).then((student) => {
      console.log('Document inserted succesfully: ' + student);
      res.json(student);
    });
  },

  //10) Opiskelijoiden haku tietyn kurssin perusteella
  findByCourseCode: (req, res) => {
    const coursecode = req.params.coursecode;
    Student.find({ 'grades.coursecode': coursecode }).then((students) => {
      res.json(students);
    });
  },
};

module.exports = StudentController;

/*
students.js -reittitiedostossa kontrollerin metodia kutsutaan tällä tavalla:
 
router.get('/', StudentController.findAll);
 
jolloin kaikki opiskelijat saadaan JSON-muodossa osoitteesta http://localhost:3000/students/

*/

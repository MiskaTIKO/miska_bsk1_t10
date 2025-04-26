//Reititystiedosto studentdb-kantaa manipuloiville reiteille.

const express = require('express');
const router = express.Router();
const sc = require('../controllers/studentcontroller');
const authorize = require('../verifytoken'); //autorisaatio

// 1) Haetaan kaikki opiskelijat
router.get('/', sc.findAll);

// 3) Haku opiskelijakoodin perusteella
// localhost:3000/students/scode/OPISKELIJAN KOODI TÄHÄN
router.get('/scode/:scode', sc.findByStudentCode);

// 7) Haetaan opiskelija, joilla on URL:ssa annettua arvoa vähemmän pisteitä
router.get('/spoints/:studypoints', sc.findByStudyPoints);

// 9) Arvosanan muokkaus
// localhost:3000/students/updategrade/A123/MBN20004
router.put('/updategrade/:scode/:ccode', authorize, sc.updateGrade);

// 2) Haetaan opiskelija ID:n perusteella
// http://localhost:3000/students/68093b437ec7f5f95df4266d
router.get('/:id', sc.findById);

// 4) Postataan uusi opiskelija
router.post('/', authorize, sc.add);

// 5) Poistetaan opiskelija ID:n perusteella
router.delete('/:id', authorize, sc.deleteById);

// 6) Opiskelijan muokkaus
router.put('/:id', authorize, sc.update);

// 8) Arvosnan ja 5 opintopisteen lisääminen opiskelijan ID:n perusteella
router.put('/addgrade/:id', authorize, sc.addGrade);

// 10) Haetaan opiskelijta kurssikoodin perusteella
//localhost:3000/students/coursecode/:coursecode
router.get('/coursecode/:coursecode', sc.findByCourseCode);

module.exports = router;

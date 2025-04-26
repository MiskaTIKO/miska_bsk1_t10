const express = require('express');
const router = express.Router();

const uc = require('../controllers/usercontroller'); //user-reittien kontrolleri

//tehdään uusi tunnus ja salasana käyttäjälle tietokantaan
//http://localhost:3000/users/register
router.post('/register', uc.registerUser);

//krijaudutaan käyttäjällä kantaan
//http://localhost:3000/users/login
router.post('/login', uc.authenticateUser);

module.exports = router;

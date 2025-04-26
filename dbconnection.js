const mongoose = require('mongoose');
const Student = require('./models/Student');
const dotenv = require('dotenv').config();

console.log(process.env.MONGODB_URL);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Saatiin yhteys tietokantaan!');
  })
  .catch((err) => {
    console.error('Virhe yhdistettäessä tietokantaan: ' + err);
  });

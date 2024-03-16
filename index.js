require('dotenv').config(); // for loading the .env file variables
const express = require('express');
const cors = require('cors');

const movieRouter = require('./routes/movieRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const { sequelize} = require('./sequelize');

const app = express();
app.use(cors()); // for remove cors error
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



// connect db
try {
    (async () => {
      await sequelize.sync({ alter: true }); // # force : true will drop if tables exists
    })();
} catch (err) {
    console.error("error in syncing: ", err);
}

app.use('/movie',movieRouter);
app.use('/review', reviewRouter)


app.listen(process.env.SERVER_PORT, () => {
  console.log('Server listening on port ', process.env.SERVER_PORT);
});

module.exports = app;
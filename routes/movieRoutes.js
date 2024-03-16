const express = require('express');
const router = express.Router();
const {getAllMovies, addMovie, updateMovie, deleteMovie } = require('./../controller/movie.controller')


router.get('/all/', getAllMovies);
router.post('/add/', addMovie);
router.put('/edit/:id', updateMovie);
router.delete('/delete/:id', deleteMovie);

module.exports = router;
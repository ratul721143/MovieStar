const express = require('express');
const router = express.Router();

const {getReviews, addReview, updateReview ,deleteReview } = require('../controller/review.controller')


router.get('/:movieId', getReviews);
router.post('/add/', addReview);
router.put('/edit/:id', updateReview);
router.delete('/delete/:id', deleteReview);

module.exports = router;
const {sequelize, Review} = require('../sequelize');
const {response } = require('../utils')

const addReview = async (req, res) =>{
    const { movie_id, reviewer_name,  rating, comment} = req.body;

    if (rating > 10) res.status(400).send(response('rating should be less than 10', false));

    try {
        // Create a new review record in the database
        const newReview = await Review.create({
            rating: rating,
            comment: comment,
            review_by: reviewer_name,
            movie_id: movie_id
        });

        res.json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).send('Failed to add review');
    }
}

const getReviews = async (req, res) =>{
    const { movieId } = req.params; 

    try {
        // Fetch all reviews associated with the specified movie ID
        const reviews = await Review.findAll({
            where: { movie_id: movieId } // Filter reviews by movie ID
        });

        res.json({'reviews': reviews});
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).send('Failed to fetch reviews');
    }
}

const updateReview = async (req, res) =>{
    const { id } = req.params; // Assuming the review ID is passed as a URL parameter
    const { rating, comment, reviewer_name } = req.body; // Extract updated review data from request body

    try {
        // Find the review record in the database
        const review = await Review.findByPk(id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        // Update the review record with the new data
        await review.update({
            rating: rating || review.rating, 
            comment: comment || review.comment,
            review_by: reviewer_name || review.review_by,
        });

        res.json({ message: 'Review updated successfully', review: review });
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).send('Failed to update review');
    }
}

const deleteReview = async (req, res) =>{
    const { id } = req.params;

    try {
        // Find the review record in the database
        const review = await Review.findByPk(id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        // Delete the review record from the database
        await review.destroy();

        res.send(response('Review deleted successfully'));
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).send('Failed to delete review');
    }
}

module.exports = {
    addReview,
    getReviews,
    updateReview,
    deleteReview
}
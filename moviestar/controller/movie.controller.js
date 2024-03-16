const {sequelize, Movie, User, Review} = require('../sequelize');
const {response } = require('../utils')
const {get_movie_avg_ratings} = require('../services/review')


const addMovie = async (req, res) =>{

    const {name, release_date} = req.body;
    console.log(req.body)

    try {
    const newMovie = await Movie.create({
        name: name,
        release_date: release_date,
        created_by: 1
    });

    res.send(response('successfully add movie'));
    }catch (error) {
        // Check if the error is a duplicate key violation
        if (error.name === 'SequelizeUniqueConstraintError' && error.fields && error.fields.name) {
            // Send a 400 Bad Request status with an error message indicating duplicate movie name
            res.status(400).send(response('Movie with this name already exists',false ));
        } else {
            res.status(500).send(response('Failed to add movie', false));
        }
    }
}


const updateMovie = async (req, res) => {

    const { id } = req.params; 
    const name = req.body.name || null;
    const release_date = req.body.release_date || null;

    if (!name && !release_date )  return res.status(400).send(response('You have to sent something for update', false));

    try {
        // Check if the movie with the specified ID exists in the database
        const existingMovie = await Movie.findByPk(id);
        if (!existingMovie) {
            return res.status(404).send(response('Movie not found' , false));
        }

        // Update the movie record in the database
        const updatedFields = {};
        if (name) {
            updatedFields.name = name;
        }
        if (release_date) {
            updatedFields.release_date = release_date;
        }

        // Update the movie record in the database
        await existingMovie.update(updatedFields);


        res.send(response('successfully update movie'));
    } catch (error) {
        res.status(500).send('Failed to update movie');
    }

    
}


const getAllMovies = async (req, res) => {
    try {
        // Fetch all movies from the database
        const movies = await Movie.findAll({
            attributes: ['id', 'name', 'release_date', [sequelize.literal('"User"."username"'), 'creator_name']], // Select specific attributes from movies table
            include: [{
                model: User,
                attributes: []
                
            }]
        });
        
        let movies_ids = movies.map(movie => movie.id)
        const movie_rating_map = await get_movie_avg_ratings(movies_ids)
        
        const moviesWithFormattedDates = movies.map(movie => ({
            ...movie.toJSON(),
            release_date: new Date(movie.release_date).toDateString(), // Convert to a normal date format
            rating: movie_rating_map[movie.id]?.ratings || null
        }));


        res.json({"movies":moviesWithFormattedDates});
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).send('Failed to fetch movies');
    }

}

const deleteMovie = async (req, res) => {
    const { id } = req.params; // Assuming the movie ID is passed as a URL parameter

    try {
        // Find the movie record in the database
        const movie = await Movie.findByPk(id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        // Delete the movie record from the database
        await movie.destroy();

        res.send(response('Movie deleted successfully' ));
    } catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).send('Failed to delete movie');
    }
}

module.exports = {
    addMovie,
    updateMovie,
    getAllMovies,
    deleteMovie
}
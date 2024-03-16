const {sequelize, Review} = require('../sequelize')

const get_movie_avg_ratings = async(movie_ids) =>{
    const averageRatings = await Review.findAll({
        attributes : ['movie_id', [sequelize.fn('AVG', sequelize.col('rating')), 'average_rating']],
        where: { movie_id : movie_ids },
        group : 'movie_id'
    });
    
    let resultMap = {};
    averageRatings.forEach((result) => {
        resultMap[result.getDataValue('movie_id')] = { 
        'ratings': result.getDataValue('average_rating')
        };
    });

    return resultMap
}

module.exports = {
    get_movie_avg_ratings
}
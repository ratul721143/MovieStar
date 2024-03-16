const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');


let options = {}
options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };

options.database = process.env.DB_NAME;
options.host = process.env.DB_HOST
options.port = process.env.DB_PORT
options.dialect = "postgres";
options.logging = false; // false if do not need to print queries

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    options
);


sequelize
  .authenticate()
  .then(() => {
    console.log(`Postgres connection has been established successfully with host: ${options.host}:${options.port}.`);
    
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });


// model are defined here
  const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

const Movie = sequelize.define('Movie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    created_by: {
        type: DataTypes.INTEGER
    },
    release_date: {
        type : DataTypes.DATE
    }
});

// Define association between User and Movie models
User.hasMany(Movie, { foreignKey: 'created_by' });
Movie.belongsTo(User, { foreignKey: 'created_by' });

const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    comment: {
        type: DataTypes.STRING
    },

    review_by: {
        type: DataTypes.STRING
    },

    movie_id : {
        type: DataTypes.INTEGER
    }
});

Movie.hasMany(Review, { foreignKey: 'movie_id' });
Review.belongsTo(Movie, { foreignKey: 'movie_id' });



module.exports = { sequelize , User , Movie, Review};


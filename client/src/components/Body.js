import React, { useState, useEffect } from 'react'
import Moviecard from './Moviecard'
import { BACKEND_URL } from '../constants';
import { Link } from 'react-router-dom';

const Body = () => {
  const [movies, setMovies] = useState([]);
  // const movies = ['Mov 1', 'Mov 2', 'Mov 3'];

  useEffect(()=>{
    fetchData();
  }, []);

  const fetchData = async () => {
    fetch( BACKEND_URL +  '/movie/all/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
      
    }).then(res => {
      return res.json();
    }).then(data => {
      console.log(data.movies);
      setMovies(data.movies);
    })
  }

  return (
    <div className='p-6'>
      <h1 className='text-lg'>The best movies review site!</h1>
      <input className='my-6 border border-gray-400 rounded-lg' type='text' placeholder='Search' value='' />
      <div className='flex gap-10'>
        {
          movies.map((movie, idx) => {
            return (
              // <Link to='/movie/4' key={idx}> <Moviecard/> </Link> 
              <Link to={`/review/${movie.id}`} > <Moviecard data = {movie}/> </Link>
            )
          })
        }
      </div>
      
      <div className='flex gap-20'>
          {
              // movies.map((movie) => {
              //     return (
              //         <Link to = '/movie/1' key='1'><Moviecard {...movie} /></Link>
              //     )   
              // })
          }
      </div>
    </div>
  )
}

export default Body
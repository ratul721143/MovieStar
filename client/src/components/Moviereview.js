import React, {useEffect, useState} from 'react'
import Reviewcard from './Reviewcard';
import { BACKEND_URL } from '../constants';
import { useParams } from 'react-router-dom';

const Moviereview = () => {
  const [reviews, setReviews] = useState([]);
  const params = useParams()
  console.log(params)
    
    useEffect(()=>{
      fetchData();
    }, []);


    const fetchData = async () => {
      fetch( BACKEND_URL +  `/review/${params.movieId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
        
      }).then(res => {
        return res.json();
      }).then(data => {
        console.log(data.reviews);
        setReviews(data.reviews);
      })
    }

  return (
    <div className='p-6'>
        <h1 className='text-lg mb-4'>Movie Name</h1>
        
        <div className='flex flex-col gap-10'>
        {
          reviews.map((review, idx) => {
            return (
              // <Link to='/movie/4' key={idx}> <Moviecard/> </Link> 
              <Reviewcard data = {review}/>
            )
          })
        }
        </div>

    </div>
  )
}

export default Moviereview
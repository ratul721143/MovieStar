import React from 'react'

const Reviewcard = ({data}) => {
  return (
    <div className='w-full border-2 border-grey-400'>
        <div className='mx-2 my-4 flex flex-row justify-between'>
            <p>{data.comment}</p>
            <p>{data.rating}/10</p>
        </div>
        <div className='mx-2 my-4 flex flex-row justify-between'>
            <p>By: {data.review_by}</p>
            <div className='flex justify-end gap-4 mt-4'>
                <button className=''>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    </div>
  )
}

export default Reviewcard
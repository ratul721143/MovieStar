import React, {useState} from 'react'

const Moviecard = ({data}) => {

    const [isEditing, setIsEditing] = useState(false);
    // const [formData, setFormData] = useState({ ...cardData });
  
    const handleEdit = () => {
      setIsEditing(true);
    };
  
    // const handleChange = (e) => {
    //   const { name, value } = e.target;
    //   setFormData(prevData => ({
    //     ...prevData,
    //     [name]: value
    //   }));
    // };
  
    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   onUpdate(formData); // Pass updated data to parent component
    //   setIsEditing(false);
    // };

  return  (
    <>
     {/* {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
          <button type="submit">Save</button>
        </form>
      ) : ( */}

        <div className='p-4 bg-slate-400 w-56'>
            <p>Stars Wars: {data.name}</p>
            <p>Released: {data.release_date}</p>
            <p>Rating: {data.rating ? data.rating : 0 }/10</p>
            <div className='flex justify-end gap-4 mt-4'>
                <button className='' onClick={handleEdit}>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    {/* )} */}
    </>
    
  )
}

export default Moviecard
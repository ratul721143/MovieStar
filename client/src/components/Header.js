import React, {useState} from 'react'

const Header = () => {

    const [formData, setFormData] = useState({
        movie: '',
        date: '',
    });

    const [formData2, setFormData2] = useState({
        reviewer: '',
        rating: '',
        review: '',
        movie: ''

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChange2 = (e) => {
        const { name, value } = e.target;
        setFormData2(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        closeModal();
    };

    const handleSubmit2 = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData2);
        closeModal2();
    };

    const Modal = ({ isOpen, onClose }) => {
        if (!isOpen) return null;
      
        return (
          <div className="modal w-60 bg-gray-200 absolute top-48 left-48">
            <div className="modal-content flex flex-col m-4">
              <span className="close text-right" onClick={onClose}>&times;</span>
              <h1>Add new movie</h1>
              <form onSubmit={handleSubmit}>
                <input className='my-2 border w-full border-gray-400 rounded-sm' name='movie' type='text' placeholder='Name' value={formData.movie} onChange={handleChange} />
                <input className='my-2 border w-full border-gray-400 rounded-sm' name='date' type='text' placeholder='Release Date' value={formData.date} onChange={handleChange} />

                <div className='flex justify-end'>
                <button type='submit' className='bg-violet-500 text-white px-2 py-1 mt-2 '>Create Movie</button>
                </div>
              </form>
            </div>
          </div>
        );
      };

      const Modal2 = ({ isOpen, onClose }) => {
        if (!isOpen) return null;
      
        return (
          <div className="modal w-60 bg-gray-200 absolute top-48 left-48">
            <div className="modal-content flex flex-col m-4">
              <span className="close text-right" onClick={onClose}>&times;</span>
              <h1>Add new review</h1>

              <form onSubmit={handleSubmit2}>
                <select className='my-4 bg-white w-full' name='' onChange={handleChange2}>
                    <option value="">Select</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>
                <input className='my-2 w-full border border-gray-400 rounded-sm' type='text' placeholder='Name' value={formData2.reviewer} onChange={handleChange2} />
                <input className='my-2 w-full border border-gray-400 rounded-sm' type='text' placeholder='Release Date' value={formData2.date} onChange={handleChange2} />

                <textarea className='w-full' id="message" name="message" value={formData.review} onChange={handleChange2} />
                
                <div className='flex justify-end'>
                    <button type='submit' className='bg-violet-500 text-white px-2 py-1 mt-2 '>Add review</button>
                </div>
              </form>
            </div>
          </div>
        );
      };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModal2Open, setIsModal2Open] = useState(false);

    const openModal = () => {
        setIsModal2Open(false);
        setIsModalOpen(true);
        
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const openModal2 = () => {
        setIsModalOpen(false);
        setIsModal2Open(true);
        
    };

    const closeModal2 = () => {
        setIsModal2Open(false);
    };

  return (
    <div className='flex justify-between p-5 bg-gray-400'>
        <div className='flex items-center'>MOVIECRITIC</div>
        <div className='flex gap-10'>
            <button onClick={openModal} className='bg-white text-black rounded-md px-4 py-2'>Add New Movie</button>
            <button onClick={openModal2} className='bg-blue-600 text-white rounded-md px-4 py-2'>Add New Review</button>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} />
        <Modal2 isOpen={isModal2Open} onClose={closeModal2} />
        <div className=''>

        </div>
    </div>
  )
}

export default Header
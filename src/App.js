import './App.css';
import { useState, useEffect } from 'react';
import { BsFillTrash3Fill} from "react-icons/bs";


function App() {

  const [formData, setFormData] = useState({ title: "", author: "", isbn: "" })
  
  const initialBooks = JSON.parse(localStorage.getItem("bookSet")) || [];
  const [AllBooks, setAllBooks] = useState(initialBooks);
   
  const handleDelete = (id) => {
     const updatedBooks = AllBooks.filter((book, index) => index !== id);
    setAllBooks(updatedBooks);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value }
    })
  }

  useEffect(() => {
    console.log("all books are", AllBooks);
    localStorage.setItem("bookSet",JSON.stringify(AllBooks));
  }, [AllBooks]); // This effect will run whenever AllBooks state is updated


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("one book is", formData);
    setAllBooks((prev) => {
      return [...prev, formData]
    })
    console.log("all books are", AllBooks)
   
    setFormData({ title: "", author: "", isbn: "" });

  }


  return (
    <div className="h-screen">
      
      <div className='h-1/6  bg-pink-100 flex flex-col justify-center items-center'>
        <div className='text-[3rem] font-bold text-slate-800'>BookList App</div>
        <div className='text-[2rem] font-medium text-slate-800'>Add and view your books using local storage</div>
      </div>
     
      <div className='bg-slate-200 h-5/6 flex justify-center  sm:flex-col lg:flex-row'>
    
    

        
        <div className='w-[50%] bg-pink-200 h-full flex justify-center items-center'>
          <div className='rounded-[1.5rem]  h-[20rem] w-[25rem] bg-slate-800 text-white flex flex-col justify-center items-center' >
            <form className='flex flex-col justify-center items-center'>
              <label className=' mb-[1rem] flex flex-col justify-start items-start'>
                Title
                <input className='rounded-[0.5rem] mt-[0.5rem] h-[2rem] w-[22rem] text-center text-black' placeholder='enter title of book'
                  onChange={handleChange}
                  name='title'
                  value={formData.title}
                />
              </label>

              <label className='mb-[1rem] flex flex-col justify-center items-start'>
                Author
                <input className='rounded-[0.5rem] mt-[0.5rem]  h-[2rem] w-[22rem] text-center text-black' placeholder='enter author of book'
                  onChange={handleChange}
                  name='author'
                  value={formData.author}
                />
              </label>

              <label className='mb-[1rem] flex flex-col justify-center items-start'>
                ISBN#
                <input className='rounded-[0.5rem] mt-[0.5rem]  h-[2rem] w-[22rem] text-center text-black' placeholder='enter isbn no. of book'
                  onChange={handleChange}
                  name='isbn'
                  value={formData.isbn}
                />
              </label>

              <button className='h-[2rem] w-[22rem] bg-green-500 font-medium text-black rounded-[0.5rem] mt-[1rem] ' onClick={handleSubmit}>
                Add
              </button>

            </form>

          </div>
        </div>

        <div className='w-[50%] bg-pink-200 h-full  flex justify-center items-center'>
          
           {/* <table className='rounded-[1.5rem]  h-[20rem] w-[25rem] bg-slate-800 text-white flex flex-col justify-center items-center '> */}
           <table className='rounded-[1.5rem]  bg-slate-800 text-white flex flex-col justify-center items-center '>
          {/* <thead className='h-[3rem] w-[22rem]   flex  justify-center items-center'> */}
          <thead className='  flex  justify-center items-center'>
           <tr className=''>
           <th className='text-[1.2rem] px-[1.3rem] py-2'>ISBN#</th>
           <th className='text-[1.2rem] px-[1.3rem] py-2'>Title</th>
          
           <th className=' text-[1.2rem] px-[1.3rem] py-2'>Author</th>
           <th className='text-[1.2rem] px-[1.3rem] py-2'>Delete</th>
          
           </tr>
           </thead>
           <div className=' h-[0.1rem] w-[22rem] bg-white mb-[1rem]'></div>
          {
           (AllBooks.length==0)?
           (
            <p>sorry you don't have any book</p>

           )
           :
           (
          //  <tbody className='overflow-y-auto h-[15rem] w-[22rem] flex flex-col justify-center items-center '>
             <tbody className='mb-[1rem] max-h-64 overflow-y-auto  flex flex-col justify-center items-center '>
           {
           AllBooks.map((book,id)=>(
            <tr className=' my-[0.5rem] h-[2rem] w-[22rem] flex  text-white justify-evenly items-center  '>
              <td className='text-[1.2rem]  font-medium '>{book.isbn}</td>
           <td className=' text-[1.2rem]  font-medium  '>{book.title}</td>
          
           <td className=' text-[1.2rem]  font-medium  '>{book.author}</td>
           <td className='text-[1.2rem]   font-medium '><BsFillTrash3Fill onClick={()=>{handleDelete(id)}}/></td>
           {/* px-[1.3rem] py-2 */}


            
            
             </tr>
           ))

          }
          </tbody>
           )
        }
          </table>
         
        </div>

      </div>

    </div>
  );
}

export default App;

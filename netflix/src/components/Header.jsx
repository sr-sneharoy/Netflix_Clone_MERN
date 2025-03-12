import axios from 'axios';
import React from 'react'
import { IoIosArrowDropdown } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { API_END_POINT } from '../utils/constant';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/userSlice';
import toast from 'react-hot-toast';


const Header = () => {
  const user = useSelector((store) => store.app.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${API_END_POINT}/logout`, { withCredentials: true });
      if(res.data.success)
        toast.success(res.data.message);
      
      dispatch(setUser(null));
      navigate("/");
    } catch (err){
      console.log(err);
    }
  }


  return (
    <div className='absolute z-10 px-6 py-1 flex w-[100%] items-center justify-between bg-gradient-to-b from-black'>
      <img className=' w-56 ' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png" alt="netflix-logo" />

      {
        user && (
          <div className='flex items-center'>
            <IoIosArrowDropdown size='24px' color='white'/>
            <h1 className='text-lg ml-2 font-medium text-white'>{user.fullName}</h1>
            <div className='ml-4'>
              <button className='bg-red-800 text-white rounded px-4 py-2 cursor-pointer' onClick={logoutHandler}>Logout</button>
              <button className='bg-red-800 text-white rounded px-4 py-2 cursor-pointer ml-2'>Search Movies</button>
            </div> 
          </div>
        )
      }


    </div>
  )
}

export default Header
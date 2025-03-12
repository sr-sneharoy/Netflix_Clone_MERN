import React from 'react';
import Header from './Header';
import axios from 'axios';
import { API_END_POINT } from '../utils/constant.jsx';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../redux/userSlice.jsx';

const Login = () => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLogin, setIsLogin] = React.useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(store => store.app.isLoading);

  const loginHandler = () => {
    setIsLogin(!isLogin);
  }

  const getInputData = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    if(isLogin){
      const user = {
        email,
        password
      }
      try{
        const res = await axios.post(`${API_END_POINT}/login`, user, {
          headers: {
            'Content-Type': 'application/json'
          }, withCredentials: true
        });
        // console.log(res);
        if(res.data.success)
          toast.success(res.data.message);

        dispatch(setUser(res.data.user));

        navigate('/browse');

      }catch(err){
        toast.error(err.response.data.message);
        console.log(err);
      } finally {
        dispatch(setLoading(false));
      }

    }
    else{
      const user = {
        fullName,
        email,
        password
      }
      try{
        const res = await axios.post(`${API_END_POINT}/register`, user, {
          headers: {
            'Content-Type': 'application/json'
          }, withCredentials: true
        });
        // console.log(res);
        if(res.data.success)
          toast.success(res.data.message);

        setIsLogin(true);
      }catch(err){
        toast.error(err.response.data.message);
        console.log(err);
      } finally {
        dispatch(setLoading(false));
      }
    }
    

    setFullName("");
    setEmail("");
    setPassword("");
  } 
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="w-[100vw] h-[100vh] bg-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="banner"
        />
      </div>

      <form onSubmit={getInputData} action="" className='flex flex-col w-[350px] p-12 my-36 left-0 right-0  mx-auto items-center justify-center absolute rounded-md bg-black opacity-90'>
        <h1 className='text-3xl text-white mb-5 font-bold'>{isLogin ? "Log In" : "Sign Up" }</h1>
        <div className='flex flex-col w-full'>
          {
            !isLogin && <input onChange={(e) => setFullName(e.target.value)} value={fullName} type="text" placeholder='Username' className='outline-none w-full p-3 my-2 rounded-sm bg-gray-800 text-white'/>
          }
          <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Email' className='outline-none w-full p-3 my-2 rounded-sm bg-gray-800 text-white'/>
          <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Password' className='outline-none w-full p-3 my-2 rounded-sm bg-gray-800 text-white'/>
          <button type='submit' className='bg-red-600 mt-6 p-3 text-white rounded-sm font-medium cursor-pointer'>{`${isLoading ? "Loading...." : (isLogin ? "Log In" : "Sign Up")}`}</button>
          <p className='text-white mt-2'>{isLogin ? "New to Netflix?" : "Already have an account?" } <span onClick={loginHandler} className='cursor-pointer ml-1 text-blue-700 font-medium '>{isLogin ? "Sign Up" : "Log In"}</span> </p>
        </div>09 
       </form>

    </div>
  );
};

export default Login;

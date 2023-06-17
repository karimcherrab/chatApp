import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import {BiLogOut} from 'react-icons/bi'
const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='flex w-full px-3  h-[10%] justify-between items-center   '>
        <div className='flex gap-2 justify-center items-center'>
            <img className='w-8 h-8 rounded-full' src={currentUser.photoURL} alt=''/>
            <p  className='text-black text-base '>{currentUser.displayName}</p>
         
        </div>


        <BiLogOut 
         className='text-blue-500 w-8 h-8 text-base py-1 px-1 '
        onClick={()=>signOut(auth)}/>
      
                     
 </div>

    // <div className='navbar'>
    //   <div className="user">
    //     <img src={currentUser.photoURL} alt="" />
    //     <span>{currentUser.displayName}</span>
    //     <button onClick={()=>signOut(auth)}>logout</button>
    //   </div>
    // </div>
  )
}

export default Navbar
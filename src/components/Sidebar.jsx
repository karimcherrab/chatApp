import React from "react";
import Navbar from "./Navbar"
import Search from "./Search"

const Sidebar = () => {
  return (
    <div className='w-[33%] bg-slate-50 h-full'>

     <Navbar />
     <Search/> 
  
    </div>
  );
};

export default Sidebar;

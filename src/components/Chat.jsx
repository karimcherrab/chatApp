import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className='w-[67%] bg-slate-50 h-full flex flex-col shadow-lg'>
      <div className=" rounded-lg mt-4 bg-slate-50 shadow my-2 mx-2 px-3 h-[10%] flex justify-start items-center ">
      <img className='h-10 w-10 rounded-full' src={data.user?.photoURL} alt=''/>

      <span className="ml-3" >{data.user?.displayName}</span>
      </div>
      <Messages /> 
      <Input/>
    </div>
  );
};

export default Chat;

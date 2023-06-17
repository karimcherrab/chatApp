import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="mt-4 flex flex-col gap-4 ">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
      
          <div   key={chat[0]}  onClick={() => handleSelect(chat[1].userInfo)} className='flex  justify-start items-start gap-2'>
          <img className='h-12 w-12 rounded-full' src={chat[1].userInfo.photoURL} alt=''/>
          <div className='flex flex-col gap-0 items-start justify-center'>
              <span className='text-black text-md font-semibold' >{chat[1].userInfo.displayName}</span>
              <span className='text-gray-300 w-[100%] break-words truncate text-base '>{chat[1].lastMessage?.text}</span>
          </div>
      </div>
      ))}
    </div>
  );
};

export default Chats;

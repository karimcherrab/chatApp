import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import Chats from "./Chats"
import {AiOutlineSearch} from 'react-icons/ai'
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };
  return (

    <div className="bg-white h-[88%] mx-4 py-2 px-2 rounded-lg">
      

<div className='border  py-1.5 px-2   rounded-[20px]  flex bg-slate-50 w-full '>
          <AiOutlineSearch className='w-[25px] h-[25px] text-slate-400 bg-slate-50'/>
          <input
           className='focus:outline-none px-2 py-0  bg-slate-50 '
           type="text"
           placeholder="Find a user"
           onKeyDown={handleKey}
           onChange={(e) => setUsername(e.target.value)}
           value={username}/>
     </div>
    
      {err && <span>User not found!</span>}
      {user && (
      

          <div className='flex  justify-start items-center gap-2 mt-4' onClick={handleSelect}>
                  <img className='h-10 w-10 rounded-full' src={user.photoURL} alt=''/>
                  <span className='text-black text-md font-semibold' >{user.displayName}</span>
           </div>
      )}


     <Chats/>  
    </div>
  );
};

export default Search;

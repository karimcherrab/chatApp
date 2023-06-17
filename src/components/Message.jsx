import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`flex  ${message.senderId === currentUser.uid && "flex  flex-row-reverse"}`}
    > 
      <div className="flex justify-center items-center ">
        <img
        className="w-10 h-10 rounded-full"
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
       
      </div>
      <div
       className=
       {`flex justify-center items-center mx-2 py-2 px-2 
       rounded-[15px] bg-white
       max-w-[250px]

        ${message.senderId === currentUser.uid  && "bg-blue-500 text-white "} `}>
        <p class="w-full break-words">{message.text}</p>
        {message.img && <img  src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;

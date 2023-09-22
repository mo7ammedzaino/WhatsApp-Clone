import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../css/sidebarChat.css";
import { collection, addDoc, onSnapshot } from "firebase/firestore"; // استيراد doc من firebase/firestore
import { Link } from "react-router-dom";
import { firestore, roomsRef } from "../firebase";

const SidebarChat = ({ id, name, addNewChat }) => {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (id) {
      // استخدم مرجعًا لحفظ الاشتراك في الاستعلام
      const roomMessagesCol = collection(roomsRef, id, "messages"); // تحديد مجموعة الرسائل داخل الغرفة

      onSnapshot(roomMessagesCol, (snapshot) => {
        // استخدام onSnapshot للاشتراك في التغييرات
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = async () => {
    const roomName = prompt("Please enter the name of the chat");

    if (roomName) {
      try {
        const docRef = await addDoc(roomsRef, {
          name: roomName,
        });

        collection(firestore, "rooms", docRef.id);

        console.log("Chat room added with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding chat room: ", error);
      }
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebar_chat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebar_chat__info">
          <h2>{name}</h2>
          <p>
            {messages.length ? messages[messages.length - 1].message : "..."}
          </p>{" "}
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebar_chat">
      <h2>Add New Chat</h2>
    </div>
  );
};

export default SidebarChat;

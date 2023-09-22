import { useEffect, useState } from "react";
import "../css/chat.css";
import { Avatar, IconButton } from "@mui/material";
import {
  AttachFile,
  MoreVert,
  SearchOutlined,
  InsertEmoticonOutlined,
  Mic,
} from "@mui/icons-material";
import {
  addDoc,
  serverTimestamp,
  getDoc,
  doc,
  collection,
} from "firebase/firestore"; // استيراد Firestore من Firebase Modular SDK
import { useParams } from "react-router-dom";
import { firestore, roomsRef } from "../firebase";

const Chat = ({ user }) => {
  const [seed, setSeed] = useState("");
  const [message, setMessage] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);

  const { roomId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (roomId) {
        const chatDocRef = doc(roomsRef, roomId);
        const res = await getDoc(chatDocRef);
        const room = res.data();
        setRoomName(room.name);
      }
    };

    fetchData();
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (roomId) {
      try {
        const messagesRef = collection(firestore, roomsRef, "messages");

        await addDoc(messagesRef, {
          uid: user.id,
          name: user.displayName,
          message,
          timestamp: serverTimestamp(),
        });

        setMessage("");
      } catch (error) {
        console.error("حدث خطأ أثناء إرسال الرسالة:", error);
      }
    }
  };

  const parseTimestamp = (timestamp) => {
    try {
      let time = timestamp.split(" ")[4];
      time = time.split(":");
      let hour = parseInt(time[0]);
      let meridiem = "AM";
      if (hour > 12) {
        meridiem = "PM";
      }
      let minutes = parseInt(time[1]);
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      time = hour + ":" + minutes + meridiem;
      return time;
    } catch (ex) {
      return timestamp;
    }
  };

  const parseChatName = (name) => {
    const result = name.split(" ")[0];
    if (result.length > 8) {
      const letters = result.split("");
      return letters[0] + letters[1] + letters[2];
    }

    return result;
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__header-Info">
          <h3>{roomName}</h3>
          <p>Last Seen at...</p>
        </div>
        <div className="chat__header-Right">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            key={message.id}
            className={`chat__message chat ${
              message.name === user.uid && "chat--receiver"
            }`}
          >
            <span className="chat__name">{parseChatName(message.name)}</span>

            {message.message}

            <span className="chat__timestamp">
              {parseTimestamp(
                new Date(message.timestamp?.toDate()).toUTCString()
              )}
            </span>
          </p>
        ))}
      </div>
      <footer className="chat__footer">
        <InsertEmoticonOutlined />
        <form>
          <input
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
            type="text"
            placeholder="Send a message..."
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
          <IconButton>
            <Mic />
          </IconButton>
        </form>
      </footer>
    </div>
  );
};

export default Chat;

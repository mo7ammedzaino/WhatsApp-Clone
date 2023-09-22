import { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import {
  DonutLarge,
  Chat,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import SidebarChat from "./SidebarChat";
import { roomsRef } from "../firebase";
import { query, onSnapshot } from "firebase/firestore";
import { useStateValue } from "./StateProvider";
import "../css/sideBar.css";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    const q = query(roomsRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedRooms = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRooms(updatedRooms);
    });

    return () => {
      // Cleanup the subscription when the component unmounts
      unsubscribe();
    };
  }, []);

  return (
    <div className="sidebar">
      <header className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__header-right">
          <IconButton>
            <DonutLarge />
          </IconButton>

          <IconButton>
            <Chat />
          </IconButton>

          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </header>

      <div className="sidebar__search">
        <div className="sidebar__search-container">
          <SearchOutlined />
          <input type="text" placeholder="Search or start a new chat" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat={true} />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

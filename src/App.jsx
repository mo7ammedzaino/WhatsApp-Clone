import React from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import "./css/App.css";
import Login from "./components/Login";
import { useStateValue } from "./components/StateProvider";

function App() {
  const [{ user }] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />

          <Routes>
            <Route
              path="/rooms/:roomId"
              Component={(props) => <Chat {...props} user={user} />}
            />
            <Route path="/rooms" />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;

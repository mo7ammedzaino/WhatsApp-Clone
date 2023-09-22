import "../css/login.css";
import { Button } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "../reducer";

const Login = () => {
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {});
  };
  return (
    <div className="login">
      <div className="login__body">
        <img className="login__image" src="/icon.png" alt="WhatsApp logo" />
        <div className="login__text">
          <h1>Sign to WhatsApp</h1>
        </div>
        <Button type="submit" variant="contained" onClick={signIn}>
          Sign In With Google
        </Button>
      </div>
      <h2 className="login__rights">
        © 2023{" "}
        <a href="https://twitter.com/MohammedZaino21" target="__blank">
          Mohd.Zaino
        </a>
        <br />
        All Rights Reserved
      </h2>
    </div>
  );
};

export default Login;

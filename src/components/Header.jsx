import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import authContext from "../store/authContext";
import { useContext } from "react";
import UserList from "./UserList";

const Header = () => {
  const { user } = useContext(authContext);

  return (
    <header>
      <div className="logo-div">
        <Link to="/">
          <img src="" alt="" className="logo-img" />
        </Link>
      </div>
      <Navbar />
      <div className="login-div">
        {user.authenticated ? (
          <UserList />
        ) : (
          <button className="login-btn">
            <Link to={"/login"}>Logowanie</Link>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

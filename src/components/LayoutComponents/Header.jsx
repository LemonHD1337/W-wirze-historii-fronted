import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import authContext from "../../store/authContext";
import { useContext } from "react";
import UserList from "../Settings/UserList";
import logo from "../../assets/logo.svg";

const Header = () => {
  const { user } = useContext(authContext);

  return (
    <header className="w-full h-20 flex justify-between border-b-2 border-solid border-bor md:flex-col md:h-2/3 flex-initial ">
      <div className="w-1/4 h-full md:w-full md:h-1/3">
        <Link to="/" className="w-full h-full flex justify-center items-center">
          <img src={logo} alt="logo" className="h-full" />
        </Link>
      </div>
      <Navbar />
      <div className="w-60 flex justify-center items-center md:h-1/3 md:w-full md:items-center md:justify-center">
        {conditionalView(user.authenticated)}
      </div>
    </header>
  );
};

const conditionalView = authenticated => {
  if (authenticated) {
    return <UserList />;
  }

  return (
    <button className="btn mr-5">
      <Link to={"/login"}>Logowanie</Link>
    </button>
  );
};

export default Header;

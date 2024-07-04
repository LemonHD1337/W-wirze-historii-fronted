import { IoMdArrowDropdown } from "react-icons/io";
import DropDownMenu from "../shared/DropDownMenu.jsx";
import { all, games, maps } from "../../config/contentConfig.js";
import UserList from "../Settings/UserList";
import { Link } from "react-router-dom";
import { useContext } from "react";
import authContext from "../../store/authContext";

const Navbar = () => {
  const { user } = useContext(authContext);

  return (
    <nav className="w-2/3 flex justify-end md:h-full md:py-5 md:w-full mobileM:flex-col mobileM:h-full mobileM:py-1">
      <ul className="w-2/3 flex justify-around items-center md:w-full mobileM:w-full mobileM:h-fit py-4">
        <li className="nav-li">
          Mapy <IoMdArrowDropdown />
          <DropDownMenu elements={maps} />
        </li>

        <li className="nav-li">
          Gry
          <IoMdArrowDropdown />
          <DropDownMenu elements={games} />
        </li>

        <li className="nav-li">
          Wpisy
          <IoMdArrowDropdown />
          <DropDownMenu elements={all} />
        </li>
      </ul>
      <div className="w-32 flex justify-center items-center md:h-full mobileM:w-full mobileM:h-full">
        {conditionalView(user.authenticated)}
      </div>
    </nav>
  );
};

const conditionalView = authenticated => {
  if (authenticated) {
    return <UserList />;
  }

  return (
    <button className="btn mr-1">
      <Link to={"/login"}>Logowanie</Link>
    </button>
  );
};

export default Navbar;

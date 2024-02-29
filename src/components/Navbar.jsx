import { IoMdArrowDropdown } from "react-icons/io";
import DropDownMenu from "../components/DropDownMenu.jsx";
import { games, all, maps } from "../config/contentConfig.js";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-end md:h-1/3">
      <ul className="w-2/3 flex justify-around items-center md:w-full">
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
    </nav>
  );
};

export default Navbar;

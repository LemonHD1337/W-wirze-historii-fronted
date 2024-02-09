import { IoMdArrowDropdown } from "react-icons/io";
import DropDownMenu from "../components/DropDownMenu.jsx";
import { games, all, maps } from "../config/contentConfig.js";

const Navbar = () => {
  return (
    <nav>
      <ul className="first-nav-list">
        <li>
          Mapy <IoMdArrowDropdown />
          <DropDownMenu elements={maps} />
        </li>

        <li>
          Gry
          <IoMdArrowDropdown />
          <DropDownMenu elements={games} />
        </li>

        <li>
          Wpisy
          <IoMdArrowDropdown />
          <DropDownMenu elements={all} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

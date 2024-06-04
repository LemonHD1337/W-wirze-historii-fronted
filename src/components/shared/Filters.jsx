import { IoMdArrowDropdown } from "react-icons/io";
import DropDownMenu from "./DropDownMenu";

const Filters = () => {
  return (
    <ul className="w-1/4 absolute text-start ml-3">
      <li className="nav-li">
        Filtry <IoMdArrowDropdown />
        <DropDownMenu elements={[]} />
      </li>
    </ul>
  );
};

export default Filters;

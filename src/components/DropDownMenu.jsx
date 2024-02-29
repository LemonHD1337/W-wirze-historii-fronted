import { Link } from "react-router-dom";

const DropDownMenu = ({ elements }) => {
  const li = elements.map((element, index) => {
    return (
      <li key={index} className="border-b border-bor p-1 hover:bg-white-200">
        <Link to={element.route}>{element.title}</Link>
      </li>
    );
  });

  return (
    <div className="drop-down-menu">
      <ul>{li}</ul>
    </div>
  );
};

export default DropDownMenu;

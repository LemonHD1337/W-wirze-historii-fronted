import { Link } from "react-router-dom";

const DropDownMenu = ({ elements }) => {
  const li = elements.map((element, index) => {
    return (
      <li key={index}>
        <Link to={element.route}>{element.title}</Link>
      </li>
    );
  });

  return (
    <div>
      <ul className="container-list">{li}</ul>
    </div>
  );
};

export default DropDownMenu;

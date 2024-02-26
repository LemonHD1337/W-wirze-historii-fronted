import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <ul>
        <li>
          <Link to="/contact">Kontakt</Link>
        </li>
        <li>
          <Link to="/authors">Autorzy</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;

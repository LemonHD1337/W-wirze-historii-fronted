import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex bg-black w-full text-white h-12 justify-center items-center">
      <ul className="flex">
        <li className="p-3">
          <Link to="/contact">Kontakt</Link>
        </li>
        <li className="p-3">
          <Link to="/authors">Autorzy</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;

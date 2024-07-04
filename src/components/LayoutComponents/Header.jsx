import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

const Header = () => {
  return (
    <header className="w-full h-20 flex justify-between border-b-2 border-solid border-bor md:h-1/3 md:flex-col flex-initial">
      <div className="w-1/4 h-20 md:w-full">
        <Link to="/" className="w-full h-full flex justify-center items-center">
          <img src={logo} alt="logo" className="h-full" />
        </Link>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;

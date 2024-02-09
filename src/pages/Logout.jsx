import { useEffect, useContext } from "react";
import authContext from "../store/authContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(authContext);

  useEffect(() => {
    if (document.cookie.length === 0) {
      setUser({
        authenticated: false,
        userId: null,
        role: null,
      });
    } else {
      Cookies.remove("loggedIn");
    }
    navigate("/");
  }, []);

  return <div></div>;
};

export default Logout;

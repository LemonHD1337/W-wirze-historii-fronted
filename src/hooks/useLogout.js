import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import authContext from "../store/authContext";

const useLogout = () => {
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
  }, [navigate, setUser]);
};

export default useLogout;

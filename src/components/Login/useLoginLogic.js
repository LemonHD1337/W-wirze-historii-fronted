import { useContext, useState } from "react";
import authContext from "../../store/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL_USER_LOGIN } from "../../services/api/endpoints";

const useLoginLogic = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useContext(authContext);
  const navigate = new useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "remember") setRemember(!remember);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const Validation = () => {
    let emailVal,
      passwordVal = false;

    if (email.length > 0 && password.length > 0) {
      emailVal = true;
    } else {
      setError("Pola nie mogą być puste!");
      return;
    }

    if (password.length >= 8) {
      passwordVal = true;
    } else {
      setError("Niepoprawne hasło lub adres email");
    }

    if (emailVal && passwordVal) {
      setError("");
      return true;
    }
    return false;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const validationStatus = Validation();

    if (!validationStatus) return setError("Źle wypiełniony formularz");

    const data = {
      email: email,
      password: password,
      remember: remember,
    };

    try {
      const res = await axios.post(URL_USER_LOGIN, data, {
        withCredentials: true,
      });

      const { auth, userId, role, accessToken, remember } = res.data;
      setUser({
        authenticated: auth,
        userId: userId,
        role: role.role,
        accessToken: accessToken,
        remember: remember,
      });

      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Niepoprawne hasło lub email");
    }
  };

  return { email, password, remember, error, handleChange, handleSubmit };
};

export default useLoginLogic;

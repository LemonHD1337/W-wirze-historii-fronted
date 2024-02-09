//import react
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import authContext from "../store/authContext";

//css and icons

import { MdOutlineEmail } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";

//showPassword
import { handleShowPassword } from "../utils/showPassword";

//import axios
import axios from "axios";
import { urlLogin } from "../services/api/endpoints";

const Login = () => {
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  //store
  const { setUser } = useContext(authContext);

  //create global hook to input err massage
  var errHook = document.getElementById("login-err");

  //redirect
  const navigate = new useNavigate();

  //checking value for inputs by state
  const handleChange = (e) => {
    const type = e.target.type;
    try {
      if (type === "text" || type === "password" || type === "email") {
        if (e.target.name === "email") {
          setEmail(e.target.value);
        } else if (e.target.name === "password") {
          setPassword(e.target.value);
        } else {
          throw Error("Coś poszło nie tak!");
        }
      } else if (type === "checkbox") {
        setRemember(!remember);
      } else {
        throw Error("Coś poszło nie tak!");
      }
    } catch (err) {
      errHook.innerText = err;
    }
  };

  //validate value from input
  const Validation = () => {
    let emailVal = false;
    let passwordVal = false;

    if (email.length > 0) {
      emailVal = true;
    }
    if (password.length >= 8) {
      passwordVal = true;
    } else {
      errHook.innerText = "Niepoprawne hasło lub adres email";
    }

    if (emailVal && passwordVal) {
      errHook.innerText = "";
      return true;
    }
  };

  //submit and send a request to server
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationStatus = Validation();

    if (validationStatus) {
      errHook.innerText = "";
      const data = {
        email: email,
        password: password,
        remember: remember,
      };

      axios
        .post(urlLogin, data, { withCredentials: true })
        .then((res) => {
          if (res.status === 200) {
            const { auth, userId, role } = res.data;
            setUser({
              authenticated: auth,
              userId: userId,
              role: role.role,
            });
            navigate("/");
          }
        })
        .catch((err) => {
          const { error } = err.response.data;
          errHook.innerText = error;
        });
    }
  };

  return (
    <div className="first-login-container">
      <div className="login-container">
        <h1>Zaloguj się</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              name="email"
            />
            <MdOutlineEmail />
          </div>

          <div className="input-container">
            <input
              type="password"
              placeholder="Hasło"
              value={password}
              onChange={handleChange}
              name="password"
            />
            <FaRegEye onClick={handleShowPassword} className="password" />
          </div>

          <div className="remember-forgot">
            <label htmlFor="rememberMe">
              <input
                type="checkbox"
                name="remember"
                id="rememberMe"
                checked={remember}
                onChange={handleChange}
              />
              Nie wylogowuj mnie
            </label>
          </div>

          <button className="login-register-btn" type="submit">
            Zaloguj się
          </button>
          <p>
            Nie masz konta?{" "}
            <Link to={"/register"} className="registerLink">
              Utwórz konto!
            </Link>
          </p>
          <p>Nie pamiętasz hasła?</p>
          <p id="login-err" className="error"></p>
        </form>
      </div>
    </div>
  );
};

export default Login;

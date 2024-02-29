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
    <div className="h-full w-full flex justify-center items-center">
      <div className="border w-1/3 shadow-lg text-center p-8 rounded-xl md:w-3/4">
        <h1 className="font-bold text-2xl">Zaloguj się</h1>
        <form onSubmit={handleSubmit}>
          <div className="div-input">
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              name="email"
            />
            <MdOutlineEmail />
          </div>

          <div className="div-input">
            <input
              className="input"
              type="password"
              placeholder="Hasło"
              value={password}
              onChange={handleChange}
              name="password"
            />
            <FaRegEye onClick={handleShowPassword} className="cursor-pointer" />
          </div>

          <div className="div-input">
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

          <button className="btn mb-5" type="submit">
            Zaloguj się
          </button>
          <p>
            Nie masz konta?{" "}
            <Link to={"/register"} className="text-custom-400">
              Utwórz konto!
            </Link>
          </p>
          <p className="cursor-pointer">Nie pamiętasz hasła?</p>
          <p id="login-err" className="error"></p>
        </form>
      </div>
    </div>
  );
};

export default Login;

import { MdOutlineEmail } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { handleShowPassword } from "../../utils/showPassword";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import authContext from "../../store/authContext";
import axios from "axios";
import { URL_USER_LOGIN } from "../../services/api/endpoints";

const LoginForm = () => {
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

  const handleSubmit = e => {
    e.preventDefault();
    const validationStatus = Validation();

    if (validationStatus) {
      setError("");

      const data = {
        email: email,
        password: password,
        remember: remember,
      };

      axios
        .post(URL_USER_LOGIN, data, { withCredentials: true })
        .then(res => {
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
        .catch(() => setError("Niepoprawne hasło lub email"));
    }
  };

  return (
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

      <button className="btn mb-5">Zaloguj się</button>
      <p>
        Nie masz konta?
        <Link to={"/register"} className="text-custom-400">
          Utwórz konto!
        </Link>
      </p>
      <p className="cursor-pointer">Nie pamiętasz hasła?</p>
      <p className="error">{error}</p>
    </form>
  );
};

export default LoginForm;

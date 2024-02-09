import { useState } from "react";
import { useNavigate } from "react-router-dom";

//import css and icons
import { MdOutlineEmail } from "react-icons/md";
import { FaRegEye, FaUser } from "react-icons/fa";

//showPassword
import { handleShowPassword } from "../utils/showPassword";

//axios
import axios from "axios";
import { urlRegister } from "../services/api/endpoints";

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  //global hook to insert err
  var errHook = document.getElementById("register-err");

  //redirect
  const navigate = useNavigate();

  const handleChange = (e) => {
    const type = e.target.type;
    try {
      if (type === "text" || type === "password" || type === "email") {
        if (e.target.name === "email") {
          setEmail(e.target.value);
        } else if (e.target.name === "password") {
          setPassword(e.target.value);
        } else if (e.target.name === "password2") {
          setPassword2(e.target.value);
        } else if (e.target.name === "name") {
          setName(e.target.value);
        } else if (e.target.name === "surname") {
          setSurname(e.target.value);
        } else {
          throw Error("Coś poszło nie tak");
        }
      } else {
        throw Error("Coś poszło nie tak");
      }
    } catch (err) {
      errHook.innerText = err;
    }
  };

  const Validation = () => {
    errHook.innerText = "";
    let emailVal = false;
    let passwordVal = false;
    let nameVal = false;
    let surnameVal = false;

    if (name.length > 0) {
      nameVal = true;
    } else {
      errHook.innerText = "Pole nazwa nie może być puste";
    }

    if (surname.length > 0) {
      surnameVal = true;
    } else {
      errHook.innerText = "Pole nazwisko nie może być puste";
    }

    if (email.length > 0) {
      emailVal = true;
    } else {
      errHook.innerText = "Pole email nie może być puste";
    }

    if (password.length >= 8) {
      if (password === password2) {
        passwordVal = true;
      } else {
        errHook.innerText = "Hasła są rożne";
      }
    } else {
      errHook.innerText =
        "Hasło musi zawierać conajmniej 8 liera z czego conajmniej jedna litera musi być duża";
    }

    if (nameVal && surnameVal && passwordVal && emailVal) {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationStatus = Validation();

    if (validationStatus) {
      errHook.innerText = "";

      const data = {
        name: name,
        surname: name,
        email: email,
        password: password,
      };

      axios
        .post(urlRegister, data)
        .then((res) => {
          navigate("/login");
        })
        .catch((err) => {
          const { code, meta } = err.response.data;
          if (code === "P2002") {
            errHook.innerText = "użytkownika o takim emailu już istnieje";
          } else {
            errHook.innerText = `${code} <br> ${meta.target}`;
          }
        });
    }
  };

  return (
    <div className="first-register-container">
      <div className="login-container">
        <h1>Utwórz konto</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              placeholder="Imię"
              value={name}
              onChange={handleChange}
              name="name"
            />
            <FaUser />
          </div>

          <div className="input-container">
            <input
              type="text"
              placeholder="Nazwisko"
              value={surname}
              onChange={handleChange}
              name="surname"
            />
            <FaUser />
          </div>

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

          <div className="input-container">
            <input
              type="password"
              placeholder="Powtórz hasło"
              value={password2}
              onChange={handleChange}
              name="password2"
            />
            <FaRegEye />
          </div>

          <button className="login-register-btn">Stwórz konto</button>
          <p id="register-err" className="err"></p>
        </form>
      </div>
    </div>
  );
};

export default Register;

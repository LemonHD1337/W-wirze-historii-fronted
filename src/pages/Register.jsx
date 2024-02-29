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
  const [message, setMessage] = useState();

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
      setMessage(err);
    }
  };

  const Validation = () => {
    setMessage();
    let emailVal = false;
    let passwordVal = false;
    let nameVal = false;
    let surnameVal = false;

    if (name.length > 0) {
      nameVal = true;
    } else {
      setMessage("Pole nazwa nie może być puste");
    }

    if (surname.length > 0) {
      surnameVal = true;
    } else {
      setMessage("Pole nazwisko nie może być puste");
    }

    if (email.length > 0) {
      emailVal = true;
    } else {
      setMessage("Pole email nie może być puste");
    }

    if (password.length >= 8) {
      if (password === password2) {
        passwordVal = true;
      } else {
        setMessage("Hasła są rożne");
      }
    } else {
      setMessage(
        "Hasło musi zawierać conajmniej 8 liera z czego co najmniej jedna litera musi być duża"
      );
    }

    if (nameVal && surnameVal && passwordVal && emailVal) {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationStatus = Validation();

    if (validationStatus) {
      setMessage();

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
          console.log(err);
          setMessage("błąd");
        });
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-1/3 text-center border border-bor shadow-lg p-5 rounded-xl md:w-3/4">
        <h1 className="font-bold text-2xl">Utwórz konto</h1>
        <form onSubmit={handleSubmit}>
          <div className="div-input">
            <input
              className="input"
              type="text"
              placeholder="Imię"
              value={name}
              onChange={handleChange}
              name="name"
            />
            <FaUser />
          </div>

          <div className="div-input">
            <input
              className="input"
              type="text"
              placeholder="Nazwisko"
              value={surname}
              onChange={handleChange}
              name="surname"
            />
            <FaUser />
          </div>

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
            <input
              className="input"
              type="password"
              placeholder="Powtórz hasło"
              value={password2}
              onChange={handleChange}
              name="password2"
            />
            <FaRegEye />
          </div>

          <button className="btn m-2">Stwórz konto</button>
          <div className="w-full flex justify-center p-2">
            <p className="font-bold text-pretty w-2/3 ">{message}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

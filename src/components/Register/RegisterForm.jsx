import { FaRegEye, FaUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { handleShowPassword } from "../../utils/showPassword";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL_USER_REGISTER } from "../../services/api/endpoints";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  //redirect
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "name") setName(value);
    if (name === "surname") setSurname(value);
    if (name === "password") setPassword(value);
    if (name === "password2") setPassword2(value);
  };

  const Validation = () => {
    setError("");
    let notEmpty = false;
    let passwordVal = false;

    if (
      name.length &&
      surname.length &&
      email.length &&
      password.length &&
      password2.length
    ) {
      notEmpty = true;
    } else {
      setError("pola nie mogą być puste");
    }

    if (password.length >= 8) {
      if (password === password2) {
        passwordVal = true;
      } else {
        setError("Hasła są rożne");
      }
    } else {
      setError(
        "Hasło musi zawierać conajmniej 8 liera z czego co najmniej jedna litera musi być duża",
      );
    }

    return notEmpty && passwordVal;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (Validation()) {
      setError("");

      const data = {
        name: name,
        surname: name,
        email: email,
        password: password,
      };
      postData(data);
    }
  };

  const postData = data => {
    axios
      .post(URL_USER_REGISTER, data)
      .then(() => {
        navigate("/login");
      })
      .catch(err => {
        console.log(err);
        setError("błąd");
      });
  };

  return (
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
        <p className="font-bold text-pretty w-2/3 ">{error}</p>
      </div>
    </form>
  );
};
export default RegisterForm;

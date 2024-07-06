import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL_USER_REGISTER } from "../../services/api/endpoints";

const useRegisterLogic = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

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

  const handleSubmit = async e => {
    e.preventDefault();
    if (!Validation()) setError("Źle wypełniony formularz");

    const data = {
      name: name,
      surname: surname,
      email: email,
      password: password,
    };

    try {
      await axios.post(URL_USER_REGISTER, data);

      navigate("/login");
    } catch (err) {
      console.log(err);
      setError("błąd");
    }
  };

  return {
    name,
    surname,
    error,
    email,
    password,
    password2,
    handleSubmit,
    handleChange,
  };
};

export default useRegisterLogic;

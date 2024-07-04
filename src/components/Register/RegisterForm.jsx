import { FaRegEye, FaUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { handleShowPassword } from "../../utils/showPassword";
import useRegisterLogic from "./useRegisterLogic";

const RegisterForm = () => {
  const {
    name,
    surname,
    error,
    handleSubmit,
    password,
    password2,
    email,
    handleChange,
  } = useRegisterLogic();

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

      <button className="btn ">Stwórz konto</button>

      <div className="w-full flex justify-center p-2">
        <p className="font-bold text-pretty w-2/3 ">{error}</p>
      </div>
    </form>
  );
};
export default RegisterForm;

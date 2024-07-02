import { MdOutlineEmail } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { handleShowPassword } from "../../utils/showPassword";
import { Link } from "react-router-dom";
import useLoginLogic from "./useLoginLogic";

const LoginForm = () => {
  const { email, password, remember, handleSubmit, handleChange, error } =
    useLoginLogic();

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
        <Link to={"/register"} className="text-custom-400 block">
          Utwórz konto!
        </Link>
      </p>
      <p className="cursor-pointer">
        <Link to={"/password/reset"} className={"text-custom-400"}>
          Nie pamiętasz hasła?
        </Link>
      </p>
      <p className="error">{error}</p>
    </form>
  );
};

export default LoginForm;

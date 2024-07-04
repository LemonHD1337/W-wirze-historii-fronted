import Loading from "../shared/Loading";
import Error from "../shared/Error";
import useUserInfoLogic from "../../hooks/useUserInfoLogic";

const UserInfo = ({ id }) => {
  const { isLoading, error, handleSubmit, name, surname, email, onChange } =
    useUserInfoLogic(id);

  if (isLoading) return <Loading />;
  if (error) return <Error message={"Błąd"} />;

  return (
    <div className="w-full flex justify-center m-3">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="font-bold text-2xl">Zmień dane</h1>
        <div className="div-input">
          <input
            className="input"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="div-input">
          <input
            className="input"
            type="text"
            value={surname}
            onChange={onChange}
          />
        </div>
        <div className="div-input">
          <input
            className="input"
            type="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn m-2">
          {isLoading ? "przetwarzanie" : "zmień danę"}
        </button>
      </form>
    </div>
  );
};

export default UserInfo;

import Loading from "../shared/Loading";
import useUserInfoLogic from "../../hooks/useUserInfoLogic";

const UserInfo = ({ id }) => {
  const { isLoading, status, handleSubmit, name, surname, email, onChange } =
    useUserInfoLogic(id);

  if (isLoading) return <Loading />;

  return (
    <div className="w-full flex justify-center m-3">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="font-bold text-2xl">Zmień dane</h1>
        <div className="div-input flex-col">
          <label htmlFor="">Imię:</label>
          <input
            className="input"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="div-input flex-col">
          <label htmlFor="">Nazwisko:</label>
          <input
            className="input"
            type="text"
            name={"surname"}
            value={surname}
            onChange={onChange}
          />
        </div>
        <div className="div-input flex-col">
          <label htmlFor="">Email:</label>
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
        <p className={"p-2"}>{status}</p>
      </form>
    </div>
  );
};

export default UserInfo;

import { useContext } from "react";
import authContext from "../store/authContext";

import UserInfo from "../components/Settings/UserInfo";
import ChangePassword from "../components/Settings/ChangePassword";
import DeleteUser from "../components/Settings/DeleteUser";

const UserSettings = () => {
  const { user } = useContext(authContext);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-5">
      <h1 className={"addContent-h1 mobileS:text-lg"}>
        Ustawienia użytkownika
      </h1>
      <UserInfo id={user.userId} />
      <ChangePassword id={user.userId} />
      <DeleteUser id={user.userId} />
    </div>
  );
};

export default UserSettings;

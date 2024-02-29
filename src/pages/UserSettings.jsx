import { useContext } from "react";
import authContext from "../store/authContext";

import UserInfo from "../components/UserInfo";
import ChangePassword from "../components/ChangePassword";
import DeleteUser from "../components/DeleteUser";

const UserSettings = () => {
  const { user } = useContext(authContext);
  return (
    <div className="w-full h-full flex flex-col items-center mt-2">
      <UserInfo id={user.userId} />
      <ChangePassword id={user.userId} />
      <DeleteUser id={user.userId} />
    </div>
  );
};

export default UserSettings;

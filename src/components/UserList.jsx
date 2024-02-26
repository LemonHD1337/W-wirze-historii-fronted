import profilePic from "../assets/Default_pfp.svg";
import DropDownMenu from "./DropDownMenu";

import { useContext } from "react";
import authContext from "../store/authContext";

const UserList = () => {
  const { user } = useContext(authContext);
  var logged = 0;

  if (user.role === "admin" || user.role === "creator") {
    logged = [
      {
        title: "ustawienia",
        route: "/user/settings",
      },
      {
        title: "dodaj zawartość",
        route: "/user/addContent",
      },
      {
        title: "wyloguj",
        route: "/user/logout",
      },
    ];
  } else {
    logged = [
      {
        title: "ustawienia",
        route: "/user/settings",
      },
      {
        title: "wyloguj",
        route: "/user/logout",
      },
    ];
  }

  return (
    <div className="userlist-div">
      <img src={profilePic} alt="profilePic" className="profile-pic" />
      <DropDownMenu elements={logged} />
    </div>
  );
};

export default UserList;

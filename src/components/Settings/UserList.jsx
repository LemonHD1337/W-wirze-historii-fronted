import profilePic from "../../assets/Default_pfp.svg";
import DropDownMenu from "../shared/DropDownMenu";

import { useContext } from "react";
import authContext from "../../store/authContext";

const UserList = () => {
  const { user } = useContext(authContext);

  if (user.role === "admin" || user.role === "creator") {
    var logged = [
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
    var logged = [
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
    <div className="flex items-center justify-center w-full h-full nav-li2">
      <img
        src={profilePic}
        alt="profilePic"
        className="object-contain w-2/3 h-2/3 md:h-1/3 md:w-1/3"
      />
      <DropDownMenu elements={logged} />
    </div>
  );
};

export default UserList;

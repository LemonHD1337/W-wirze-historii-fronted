import profilePic from "../assets/Default_pfp.svg";
import DropDownMenu from "./DropDownMenu";
import { logged } from "../config/contentConfig";

const UserList = () => {
  return (
    <div className="userlist-div">
      <img src={profilePic} alt="profilePic" className="profile-pic" />
      <DropDownMenu elements={logged} />
    </div>
  );
};

export default UserList;

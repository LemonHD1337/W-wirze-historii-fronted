import ChangePassword from "../components/Settings/ChangePassword";
import { useParams } from "react-router-dom";

const CreateNewPassword = () => {
  const { id } = useParams();

  return (
    <div className={"w-full h-full flex justify-center items-center"}>
      <ChangePassword id={Number(id)} />
    </div>
  );
};

export default CreateNewPassword;

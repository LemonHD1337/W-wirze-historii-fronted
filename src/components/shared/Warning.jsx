import { CiWarning } from "react-icons/ci";

const Warning = ({ message }) => {
  return (
    <div className="w-80 p-5 bg-yellow-400 text-center flex justify-center rounded-lg absolute bottom-1 left-1">
      <CiWarning className="h-6 w-6 mr-2" />
      <p>{message}</p>
    </div>
  );
};

export default Warning;

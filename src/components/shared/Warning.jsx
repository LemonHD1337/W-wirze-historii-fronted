import { CiWarning } from "react-icons/ci";
import { useEffect, useState } from "react";

const Warning = ({ message }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null;

  return (
    <div className="w-80 p-5 bg-yellow-400 text-center flex justify-center rounded-lg absolute bottom-1 left-1">
      <CiWarning className="h-6 w-6 mr-2" />
      <p>{message}</p>
    </div>
  );
};

export default Warning;

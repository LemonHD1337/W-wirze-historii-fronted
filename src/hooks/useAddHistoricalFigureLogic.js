import { useContext, useRef, useState } from "react";
import axios from "axios";
import { URL_HF_CREATE } from "../services/api/endpoints";
import authContext from "../store/authContext";

const useAddHistoricalFigureLogic = () => {
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const [doc, setDoc] = useState("");
  const { user } = useContext(authContext);

  const refPic = useRef();
  const refDoc = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "name") setName(value);
    if (name === "pic") setPic(files[0]);
    if (name === "doc") setDoc(files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formdata = new FormData();

    formdata.append("name", name);
    formdata.append("pic", pic);
    formdata.append("doc", doc);

    try {
      setIsLoading(true);
      await axios.post(URL_HF_CREATE, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.accessToken}`,
        },
        withCredentials: true,
      });

      setName("");
      refDoc.current.value = "";
      refPic.current.value = "";
      setStatus("dodano zawartość");
    } catch (e) {
      console.log(e);
      setStatus("Coś poszło nie tak");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    name,
    refDoc,
    refPic,
    status,
    handleChange,
    handleSubmit,
  };
};

export default useAddHistoricalFigureLogic;

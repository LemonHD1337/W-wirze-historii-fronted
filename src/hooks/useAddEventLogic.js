import { useRef, useState } from "react";
import axios from "axios";
import { URL_E_CREATE } from "../services/api/endpoints";

const useAddEventLogic = era => {
  const [title, setTitle] = useState("");
  const [pic, setPic] = useState("");
  const [doc, setDoc] = useState("");

  const refPic = useRef();
  const refDoc = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("pic", pic);
    formdata.append("doc", doc);
    formdata.append("era", era);

    try {
      setIsLoading(true);
      await axios.post(URL_E_CREATE, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setStatus("dodano wpis");
      setTitle("");
      refDoc.current.value = "";
      refPic.current.value = "";
    } catch (e) {
      console.log(e);
      setStatus("Coś poszło nie tak");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "title") setTitle(value);
    if (name === "pic") setPic(files[0]);
    if (name === "doc") setDoc(files[0]);
  };

  return {
    isLoading,
    handleChange,
    handleSubmit,
    status,
    refDoc,
    refPic,
    title,
  };
};

export default useAddEventLogic;

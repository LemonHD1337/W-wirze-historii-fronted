import { useContext, useState } from "react";
import axios from "axios";
import { URL_MAP_CREATE } from "../services/api/endpoints";
import authContext from "../store/authContext";

const useAddMapLogic = era => {
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const { user } = useContext(authContext);

  const validate = () => {
    if (
      title.length !== 0 &&
      era !== 0 &&
      source.length !== 0 &&
      imageURL.length !== 0
    ) {
      return true;
    }
    setStatus("Pola nie mogą być puste");
    return false;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    if (name === "source") setSource(value);
    if (name === "imageURL") setImageURL(value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validate) return null;

    const data = {
      title: title,
      source: source,
      era: era,
      imageURL: imageURL,
    };

    try {
      await axios.post(URL_MAP_CREATE, data, {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      });
      setStatus("Dodano mapę!");
    } catch (e) {
      console.log(e);
      setStatus("Błąd");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmit,
    handleChange,
    status,
    title,
    source,
    isLoading,
    imageURL,
  };
};

export default useAddMapLogic;

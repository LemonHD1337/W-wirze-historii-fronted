import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { URL_MAP_GET, URL_MAP_UPDATE } from "../services/api/endpoints";
import authContext from "../store/authContext";

const useUpdateMapLogic = id => {
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState("");
  const { user } = useContext(authContext);

  useEffect(() => {
    if (id === 0) return;
    (async function () {
      try {
        setIsLoading(true);
        const res = await axios.get(URL_MAP_GET + `/${id}`);
        const { title, imageURL, source } = res.data;
        setTitle(title);
        setSource(source);
        setImageURL(imageURL);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  const validate = () => {
    return source.length !== 0 && title.length !== 0 && imageURL.length !== 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validate()) return setStatus("Pola nie mogą być puste!");
    if (!id) return null;

    const data = {
      title: title,
      source: source,
      imageURL: imageURL,
    };

    try {
      setIsUpdating(true);
      await axios.put(URL_MAP_UPDATE + `/${id}`, data, {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      });
      setStatus("Zmodyfikowano dane");
    } catch (e) {
      console.log(e);
      setStatus("Błąd");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    if (name === "source") setSource(value);
    if (name === "imageURL") setImageURL(value);
  };

  return {
    handleSubmit,
    handleChange,
    status,
    title,
    source,
    isLoading,
    imageURL,
    isUpdating,
  };
};

export default useUpdateMapLogic;

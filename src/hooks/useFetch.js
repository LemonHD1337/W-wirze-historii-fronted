import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (URL, deps = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      try {
        const response = await axios.get(URL);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [URL, deps]);

  return { data, isLoading, error };
};

export default useFetch;

import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const useFetchWithSearch = (
  getAll_URL,
  search_URL,
  searchedValue,
  searchParams,
  setSearchEnabled,
) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flag, setFlag] = useState(false);

  const URL_GETALL = useMemo(() => new URL(getAll_URL), [getAll_URL]);
  const URL_SEARCH = new URL(search_URL);

  useEffect(() => {
    if (searchedValue.length === 0) {
      setSearchEnabled(false);
      setFlag(false);

      URL_GETALL.searchParams.set("limit", searchParams.get("limit"));
      URL_GETALL.searchParams.set("skip", searchParams.get("skip"));

      (async function () {
        try {
          setIsLoading(true);
          const response = await axios.get(URL_GETALL.toString());
          setData(response.data);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [getAll_URL, URL_GETALL, searchedValue, searchParams, setSearchEnabled]);

  useEffect(() => {
    if (flag && searchedValue.length > 0) {
      (async function () {
        setIsLoading(true);
        try {
          URL_SEARCH.searchParams.set("search", searchedValue);
          URL_SEARCH.searchParams.set("skip", searchParams.get("skip"));
          URL_SEARCH.searchParams.set("limit", searchParams.get("limit"));
          const response = await axios.get(URL_SEARCH.toString());
          setData(response.data);
        } catch (e) {
          setError(e);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [flag, searchParams, searchedValue]);

  const onKeyPress = async e => {
    if (e.key === "Enter") {
      setSearchEnabled(true);
      setFlag(true);
    }
  };

  return { data, isLoading, error, execute: onKeyPress };
};

export default useFetchWithSearch;

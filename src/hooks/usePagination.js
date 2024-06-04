import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const usePagination = (searchEnable, limit) => {
  const [searchParams, setSearchParams] = useSearchParams({
    currentPage: 1,
    limit: limit,
    skip: 0,
  });

  useEffect(() => {
    setSearchParams(prev => {
      prev.set("currentPage", 1);
      prev.set("limit", limit);
      prev.set("skip", 0);
      return prev;
    });
  }, [searchEnable]);

  const handlePageChange = (e, value) => {
    const currentPage = parseInt(searchParams.get("currentPage"));
    const skip = parseInt(searchParams.get("skip"));
    const limit = parseInt(searchParams.get("limit"));

    if (currentPage < value) {
      if (value === currentPage + 1) {
        const NewSkip = skip + limit;
        setSearchParams(
          prev => {
            prev.set("currentPage", value);
            prev.set("skip", NewSkip);
            return prev;
          },
          { replace: true },
        );
      } else {
        const number = value - currentPage;
        const newSkip = skip + limit * number;
        setSearchParams(
          prev => {
            prev.set("currentPage", value);
            prev.set("skip", newSkip);
            return prev;
          },
          { replace: true },
        );
      }
    } else if (currentPage > value) {
      if (value === currentPage - 1) {
        const NewSkip = skip - limit;
        setSearchParams(
          prev => {
            prev.set("currentPage", value);
            prev.set("skip", NewSkip);
            return prev;
          },
          { replace: true },
        );
      } else {
        const number = currentPage - value;
        const newSkip = skip - limit * number;
        setSearchParams(
          prev => {
            prev.set("currentPage", value);
            prev.set("skip", newSkip);
            return prev;
          },
          { replace: true },
        );
      }
    }
  };

  return { searchParams, setSearchParams, handlePageChange };
};

export default usePagination;

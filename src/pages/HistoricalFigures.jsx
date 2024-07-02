import { useState } from "react";
import useFetchWithSearch from "../hooks/useFetchWithSearch";
import usePagination from "../hooks/usePagination";
import SearchBar from "../components/shared/SearchBar";
import MapDataRenderer from "../components/shared/MapDataRenderer";
import Loading from "../components/shared/Loading";
import Warning from "../components/shared/Warning";
import Error from "../components/shared/Error";
import { URL_HF_PAGINATED, URL_HF_SEARCH } from "../services/api/endpoints";
import { Pagination } from "@mui/material";

const HistoricalFigures = () => {
  const [search, setSearch] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(false);
  const { searchParams, handlePageChange } = usePagination(searchEnabled, 12);
  const { data, isLoading, error, execute } = useFetchWithSearch(
    URL_HF_PAGINATED,
    URL_HF_SEARCH,
    search,
    searchParams,
    setSearchEnabled,
  );

  if (isLoading) return <Loading />;

  if (!data) return <Warning message="Brak danych" />;

  if (error) return <Error error={error} />;

  return (
    <div className="contentView">
      <SearchBar setSearch={setSearch} search={search} execute={execute} />
      <MapDataRenderer data={data.paginateData} />
      <Pagination
        className="w-full p-5 flex justify-center relative"
        count={data.totalPages}
        defaultPage={parseInt(searchParams.get("currentPage"))}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default HistoricalFigures;

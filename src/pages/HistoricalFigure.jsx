import BASE_URL from "../services/api/BASE_URL";
import { URL_HF_GETONE } from "../services/api/endpoints";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loading from "../components/shared/Loading";
import Warning from "../components/shared/Warning";
import Error from "../components/shared/Error";

const HistoricalFiguresInfo = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetch(URL_HF_GETONE + `/${id}`);

  if (isLoading) return <Loading />;
  if (!data) return <Warning message={"Brak danych"} />;
  if (error) return <Error error={error} />;

  return (
    <div className={"w-full h-full flex flex-grow"}>
      <embed
        src={BASE_URL + "/static/" + data.document + "#toolbar=0"}
        width={"100%"}
      />
    </div>
  );
};

export default HistoricalFiguresInfo;

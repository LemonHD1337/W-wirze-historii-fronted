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
    <div className="w-full h-full flex md:flex-col">
      <div className="w-1/4 p-2 text-center md:w-full">
        <h1 className="font-bold text-2xl">{data.name}</h1>
        <div className="h-2/3">
          <img
            src={BASE_URL + "/" + data.image}
            alt="zdjęcie postaci"
            className="w-full max-h-full object-contain aspect-auto"
          />
        </div>
        <div className="w-full text-pretty mt-3 text-lg">
          <p>miesjce urodzenia: {data.birth}</p>
          <p>miesjce śmierci: {data.death}</p>
        </div>
      </div>
      <div
        className="w-3/4 p-2 overflow-y-auto md:w-full ol ul h1 p"
        dangerouslySetInnerHTML={{ __html: data.text }}
      ></div>
    </div>
  );
};

export default HistoricalFiguresInfo;

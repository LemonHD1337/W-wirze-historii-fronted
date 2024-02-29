import axios from "axios";
import Loading from "../components/Loading";
import { baseURL } from "../services/api/endpoints";
import { useEffect, useState } from "react";
import { urlGetInfoHistoricalFigure } from "../services/api/endpoints";
import { useParams } from "react-router-dom";

const HistoricalFiguresInfo = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(urlGetInfoHistoricalFigure + id)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full h-full flex md:flex-col">
      <div className="w-1/4 p-2 text-center md:w-full">
        <h1 className="font-bold text-2xl">{data.name}</h1>
        <div className="h-2/3">
          <img
            src={baseURL + "/" + data.image}
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
        dangerouslySetInnerHTML={{ __html: data.text }}></div>
    </div>
  );
};

export default HistoricalFiguresInfo;

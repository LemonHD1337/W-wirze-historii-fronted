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
  }, []);

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
    <div className="info-figure-container">
      <div className="info">
        <img src={baseURL + "/" + data.imgName} alt="" />
        <p>{data.name}</p>
        <p>{data.birth}</p>
        <p>{data.death}</p>
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: data.content }}></div>
    </div>
  );
};

export default HistoricalFiguresInfo;

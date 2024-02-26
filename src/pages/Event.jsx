import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { baseURL, urlGetEvent } from "../services/api/endpoints";
import axios from "axios";

const Event = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(urlGetEvent + id)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(setLoading(false));
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return <Loading />;
  }

  if (error) {
    return <p>błąd: {error}</p>;
  }

  return (
    <div className="info-figure-container">
      <div className="info">
        <img src={baseURL + "/" + data.image} alt="" />
        <p>{data.day}</p>
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: data.content }}></div>
    </div>
  );
};

export default Event;

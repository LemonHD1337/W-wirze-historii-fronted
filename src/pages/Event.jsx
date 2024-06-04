import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/shared/Loading";
import BASE_URL from "../services/api/BASE_URL";
import { URL_E_GET } from "../services/api/endpoints";
import axios from "axios";
import convertMonthToName from "../utils/convertMonthToName";

const Event = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(URL_E_GET + `/${id}`)
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
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
    <div className="w-full h-full flex md:flex-col">
      <div className="w-1/4 h-full p-2 text-center border-r-2 border-bor md:w-full md:h-fit">
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <div>
          <img
            src={BASE_URL + "/" + data.image}
            alt="zdjecie wydarzenia"
            className="w-full  object-contain aspect-auto"
          />
        </div>
        <div className="w-full mt-3 text-lg ">
          <p>
            Data wydarzenia: {data.day} {convertMonthToName(data.month)}{" "}
            {data.year}
          </p>
        </div>
      </div>

      <div
        className="w-3/4 h-full p-2 overflow-y-auto md:w-full ol ul h1 p"
        dangerouslySetInnerHTML={{ __html: data.content }}
      ></div>
    </div>
  );
};

export default Event;

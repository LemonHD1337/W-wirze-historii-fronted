import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/shared/Loading";
import BASE_URL from "../services/api/BASE_URL";
import { URL_E_GET } from "../services/api/endpoints";
import axios from "axios";

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
      <div className="w-full h-full flex md:flex-col">
        <embed
          src={BASE_URL + "/static/" + data.document + "#toolbar=0"}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default Event;

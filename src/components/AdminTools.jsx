import { useState } from "react";
import axios from "axios";
import {
  urlAddWaypoint,
  urlDeleteMap,
  urlInsertMap,
} from "../services/api/endpoints";
import Loading from "./shared/Loading";

const AdminTools = ({ ages, map, lat, lng }) => {
  const [name, setName] = useState("");
  const [era, setEra] = useState("");
  const [source, setSource] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState();
  const [pic, setPic] = useState();
  const [doc, setDoc] = useState();

  const [loading, setLoading] = useState(false);
  const [succeed, setSucceed] = useState();
  const [error, setError] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const validated = await Validate();

    if (validated) {
      const data = {
        name: name,
        era: era,
        source: source,
        imgUrl: image,
      };

      setLoading(true);
      axios
        .post(urlInsertMap, data)
        .then(res => {
          setLoading(false);
          setSucceed("dodano mapę");
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
          setError("błąd");
        });
    } else {
      setError("Pola nie mogą być pustę");
    }
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "name") setName(value);
    if (name === "source") setSource(value);
    if (name === "imgUrl") setImage(value);
    if (name === "era" && value !== "Wybierz epokę") setEra(value);
    if (name === "year") setDate(value);
    if (name === "title") setTitle(value);
    if (name === "pic") setPic(files[0]);
    if (name === "doc") setDoc(files[0]);
  };

  const Validate = async () => {
    let valName = false;
    let valEra = false;
    let valSource = false;
    let valImgUrl = false;

    if (name.length > 0) valName = true;
    if (era.length > 0) valEra = true;
    if (source.length > 0) valSource = true;
    if (image.length > 0) valImgUrl = true;

    if (valEra && valName && valSource && valImgUrl) {
      return true;
    }

    return false;
  };

  const fetchData = async () => {
    axios
      .post(urlDeleteMap, { map: map })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSubmitWaypoint = e => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("date", date);
    formdata.append("lat", lat);
    formdata.append("lng", lng);
    formdata.append("pic", pic);
    formdata.append("doc", doc);
    formdata.append("map", map);
    setLoading(true);
    axios
      .post(urlAddWaypoint, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res => {
        setLoading(false);
        console.log(res);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="admin-tool-add-map">
      <p>Narzędzia</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="nazwa mapy"
            name="name"
            onChange={handleChange}
          />
        </div>

        <div>
          <select name="era" onChange={handleChange}>
            <option>Wybierz epokę</option>
            {ages.map((element, index) => {
              return (
                <option value={element} key={index}>
                  {element}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <input
            type="text"
            placeholder="wklej link do strony"
            name="source"
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="skopiuj link do obrazu"
            name="imgUrl"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Dodaj mapę</button>
        <p>{succeed}</p>
        <p>{error}</p>
      </form>
      <div className="delete-map">
        <p>Żeby usunąć mape trzeba ją odpalić i wtedy kliknąć przycisk</p>
        <button onClick={fetchData}>Usuń mapę</button>
      </div>
      <div className="add-waypoint">
        <form encType="multipart/form-data" onSubmit={handleSubmitWaypoint}>
          <input type="text" value={lat} placeholder="lat" name="lat" />
          <input type="text" value={lng} placeholder="lng" name="lng" />
          <input
            type="text"
            placeholder="nazwa"
            name="title"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="rok"
            name="year"
            onChange={handleChange}
          />
          <label>
            Dodaj zdjęcie wydarzenia
            <input type="file" name="pic" onChange={handleChange} />
          </label>
          <label>
            Dodaj dokument z opisem wydarzenia
            <input type="file" name="doc" onChange={handleChange} />
          </label>
          <button type="submit">Dodaj wskaźnik</button>
        </form>
      </div>
    </div>
  );
};

export default AdminTools;

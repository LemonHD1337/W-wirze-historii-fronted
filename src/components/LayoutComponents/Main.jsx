import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import EventsMaps from "../../pages/EventsMaps";
import GuessDate from "../../pages/GuessDate";
import Events from "../../pages/Events";
import Event from "../../pages/Event";
import HistoricalFigures from "../../pages/HistoricalFigures";
import HistoricalFigure from "../../pages/HistoricalFigure";
import UserSettings from "../../pages/UserSettings";
import AddContent from "../../pages/AddContent";
import Logout from "../../pages/Logout";
import Contact from "../../pages/Contact";
import Authors from "../../pages/Authors";

const Main = () => {
  return (
    <main
      id="main"
      className="w-full flex flex-col h-full relative overflow-hidden"
    >
      <Routes>
        <Route path="/" exact Component={HomePage} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/eventsMaps" Component={EventsMaps} />
        <Route path="/games/guessDate" Component={GuessDate} />
        <Route path="/all/events" Component={Events} />
        <Route path="/all/events/:id" Component={Event} />
        <Route path="/all/historicalFigures" Component={HistoricalFigures} />
        <Route path="/all/historicalFigures/:id" Component={HistoricalFigure} />
        <Route path="/user/settings" Component={UserSettings} />
        <Route path="/user/addContent" Component={AddContent} />
        <Route path="/user/logout" Component={Logout} />
        <Route path="/contact" Component={Contact} />
        <Route path="/authors" Component={Authors} />
      </Routes>
    </main>
  );
};

export default Main;

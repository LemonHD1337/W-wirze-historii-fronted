import { useEffect, useState } from "react";
import authContext, { defaultObjectauthContext } from "./store/authContext";

//router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//component
import Header from "./components/Header";
import Footer from "./components/Footer";

//pages
import EventsMaps from "./pages/EventsMaps";
import Events from "./pages/Events";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GuessDate from "./pages/GuessDate";
import HistoricalFigures from "./pages/HistoricalFigures";
import AddContent from "./pages/AddContent";
import Logout from "./pages/Logout";
import UserSettings from "./pages/UserSettings";
import HistoricalFigure from "./pages/HistoricalFigure";
import Event from "./pages/Event";
import Contact from "./pages/Contact";
import Authors from "./pages/Authors";

//utils
import getDataFromCookie from "./utils/getDataFromCookie";

const Layout = () => {
  const [user, setUser] = useState(defaultObjectauthContext);

  useEffect(() => {
    const data = getDataFromCookie();
    if (data !== undefined) {
      setUser({
        authenticated: true,
        userId: data.userId,
        role: data.role.role,
      });
    }
  }, []);

  return (
    <>
      <authContext.Provider value={{ user, setUser }}>
        <Router>
          <Header />
          <main id="main" className="w-full flex-auto">
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
          <Footer />
        </Router>
      </authContext.Provider>
    </>
  );
};

export default Layout;

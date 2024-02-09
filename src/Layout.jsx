import React, { useEffect, useState } from "react";
import authContext, { defaultObjectauthContext } from "./store/authContext";

//router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import Header from "./pages/Header";
import EventsMaps from "./pages/EventsMaps";
import Events from "./pages/Events";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WarMapsPage from "./pages/WarMapsPage";
import GuessDate from "./pages/GuessDate";
import HistoricalFigures from "./pages/HistoricalFigures";
import Footer from "./pages/Footer";
import Favorite from "./pages/Favorite";
import Logout from "./pages/Logout";
import UserSettings from "./pages/UserSettings";

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
    <React.Fragment>
      <authContext.Provider value={{ user, setUser }}>
        <Router>
          <Header />
          <main id="main">
            <Routes>
              <Route path="/" exact Component={HomePage} />
              <Route path="/login" Component={Login} />
              <Route path="/register" Component={Register} />
              <Route path="/eventsMaps" Component={EventsMaps} />
              <Route path="/warMapsPage" Component={WarMapsPage} />
              <Route path="/games/guessDate" Component={GuessDate} />
              <Route path="/all/events" Component={Events} />
              <Route
                path="/all/historicalFigures"
                Component={HistoricalFigures}
              />
              <Route path="/user/settings" Component={UserSettings} />
              <Route path="/user/favorite" Component={Favorite} />
              <Route path="/user/logout" Component={Logout} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </authContext.Provider>
    </React.Fragment>
  );
};

export default Layout;

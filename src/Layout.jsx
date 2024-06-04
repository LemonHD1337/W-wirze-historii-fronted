import {useEffect, useState} from "react";
import authContext, {defaultObjectauthContext} from "./store/authContext";
import {BrowserRouter as Router} from "react-router-dom";
import Header from "./components/LayoutComponents/Header";
import Footer from "./components/LayoutComponents/Footer";
import Main from "./components/LayoutComponents/Main";
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
          <Main/>
          <Footer />
        </Router>
      </authContext.Provider>
    </>
  );
};

export default Layout;

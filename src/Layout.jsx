import { useEffect, useState } from "react";
import authContext, { defaultObjectauthContext } from "./store/authContext";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/LayoutComponents/Header";
import Footer from "./components/LayoutComponents/Footer";
import Main from "./components/LayoutComponents/Main";
import getDataFromCookie from "./utils/getDataFromCookie";
import axiosRetry from "axios-retry";
import axios from "axios";
import { URL_USER_REFRESH_TOKEN } from "./services/api/endpoints";

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

    axiosRetry(axios, {
      retries: 1,
      async retryCondition(error) {
        switch (error.response.status) {
          case 401:
            if (error.response.data.msg === "Refresh token") {
              try {
                const res = await axios.get(URL_USER_REFRESH_TOKEN, {
                  withCredentials: true,
                });
                setUser(prevState => ({
                  ...prevState,
                  accessToken: res.data.accessToken,
                }));
              } catch (e) {
                console.log(e);
                return false;
              }
              return true;
            } else {
              return false;
            }
          default:
            return false;
        }
      },
    });
  }, []);

  return (
    <>
      <authContext.Provider value={{ user, setUser }}>
        <Router>
          <Header />
          <Main />
          <Footer />
        </Router>
      </authContext.Provider>
    </>
  );
};

export default Layout;

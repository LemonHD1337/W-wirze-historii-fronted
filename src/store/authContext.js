import { createContext } from "react";

export let defaultObjectauthContext = {
  authenticated: false,
  userId: null,
  role: null,
  accessToken: null,
  remember: null,
};

const authContext = createContext();

export default authContext;

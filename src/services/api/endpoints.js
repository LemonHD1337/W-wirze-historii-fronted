import BASE_URL from "./BASE_URL";

export const URL_HF_GETALL = BASE_URL + "/historicalFigures/page";

export const URL_HF_GETONE = BASE_URL + "/historicalFigures/get";
export const URL_HF_CREATE = BASE_URL + "/historicalFigures/create";

export const URL_HF_DELETE = BASE_URL + "/historicalFigures/delete";

export const URL_HF_SEARCH = BASE_URL + "/historicalFigures/search";

//events endpoints
export const URL_E_CREATE = BASE_URL + "/events/create";

export const URL_E_DELETE = BASE_URL + "/events/delete";

export const URL_E_GET = BASE_URL + "/events/get";

export const URL_E_SEARCH = BASE_URL + "/events/search";

export const URL_E_GET_ALL = BASE_URL + "/events/page";
export const URL_E_GET_ALL_BY_ERA = BASE_URL + "/events/get/all";

export const URL_USER_LOGIN = BASE_URL + "/users/login";
export const URL_USER_REGISTER = BASE_URL + "/users/register";
export const URL_USER_GET = BASE_URL + "/users/get";
export const URL_USER_DELETE = BASE_URL + "/users/delete";
export const URL_USER_UPDATE_DETAILS = BASE_URL + "/users/update";
export const URL_USER_UPDATE_PASSWORD = BASE_URL + "/users/update/password";

export const URL_GUESSDATE_CREATE = BASE_URL + "/guessDate/create";
export const URL_GUESSDATE_UPDATE = BASE_URL + "/guessDate/update";
export const URL_GUESSDATE_GET = BASE_URL + "/guessDate/get";
export const URL_GUESSDATE_GET_RANDOM = BASE_URL + "/guessDate/get/random";
export const URL_GUESSDATE_GET_ALL = BASE_URL + "/guessDate/get/all";

export const URL_WAYPOINTS_CREATE = BASE_URL + "/waypoints/create";
export const URL_WAYPOINTS_DELETE = BASE_URL + "/waypoints/delete";
export const URL_WAYPOINTS_GET_ALL_BY_MAP = BASE_URL + "/waypoints/get/all";

export const URL_MAP_CREATE = BASE_URL + "/maps/create";
export const URL_MAP_DELETE = BASE_URL + "/maps/delete";
export const URL_MAP_UPDATE = BASE_URL + "/maps/update";
export const URL_MAP_GET = BASE_URL + "/maps/get";
export const URL_MAP_GET_ALL_BY_ERA = BASE_URL + "/maps/get/all";

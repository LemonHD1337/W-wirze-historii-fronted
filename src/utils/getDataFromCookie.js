function getDataFromCookie() {
  if (document.cookie.length !== 0) {
    let cookie = decodeURIComponent(document.cookie);
    cookie = cookie.split("=")[1];
    const IndexOpenTag = cookie.indexOf("{");
    const IndexCloseTag = cookie.indexOf("}") + 2;
    cookie = cookie.substring(IndexOpenTag, IndexCloseTag);
    const result = JSON.parse(cookie);
    return result;
  } else {
    return undefined;
  }
}

export default getDataFromCookie;

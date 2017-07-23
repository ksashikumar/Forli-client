function forliInit() {

  let __appinfo, __headers = {};

  function getAppInfo() {
    return __appinfo;
  }

  function setAppInfo(obj) {
    __appinfo = obj;
  }

  function getHeaders() {
    return __headers;
  }

  function setHeaders(obj) {
    __headers = obj;
  }

  return {
    getAppInfo,
    setAppInfo,
    getHeaders,
    setHeaders
  };
}
const forli = forliInit();
export default forli;

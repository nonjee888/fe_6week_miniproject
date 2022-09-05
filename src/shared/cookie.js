// import Cookies from "universal-cookie";

// // 쿠키 가져오기
// // const RefreshCookies = new RefreshCookies();

// export function setRefreshTokenToCookie(refresh_token) {
//   RefreshCookies.set("refresh_token", refresh_token, { sameSite: "strict" });
// }

// export function logout() {
//   console.log("localStorage set logout!");
//   window.localStorage.setItem("logout", Date.now());
//   RefreshCookies.remove("refresh_token");
// }

const getCookie = (name) => {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};
const setCookie = (name, value, exp = 5) => {
  let date = new Date();
  date.setTime(date.getTime() + exp * 30 * 60 * 1000); //30분
  document.cookie = `${name}=${value}; expires=${date.toUTCString()};`;
};
const deleteCookie = (name) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
};
export { getCookie, setCookie, deleteCookie };

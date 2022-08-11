import axios from "axios";

const defaultURL = "https://i7a303.p.ssafy.io/api/";

const getToken = () => {
  return sessionStorage.getItem("token")
}

export const api = axios.create({
  baseURL: defaultURL,
});

export const apiAuth = axios.create({
  baseURL: defaultURL,
  headers: { Authorization: `Bearer ${getToken()}` },
});

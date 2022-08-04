import axios from "axios";

const defaultURL = "http://i7a303.p.ssafy.io:8080/api/";

export const api = axios.create({
  baseURL: defaultURL,
});

export const apiAuth = axios.create({
  baseURL: defaultURL,
  headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`},
});

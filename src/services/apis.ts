import axios from "axios";

export const API = axios.create({
  baseURL: "https://data.ssb.no/api/v0/no/table/07241",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
  withCredentials: false,
});

import axios from "axios";

//const API_URL = "http://localhost:8080/api";
const API_URL = import.meta.env.VITE_API_URL;

export const validate = (xml, idioma = "es") =>
  axios.post(`${API_URL}/pipeline`, {
    xml,
    idioma
  }).then(res => res.data);

export const validateDtd = (xml) =>
  axios.post(`${API_URL}/validar-dtd`, { xml })
       .then(res => res.data);

export const validateXsd = (xml) =>
  axios.post(`${API_URL}/validar-xsd`, { xml })
       .then(res => res.data);


export const generateHtml = async (xml) => {
  const res = await axios.post(`${API_URL}/generar-html`, { xml });

  return res.data;
};

export const validateW3C = async (xml) => {
  const res = await axios.post(`${API_URL}/validar-w3c`, { xml });
  return res.data;
};
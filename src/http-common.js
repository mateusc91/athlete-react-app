import axios from "axios";

export default axios.create({
  baseURL: "https://springbootapi1.azurewebsites.net/api",
  headers: {
    "Content-type": "application/json"
  }
});
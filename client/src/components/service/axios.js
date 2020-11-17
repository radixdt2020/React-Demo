import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:2000/user",
  headers: {
      "Content-type": "application/json",
      'x-access-token': localStorage.getItem('token')
  }
});
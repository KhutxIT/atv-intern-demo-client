import axios from "axios";
import API_URL from "../common/config";

const AuthService = {
  login(email, password) {
    return axios.post(API_URL + "/auth/login", {
      email: email,
      password: password
    });
  }
}

export default AuthService;
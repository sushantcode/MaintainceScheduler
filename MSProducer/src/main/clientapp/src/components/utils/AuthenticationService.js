import axios from "axios";
import uuid from 'react-uuid';


let API_URL = "http://localhost:8080/api/v1";

class AuthenticationService {

  executeBasicAuthenticationService(username, password) {
    return axios.get(`${API_URL}/login`,
        { headers: { authorization: this.createBasicAuthToken(username, password) } })
  }

  createBasicAuthToken(username, password) {
      return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username, password) {
      window.sessionStorage.setItem(uuid(), username)
      this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
  }

  setupAxiosInterceptors(token) {
      axios.interceptors.request.use(
          (config) => {
              if (this.isUserLoggedIn()) {
                  config.headers.authorization = token
              }
              return config
          }
      )
  }
}

export default AuthenticationService;
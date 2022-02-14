import axios from "axios";

const API_URL = "http://localhost:8080/api/v1";

export const SESSION_STORAGE_USERNAME_KEY = "Authenticated_User";

class AuthenticationService {

  executeBasicAuthenticationService(username, password) {
    return axios.get(`${API_URL}/login`,
        { headers: { authorization: this.createBasicAuthToken(username, password) } })
  }

  createBasicAuthToken(username, password) {
      return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username, password) {
      window.sessionStorage.setItem(SESSION_STORAGE_USERNAME_KEY, username)
      this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
  }

  logout() {
    window.sessionStorage.removeItem(SESSION_STORAGE_USERNAME_KEY);
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
import axios from "axios";

export const API_URL = "http://localhost:8080/api/v1";

export const SESSION_STORAGE_USERNAME_KEY = "Authenticated_Username";
export const SESSION_STORAGE_USERROLE_KEY = "Authenticated_UserRole";

class AuthenticationService {

  executeBasicAuthenticationService(username, password) {
    return axios.get(`${API_URL}/login?username=${username}`,
        { headers: { authorization: this.createBasicAuthToken(username, password) } })
  }

  createBasicAuthToken(username, password) {
      return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfullLogin(user, password) {
      window.sessionStorage.setItem(SESSION_STORAGE_USERNAME_KEY, user[0])
      window.sessionStorage.setItem(SESSION_STORAGE_USERROLE_KEY, user[1])
      this.setupAxiosInterceptors(this.createBasicAuthToken(user.username, password))
  }

  logout() {
    window.sessionStorage.removeItem(SESSION_STORAGE_USERNAME_KEY);
    window.sessionStorage.removeItem(SESSION_STORAGE_USERROLE_KEY);
  }

  isUserLoggedIn() {
    let user = window.sessionStorage.getItem(SESSION_STORAGE_USERNAME_KEY);
    if (user === null) {
      return false;
    }
    return true;
  }

  getLoggedInUsername() {
    let user = window.sessionStorage.getItem(SESSION_STORAGE_USERNAME_KEY);
    return user;
  }

  getLoggedInUserRole() {
    let role = window.sessionStorage.getItem(SESSION_STORAGE_USERROLE_KEY);
    return role;
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

export default new AuthenticationService();
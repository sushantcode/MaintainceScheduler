import axios from "axios";

export const API_URL = "http://localhost:8080/api/v1";

export const SESSION_STORAGE_USERNAME_KEY = "Authenticated_Username";
export const SESSION_STORAGE_USERROLE_KEY = "Authenticated_UserRole";
export const SESSION_STORAGE_FIRSTNAME_KEY = "Authenticated_FirstName";
export const SESSION_STORAGE_LASTNAME_KEY = "Authenticated_LastName";
export const SESSION_STORAGE_EMAIL_KEY = "Authenticated_Email";
export const SESSION_STORAGE_TOKEN_KEY = "Session_Token";

class AuthenticationService {

  executeBasicAuthenticationService(username, password) {
    return axios.get(`${API_URL}/login?username=${username}`,
        { headers: { authorization: this.createBasicAuthToken(username, password) } })
  }

  createBasicAuthToken(username, password) {
      return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfullLogin(user, password) {
      const token = this.createBasicAuthToken(user.username, password);
      window.sessionStorage.setItem(SESSION_STORAGE_USERNAME_KEY, user.username);
      window.sessionStorage.setItem(SESSION_STORAGE_USERROLE_KEY, user.role);
      window.sessionStorage.setItem(SESSION_STORAGE_FIRSTNAME_KEY, user.fname);
      window.sessionStorage.setItem(SESSION_STORAGE_LASTNAME_KEY, user.lname);
      window.sessionStorage.setItem(SESSION_STORAGE_EMAIL_KEY, user.email);
      window.sessionStorage.setItem(SESSION_STORAGE_TOKEN_KEY, token);
      this.setupAxiosInterceptors(token)
  }

  logout() {
    window.sessionStorage.clear();
  }

  isUserLoggedIn() {
    let user = window.sessionStorage.getItem(SESSION_STORAGE_USERNAME_KEY);
    if (user === null) {
      return false;
    }
    return true;
  }

  getLoggedInUsername() {
    return window.sessionStorage.getItem(SESSION_STORAGE_USERNAME_KEY);
  }

  getLoggedInUserRole() {
    return window.sessionStorage.getItem(SESSION_STORAGE_USERROLE_KEY);
  }

  getLoggedInUserFirstName() {
    return window.sessionStorage.getItem(SESSION_STORAGE_FIRSTNAME_KEY);
  }

  getLoggedInUserLastName() {
    return window.sessionStorage.getItem(SESSION_STORAGE_LASTNAME_KEY);
  }

  getLoggedInUserEmail() {
    return window.sessionStorage.getItem(SESSION_STORAGE_EMAIL_KEY);
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

  Axios() {
    this.setupAxiosInterceptors(window.sessionStorage.getItem(SESSION_STORAGE_TOKEN_KEY));
    return axios;
  }
}

export default new AuthenticationService();
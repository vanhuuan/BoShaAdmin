class TokenService {
  getLocalRefreshToken() {
    const user = localStorage.getItem("RefreshToken");
    return user;
  }

  getLocalAccessToken() {
    const user = localStorage.getItem("AccessToken");
    return user;
  }

  updateLocalAccessToken(token) {
    localStorage.setItem("AccessToken", token);
  }

  removeUser() {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("RefreshToken");
  }
}

export default new TokenService();
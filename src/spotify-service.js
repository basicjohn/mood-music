var ClientOAuth2 = require("client-oauth2");

export default class SpotifyService {
  constructor() {
    this.getAuthToken();
  }
  static async getAuthToken() {
    var githubAuth = new ClientOAuth2({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      grantType: "client_credentials",
      accessTokenUri: "https://accounts.spotify.com/api/token",
    });
    githubAuth.credentials.getToken().then(function (user) {
      return user.accessToken;
    });
  }
}

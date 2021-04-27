var ClientOAuth2 = require("client-oauth2");

export default class SpotifyService {
  static getAuthToken() {
    var githubAuth = new ClientOAuth2({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      grantType: "client_credentials",
      accessTokenUri: "https://accounts.spotify.com/api/token",
    });
    return githubAuth.credentials
      .getToken()
      .then(function (user) {
        if (!user) {
          throw new Error(user.error);
        }
        return user.data.access_token;
      })
      .catch((err) => console.log(err));
  }
  static getPlaylistWithTokenAndKeyword(authToken, keyword) {
    return fetch(
      `https://api.spotify.com/v1/browse/categories/${keyword}/playlists?country=US&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
      .then(function (response) {
        if (!response) {
          throw new Error(response.status);
        }
        //console.log(`response: ${response.body}`);
        return response.json();
      })
      .catch((err) => console.log(`err = ${err}`));
  }
}

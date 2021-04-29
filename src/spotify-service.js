var ClientOAuth2 = require("client-oauth2");

export default class SpotifyService {
  constructor() {}

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
        return user;
      })
      .catch(function (err) {
        return err;
      });
  }
  static getPlaylistWithKeyword(keyword) {
    return fetch(
      `https://api.spotify.com/v1/search?q=${keyword}&type=playlist&market=US&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${this.authToken}`,
        },
      }
    )
      .then(function (response) {
        if (!response.ok) {
          throw new Error(response);
        }
        return response.json();
      })
      .catch(function (err) {
        return err;
      });
  }

  static getRandomArtistWithURL(url) {
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${this.authToken}`,
      },
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error(response);
        }
        return response.json();
      })
      .catch(function (error) {
        return error;
      });
  }
}

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

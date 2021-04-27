//import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import SpotifyService from "./spotify-service.js";

function runSpotify() {
  SpotifyService.getAuthToken().then(function (token) {
    SpotifyService.getPlaylistWithTokenAndKeyword(token, "chill").then(
      function (data) {
        if (data) {
          console.log(data.playlists.items);
        } else {
          console.log("Still...WTF!?");
        }
      }
    );
  });
}

runSpotify();

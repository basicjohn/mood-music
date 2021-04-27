//import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import SpotifyService from "./spotify-service.js";
import Playlists from "./playlists.js";
import Playlist from "./playlist.js";

function runSpotify() {
  SpotifyService.getAuthToken().then(function (token) {
    SpotifyService.getPlaylistWithTokenAndKeyword(token, "chill").then(
      function (data) {
        if (data) {
          createPlaylists(data.playlists.items);
          //console.log(data.playlists.items);
        } else {
          console.log("Still...WTF!?");
        }
      }
    );
  });
}

const createPlaylists = (list) => {
  let playLists = new Playlists();
  list.forEach(function (item) {
    let playList = new Playlist();
    for (const [key, value] of Object.entries(item)) {
      playList[key] = value;
    }
    playLists.items.push(playList);
  });
  console.log(playLists);
};

runSpotify();

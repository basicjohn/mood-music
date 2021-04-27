//import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import SpotifyService from "./spotify-service.js";
import Playlists from "./playlists.js";
import Playlist from "./playlist.js";

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

function runSpotify() {
  SpotifyService.getAuthToken().then(function (response) {
    if (response.accessToken) {
      SpotifyService.authToken = response.accessToken;
      getPlaylists();
    } else {
      console.log("There's been an error...");
    }
  });
}

const getPlaylists = () => {
  //createPlaylists([]);
  SpotifyService.getPlaylistWithKeyword("chill").then(function (data) {
    if (data) {
      createPlaylists(data.playlists.items);
    } else {
      console.log("Still...WTF!?");
    }
  });
};

const createPlaylists = (list) => {
  let playLists = new Playlists();
  list.forEach(function (item) {
    let playList = new Playlist();
    for (const [key, value] of Object.entries(item)) {
      playList[key] = value;
    }
    playLists.items.push(playList);
  });
  getRandomArtist(playLists.items.random());
};

const getRandomArtist = (playlist) => {
  //console.log(playlist);
  SpotifyService.getRandomArtistWithURL(playlist.tracks.href).then(function (
    response
  ) {
    console.log(response.items.random().track.artists.random().name);
  });
};

runSpotify();

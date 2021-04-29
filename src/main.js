import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import SpotifyService from "./spotify-service";
import Playlists from "./playlists.js";
import Playlist from "./playlist.js";
import Constants from "./constants.js";
import TasteDiveService from "./taste-dive-service";
// Helper logic
const createPlaylists = (list) => {
  let playLists = new Playlists();
  list.forEach(function (item) {
    let playList = new Playlist();
    for (const [key, value] of Object.entries(item)) {
      playList[key] = value;
    }
    playLists.items.push(playList);
  });
  return playLists.items.random().id;
};
const getAuthToken = () => {
  SpotifyService.getAuthToken().then(function (data) {
    if (data instanceof Error === false) {
      SpotifyService.authToken = data.accessToken;
    } else {
      alert(`error: ${data.message}`);
    }
  });
};

// UI Logic
function embedPlaylist(playlistId) {
  $(".spotify-player").html("");
  $(".spotify-player").append(`
    <h3>Music</h3>
    <iframe
      src="https://open.spotify.com/embed/playlist/${playlistId}"
      width="100%"
      height="750px"
      frameborder="2"
      allowtransparency="true"
      allow="encrypted-media"
      >
    </iframe>`);
}

const changeThemeColor = (color, clicked) => {
  let theRules = new Array();
  const styleSheet = document.styleSheets[1];
  if (styleSheet.cssRules) {
    theRules = document.styleSheets[1].cssRules;
  } else if (styleSheet.rules) {
    theRules = document.styleSheets[1].rules;
  }
  let rule = theRules[0].style;
  if (clicked) {
    rule.setProperty("--main-color", color);
  } else {
    rule.setProperty("--text-color", color);
  }
};

$(document).ready(function () {
  let constants = new Constants();
  let sliderIndex = 0;
  let rangeInput = $("#valenceRange").val();
  $("#valenceOutput").html(constants.inputKeywords[rangeInput]);
  getAuthToken();
  $(document).on("input", "#valenceRange", function () {
    sliderIndex = $(this).val() - 1;
    $("#valenceOutput").html(constants.inputKeywords[sliderIndex]);
    changeThemeColor(constants.colorArray[sliderIndex], false);
  });

  $("#find").on("click", () => {
    const keyWord = constants.spotifyKeywords[sliderIndex];
    SpotifyService.getPlaylistWithKeyword(keyWord).then(function (data) {
      if (data instanceof Error === false) {
        let playlistId = createPlaylists(data.playlists.items);
        embedPlaylist(playlistId);
        changeThemeColor(constants.colorArray[sliderIndex], true);
        makeApiCall(constants.movieMoodTitles[sliderIndex]);
      } else {
        alert(data);
      }
    });
  });
});

function getElements(response) {
  if (response instanceof Error) {
    alert(response);
  } else {
    addMovieResults(response.Similar.Results);
  }
}

function addMovieResults(results) {
  $("#movie-results").empty();
  $("#movie-results").append(`
    <div class="col-md-12">
    <h3>Movies</h3>
  </div>`);
  results.forEach(function (result) {
    $("#movie-results").append(`<div class="col-md-12 movie-result">
                <h4 class="title">${result.Name}</h4>
                <p class="description">${result.wTeaser.substring(
                  0,
                  125
                )}...</p>
                <h5 class="resource"><a href="${
                  result.yUrl
                }">Watch Trailer</a></h5>
              </div>`);
  });
}

async function makeApiCall(movieTitle) {
  const response = await TasteDiveService.getSimilarMovies(movieTitle);
  getElements(response);
}

import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import SpotifyService from "./spotify-service";
import Playlists from "./playlists.js";
import Playlist from "./playlist.js";

let spotifyKeywords = [
  "devastated",
  "coping",
  "heartache",
  "dark",
  "boost",
  "alone",
  "spooky",
  "crazy",
  "stress",
  "sad",
  "tender",
  "commute",
  "cleaning",
  "rainy day",
  "focus",
  "bed",
  "beats",
  "morning",
  "wake up",
  "work from home",
  "coffeehouse",
  "chill",
  "porch",
  "feels",
  "good vibes",
  "smile",
  "ballads",
  "caviar",
  "warm",
  "park",
  "feel-good",
  "date night",
  "dinner",
  "happy",
  "greatest",
  "perfect",
  "wild",
  "bad bitch",
  "cardio",
  "workout",
  "gameday",
  "tailgate",
  "champs",
  "beautiful",
  "love",
  "confidence",
  "party",
  "songs in the shower",
];
let inputKeywords = [
  "devastated",
  "mournful",
  "heartbroken",
  "dark",
  "beleaguered",
  "alone",
  "scared",
  "crazy",
  "stressed",
  "sad",
  "tender",
  "irritated",
  "fastidious",
  "bored",
  "preoccupied",
  "lazy",
  "studious",
  "sleepy",
  "eager",
  "busy",
  "undercaffeinated",
  "relaxed",
  "curious",
  "groovy",
  "dreamy",
  "playful",
  "emotional",
  "defiant",
  "cute",
  "cheerful",
  "upbeat",
  "sexy",
  "nostalgiac",
  "happy",
  "timeless",
  "perfect",
  "adventurous",
  "sassy",
  "driven",
  "hardcore",
  "intense",
  "territorial",
  "triumphant",
  "beautiful",
  "amorous",
  "confident",
  "outgoing",
  "euphoric",
];

// function storeKeywords() {
//   let spotifyKeywords = ["devastated", "coping", "heartache", "dark", "boost", "alone", "spooky", "crazy", "stress", "sad", "tender", "commute", "cleaning", "rainy day", "focus", "bed", "beats", "morning", "wake up", "work from home", "coffeehouse", "chill", "porch", "feels", "good vibes", "smile", "ballads", "caviar", "warm", "park", "feel-good", "date night", "dinner", "happy", "greatest", "perfect", "wild", "bad bitch", "cardio", "workout", "gameday", "tailgate", "champs", "beautiful", "love", "confidence", "party", "songs in the shower"];
//   sessionStorage.setItem("spotifyKeywords", spotifyKeywords);
//   let inputKeywords = ["devastated", "mournful", "heartbroken", "dark", "beleaguered", "alone", "scared", "crazy", "stressed", "sad", "tender", "irritated", "fastidious", "bored", "preoccupied", "lazy", "studious", "sleepy", "eager", "busy", "undercaffeinated", "relaxed", "curious", "groovy", "dreamy", "playful", "emotional", "defiant", "cute", "cheerful", "upbeat", "sexy", "nostalgiac", "happy", "timeless", "perfect", "adventurous", "sassy", "driven", "hardcore", "intense", "territorial", "triumphant", "beautiful", "amorous", "confident", "outgoing", "euphoric"];
//   sessionStorage.setItem("inputKeywords", inputKeywords);
// }

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
    <h3>Set the mood with a playlist</h3>
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

const changeThemeColor = (color) => {
  console.log(color);
  $("span").removeClass().addClass(color);
};
$(document).ready(function () {
  let sliderIndex = 0;
  let rangeInput = $("#valenceRange").val();
  $("#valenceOutput").text(rangeInput);
  getAuthToken();

  $(document).on("input", "#valenceRange", function () {
    sliderIndex = $(this).val() - 1;
    $("#valenceOutput").html(inputKeywords[sliderIndex]);
    $("#valenceOutput").removeClass().addClass(inputKeywords[sliderIndex]);
  });

  $("#find").on("click", () => {
    const keyWord = spotifyKeywords[sliderIndex];
    SpotifyService.getPlaylistWithKeyword(keyWord).then(function (data) {
      if (data instanceof Error === false) {
        let playlistId = createPlaylists(data.playlists.items);
        embedPlaylist(playlistId);
        changeThemeColor(inputKeywords[sliderIndex]);
      } else {
        console.log("Still...WTF!?");
      }
    });
  });
});

import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import SpotifyService from "./spotify-service";
import Playlists from "./playlists.js";
import Playlist from "./playlist.js";

const colorArray = [
  "#0000",
  "#01000a",
  "#02c6f7",
  "#04068a",
  "#0444ba",
  "#046b8a",
  "#09f205",
  "#118dfa",
  "#127351",
  "#192529",
  "#1ac6d9",
  "#2c9e52",
  "#34e024",
  "#3a1ad9",
  "#48b6fa",
  "#4b0a5c",
  "#4d5254",
  "#4e4c5c",
  "#543333",
  "#5badeb",
  "#5f5b7d",
  "#663a87",
  "#6e122f",
  "#7907fa",
  "#93aaf5",
  "#96ffcb",
  "#990f1b",
  "#a1bf1b",
  "#a3eef0",
  "#ac11fa",
  "#b56353",
  "#c20d04",
  "#c9970c",
  "#ced8db",
  "#dbf0a3",
  "#dc48fa",
  "#e05f46",
  "#e813d3",
  "#eff70a",
  "#f4f716",
  "#f70a9c",
  "#f7be02",
  "#f7c1d0",
  "#fa0000",
  "#fc0a47",
  "#fc7f0a",
  "#ffe205",
  "#ffff87",
];
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
  //console.log(color);
  let theRules = new Array();
  const styleSheet = document.styleSheets[1];
  if (styleSheet.cssRules) {
    theRules = document.styleSheets[1].cssRules;
  } else if (styleSheet.rules) {
    theRules = document.styleSheets[1].rules;
  }
  let rule = theRules[0].style;
  rule.setProperty("--main-color", color);
};

$(document).ready(function () {
  let sliderIndex = 0;
  let rangeInput = $("#valenceRange").val();
  $("#valenceOutput").text(rangeInput);
  getAuthToken();

  $(document).on("input", "#valenceRange", function () {
    sliderIndex = $(this).val() - 1;
    console.log(sliderIndex);
    $("#valenceOutput").html(inputKeywords[sliderIndex]);
    changeThemeColor(colorArray[sliderIndex]);
  });

  $("#find").on("click", () => {
    console.log(colorArray.length, inputKeywords.length);
    const keyWord = spotifyKeywords[sliderIndex];
    SpotifyService.getPlaylistWithKeyword(keyWord).then(function (data) {
      if (data instanceof Error === false) {
        let playlistId = createPlaylists(data.playlists.items);
        embedPlaylist(playlistId);
      } else {
        console.log("Still...WTF!?");
      }
    });
  });
});

import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import SpotifyService from "./spotify-service";
import Playlists from "./playlists.js";
import Playlist from "./playlist.js";

let spotifyKeywords = ["devastated", "coping", "heartache", "dark", "boost", "alone", "spooky", "crazy", "stress", "sad", "tender", "commute", "cleaning", "rainy day", "focus", "bed", "beats", "morning", "wake up", "work from home", "coffeehouse", "chill", "porch", "feels", "good vibes", "smile", "ballads", "caviar", "warm", "park", "feel-good", "date night", "dinner", "happy", "greatest", "perfect", "wild", "bad bitch", "cardio", "workout", "gameday", "tailgate", "champs", "beautiful", "love", "confidence", "party", "songs in the shower"];
let inputKeywords = ["devastated", "mournful", "heartbroken", "dark", "beleaguered", "alone", "scared", "crazy", "stressed", "sad", "tender", "irritated", "fastidious", "bored", "preoccupied", "lazy", "studious", "sleepy", "eager", "busy", "undercaffeinated", "relaxed", "curious", "groovy", "dreamy", "playful", "emotional", "defiant", "cute", "cheerful", "upbeat", "sexy", "nostalgiac", "happy", "timeless", "perfect", "adventurous", "sassy", "driven", "hardcore", "intense", "territorial", "triumphant", "beautiful", "amorous", "confident", "outgoing", "euphoric"];

// function storeKeywords() {
//   let spotifyKeywords = ["devastated", "coping", "heartache", "dark", "boost", "alone", "spooky", "crazy", "stress", "sad", "tender", "commute", "cleaning", "rainy day", "focus", "bed", "beats", "morning", "wake up", "work from home", "coffeehouse", "chill", "porch", "feels", "good vibes", "smile", "ballads", "caviar", "warm", "park", "feel-good", "date night", "dinner", "happy", "greatest", "perfect", "wild", "bad bitch", "cardio", "workout", "gameday", "tailgate", "champs", "beautiful", "love", "confidence", "party", "songs in the shower"];
//   sessionStorage.setItem("spotifyKeywords", spotifyKeywords);
//   let inputKeywords = ["devastated", "mournful", "heartbroken", "dark", "beleaguered", "alone", "scared", "crazy", "stressed", "sad", "tender", "irritated", "fastidious", "bored", "preoccupied", "lazy", "studious", "sleepy", "eager", "busy", "undercaffeinated", "relaxed", "curious", "groovy", "dreamy", "playful", "emotional", "defiant", "cute", "cheerful", "upbeat", "sexy", "nostalgiac", "happy", "timeless", "perfect", "adventurous", "sassy", "driven", "hardcore", "intense", "territorial", "triumphant", "beautiful", "amorous", "confident", "outgoing", "euphoric"];
//   sessionStorage.setItem("inputKeywords", inputKeywords);
// }

const createPlaylists = (list) => {
  let playLists = new Playlists();
  list.forEach(function (item) {
    let playList = new Playlist();
    for (const [key, value] of Object.entries(item)) {
      playList[key] = value;
    }
    playLists.items.push(playList);
  });
  console.log(playLists.items.random());
};
// UI Logic
$(document).ready(function () {
  let sliderIndex = 0;
  let rangeInput = $("#valenceRange").val();
  //console.log(inputKeywords.length);
  $("#valenceOutput").text(rangeInput);

  SpotifyService.getAuthToken()
    .then(function(data) {
      console.log(data);
      if(!data.error){
        SpotifyService.authToken = data.accessToken;
        // this means we have accessToken, and can proceed with app
      } else {
        // No accessToken, and need to show error
        console.log(`${data.error}`);
      }
    });
  
  $(document).on('input', '#valenceRange', function() {
    
    $('#valenceOutput').html( inputKeywords[$(this).val()] );
    sliderIndex = $(this).val();
  });

  $("#find").on("click", () => {
    const keyWord = spotifyKeywords[sliderIndex];
    console.log(keyWord);
      SpotifyService.getPlaylistWithKeyword(keyWord).then(function (data) {
    if (!data.error) {
      createPlaylists(data.playlists.items);
    } else {
      console.log("Still...WTF!?");
    }
  });
  });

});

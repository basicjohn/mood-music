import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
// import SpotifyService from "./spotify-service.js";

function storeKeywords() {
  let spotifyKeywords = ["devastated", "coping", "heartache", "dark", "boost", "alone", "spooky", "crazy", "stress", "sad", "tender", "commute", "cleaning", "rainy day", "focus", "bed", "beats", "morning", "wake up", "work from home", "coffeehouse", "chill", "porch", "feels", "good vibes", "smile", "ballads", "caviar", "warm", "park", "feel-good", "date night", "dinner", "happy", "greatest", "perfect", "wild", "bad bitch", "cardio", "workout", "gameday", "tailgate", "champs", "beautiful", "love", "confidence", "party", "songs in the shower"];
  sessionStorage.setItem("spotifyKeywords", spotifyKeywords);
  let inputKeywords = ["devastated", "mournful", "heartbroken", "dark", "beleaguered", "alone", "scared", "crazy", "stressed", "sad", "tender", "irritated", "fastidious", "bored", "preoccupied", "lazy", "studious", "sleepy", "eager", "busy", "undercaffeinated", "relaxed", "curious", "groovy", "dreamy", "playful", "emotional", "defiant", "cute", "cheerful", "upbeat", "sexy", "nostalgiac", "happy", "timeless", "perfect", "adventurous", "sassy", "driven", "hardcore", "intense", "territorial", "triumphant", "beautiful", "amorous", "confident", "outgoing", "euphoric"];
  sessionStorage.setItem("inputKeywords", inputKeywords);
}

function getKeyword(inputKeyword) {
  let spotifyKeywords = sessionStorage.getItem(spotifyKeywords);
  let inputKeywords = sessionStorage.getItem(inputKeywords);
  for (let i = 0; i < spotifyKeywords.length; i++) {
    if (inputKeywords[i].includes(inputKeyword)) {
      return spotifyKeywords[i];
    }
  }
}

// function runSpotify() {
//   SpotifyService.getAuthToken().then(function (token) {
//     SpotifyService.getPlaylistWithTokenAndKeyword(token, "chill").then(
//       function (data) {
//         if (data) {
//           console.log(data.playlists.items);
//         } else {
//           console.log("Still...WTF!?");
//         }
//       }
//     );
//   });
// }

// runSpotify();


// UI Logic
$(document).ready(function () {
  let rangeInput = $("#valenceRange").val();
  console.log(rangeInput);
  $("#valenceOutput").text(rangeInput);


  $(document).on('input', '#valenceRange', function() {
    
    $('#valenceOutput').html( $(this).val() );

  });
});
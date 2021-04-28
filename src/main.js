//import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import SpotifyService from "./spotify-service.js";
import TasteDiveService from "./taste-dive-service";

SpotifyService.getAuthToken().then(function (response) {
  console.log(response);
});

function getElements(response) {
  if (response.main) {
    console.log(response);
  } else {
    console.log("Error");
  }
}

async function makeApiCall(movieTitle) {
  const response = await TasteDiveService.getSimilarMovies(movieTitle);
  getElements(response);
}

makeApiCall(bookTitle);

const movieMoodTitles = [
  "The Sky Is Pink",
  "Bringing Up Baby",
  "Like crazy",
  "The Mist",
  "Pitch Perfect",
  "Lost In Translation",
  "Ginger Snaps",
  "Fight Club",
  "Buried",
  "My Life",
  "Illegal Tender",
  "The Commuter",
  "Sunshine Cleaning",
  "A Rainy Day In New York",
  "Fifty Shades Of Grey",
  "Her Side Of The Bed",
  "Moonlight",
  "The Hangover",
  "Nobody",
  "Paid In Full",
  "Coffee Shop",
  "Drinking Buddies",
  "Baby Blues",
  "The Feels",
  "Mamma Mia!",
  "A Smile Like Yours",
  "Black Rain",
  "The Diary Of A Teenage Girl",
  "Amélie",
  "Jurassic Park",
  "Booksmart",
  "Hitch",
  "The Dinner",
  "Begin Again",
  "The Proposal",
  "Paddington",
  "Wild",
  "Won't You Be My Neighbor?",
  "Fast And Furious",
  "Rocky",
  "The Other Guys",
  "Samaria",
  "The Champ",
  "Children Of Heaven",
  "The Photograph",
  "Sex And The City",
  "Sisters",
  "The Tallest Man On Earth"
];
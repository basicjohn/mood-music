//import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import SpotifyService from "./spotify-service.js";

SpotifyService.getAuthToken().then(function (response) {
  console.log(response);
});

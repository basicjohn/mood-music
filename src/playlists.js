export default class Playlists {
  constructor() {
    this.items = [];
  }

  getRandonPlaylists() {
    return this.items[Math.floor(Math.random()) * this.items.length];
  }
}

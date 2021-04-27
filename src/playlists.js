export default class Playlists {
  constructor() {
    this.items = [];
  }

  getRandonPlaylists() {
    return this.items.random();
  }
}

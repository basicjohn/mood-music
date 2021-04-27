export default class Embed {
  embed(uri) {
    return embedScript = `<iframe src="https://open.spotify.com/embed/${uri}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
  }
}

// template embed script <iframe src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
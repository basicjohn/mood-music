export default class TasteDiveService {
  static async getSimilarMovies(movieTitle) {
    try {
      const response = await fetch(`https://tastedive.com/api/similar?q=${movieTitle}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }
}
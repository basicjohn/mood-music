export default class TasteDiveService {
  static async getSimilarMovies(movieTitle) {
    try {
      const response = await fetch(
        `http://tastedive.com/api/similar?q=${movieTitle}&k=${process.env.API_KEY}`,
        {
          mode: "no-cors",
        }
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch (error) {
      return error;
    }
  }
}

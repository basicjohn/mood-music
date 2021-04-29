export default class TasteDiveService {
  static async getSimilarMovies(movieTitle) {
    try {
      const response = await fetch(
        `https://hidden-ocean-01006.herokuapp.com/https://tastedive.com/api/similar?q=movie:${movieTitle}&type=movies&limit=5&info=1&k=${process.env.API_KEY}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
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

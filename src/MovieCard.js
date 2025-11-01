import { URL_IMAGES } from "./Constants.js";
import "./Styles.css";

export default function MovieCard({ movie }) {
  const posterURL = `${URL_IMAGES}${movie.poster_path}`;
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const releaseDate = movie.release_date || "Unknown";

  return (
    <div className="movie-card">
      <img src={posterURL} alt={movie.title} className="movie-poster" />
      <div className="movie-description">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-info">Release Date: {releaseDate}</p>
        <p className="movie-info">Rating: {rating}</p>
      </div>
    </div>
  );
}

import MovieCard from "./MovieCard";
import "./Styles.css";

export default function MoviesList({ movies }) {
  return (
    <div className="movies-container">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

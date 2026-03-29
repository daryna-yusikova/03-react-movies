import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css'
interface MovieGridTypes{
    onSelect: (e: React.MouseEvent<HTMLLIElement>) => void;
    movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridTypes) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => {
        return (
          <li key={movie.id} data-id={movie.id} onClick={onSelect}>
            <div className={css.card}>
              <img
                className={css.image}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
              />
              <h2 className={css.title}>{movie.title}</h2>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
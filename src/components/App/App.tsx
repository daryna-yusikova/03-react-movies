import { useState} from 'react'
import SearchBar from '../SearchBar/SearchBar'
import toast, { Toaster } from 'react-hot-toast'
import fetchMovies from '../../services/movieService';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

function App() {
  const [moviesList, setMoviesList] = useState<Movie[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  async function FormHandler(submitQuery: string) {
    setMoviesList([]);
    setErrorMessage(false);
    if (submitQuery === '') { toast.error('Please enter your search query.'); return }
    setLoader(true);
    try {
      const movies: Movie[] | null = await fetchMovies(submitQuery);
      if (movies === null) { setMoviesList([]); toast.error('No movies found for your request.'); } else {
        setMoviesList(movies);
      }
    }   catch (err) { setErrorMessage(true);}
    finally {
      setLoader(false);
    }
}

  function movieGridHandler(e: React.MouseEvent<HTMLLIElement>) {
    const selectedMovieId = e.currentTarget.dataset.id; 
    const movie = moviesList.find(movie => (String(movie.id) === selectedMovieId));
    if (!movie) { return; }
    setSelectedMovie(movie);
    setModal(true);

  }
  
  function closeModalHandler() { setModal(false); setSelectedMovie(null); }
  

  return (
    <>
      
      <Toaster />
      <SearchBar onSubmit={FormHandler} />
      {loader ? <Loader /> : null}
      {errorMessage ? <ErrorMessage /> : null}
      {moviesList.length > 0 ? <MovieGrid onSelect={movieGridHandler} movies={moviesList} /> : null}
      {selectedMovie && modal ? <MovieModal movie={selectedMovie} onClose={closeModalHandler} /> : null}
    </>
  )
}

export default App

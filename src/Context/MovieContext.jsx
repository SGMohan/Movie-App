import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Loading from "../Components/Loading";

const MovieContext = createContext();
export const useMovie = () => useContext(MovieContext);

const movieReducer = (state, action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return {
        ...state,
        movies: action.payload,
        allMovies: action.payload,
        error: null,
      };
    case "SET_ERROR":
      return { ...state, error: action.payload, movies: [], allMovies: [] };
    case "FILTER_BY_GENRE":
      return {
        ...state,
        movies:
          action.payload === "All"
            ? state.allMovies
            : state.allMovies.filter(
                (movie) =>
                  movie.Genre &&
                  movie.Genre.toLowerCase().includes(
                    action.payload.toLowerCase()
                  )
              ),
      };
    default:
      return state;
  }
};

const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, {
    movies: [],
    allMovies: [],
    error: null,
  });

  const [searchTerm, setSearchTerm] = useState("Don");
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("All");

  const API_URL = "https://www.omdbapi.com/?";

  const fetchMovieDetails = async (movie) => {
    try {
      const { data } = await axios.get(API_URL, {
        params: {
          i: movie.imdbID,
          apikey: "5946fd15",
        },
      });
      return {
        ...movie,
        Genre: data.Genre || "Unknown",
        Plot: data.Plot || "No description available",
      };
    } catch {
      return {
        ...movie,
        Genre: "Unknown",
        Plot: "No description available",
      };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(API_URL, {
          params: {
            s: searchTerm,
            apikey: "5946fd15",
          },
        });

        if (data.Response === "True") {
          const detailedMovies = await Promise.all(
            data.Search.map(fetchMovieDetails)
          );
          dispatch({ type: "SET_MOVIES", payload: detailedMovies });
        } else {
          dispatch({
            type: "SET_ERROR",
            payload: data.Error || "No movies found",
          });
        }
      } catch {
        dispatch({
          type: "SET_ERROR",
          payload: "An error occurred while fetching movies",
        });
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm.trim()) fetchData();
    else dispatch({ type: "SET_MOVIES", payload: [] });
  }, [searchTerm]);

  const filterByGenre = (genre) => {
    setSelectedGenre(genre);
    dispatch({ type: "FILTER_BY_GENRE", payload: genre });
  };

  const getAvailableGenres = () => {
    const genres = new Set(["All"]);
    state.allMovies.forEach((movie) => {
      if (movie.Genre) {
        movie.Genre.split(", ").forEach((g) => genres.add(g.trim()));
      }
    });
    return Array.from(genres);
  };

  return (
    <MovieContext.Provider
      value={{
        ...state,
        dispatch,
        searchTerm,
        setSearchTerm,
        loading,
        selectedGenre,
        filterByGenre,
        getAvailableGenres,
      }}
    >
      {loading ? <Loading /> : children}
    </MovieContext.Provider>
  );
};

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MovieProvider;
export { MovieContext };

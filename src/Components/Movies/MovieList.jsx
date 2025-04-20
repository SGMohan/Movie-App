import React from "react";
import { useMovie } from "../../Context/MovieContext";
import { FiInfo } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const MovieList = () => {
  const { movies, error, searchTerm } = useMovie();
  const navigate = useNavigate();
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 min-h-[50vh] container mx-auto">
      {/* Movie List Section */}
      {movies.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-5 md:gap-6 my-12">
          {movies.map((movie) => (
            <li
              key={movie.imdbID}
              className="hover:cursor-pointer group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-row sm:flex-col h-[140px] sm:h-auto transform hover:-translate-y-1"
            >
              {/* Poster - Mobile Left / Desktop Top */}
              <div className="relative w-1/3 sm:w-full aspect-[2/3] sm:aspect-[3/4] min-w-[120px] sm:min-w-0 overflow-hidden">
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/300x450?text=No+Poster"
                  }
                  alt={movie.Title}
                  onClick={() => navigate(`/moviedetail/${movie.imdbID}`)}
                  className="w-full h-full object-fit hover:cursor-pointer "
                />
                {/* Info icon - visible only on mobile */}
                <button
                  onClick={() => navigate(`/moviedetail/${movie.imdbID}`)}
                  className="sm:hidden absolute top-2 left-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors hover:cursor-pointer"
                >
                  <FiInfo size={16} />
                </button>
                {/* Year badge - visible on hover for medium/large, always on mobile */}
                <span className="sm:absolute sm:top-2 sm:right-2 bg-blue-600 dark:bg-red-500 text-white text-[0.65rem] sm:text-xs font-bold px-2 py-1 rounded-full sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  {movie.Year}
                </span>
              </div>

              {/* Info Block */}
              <div className="w-2/3 sm:w-full px-4 py-1 sm:p-3 gap-1 sm:gap-2 overflow-hidden bg-white dark:bg-gray-800 sm:bg-white/10 dark:sm:bg-gray-700 sm:rounded-b-lg flex flex-col justify-between">
                <div>
                  {/* Title and View Details Button */}
                  <div className="flex justify-between items-center">
                    <div className="inline-block relative flex-1">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white my-2 hover:cursor-pointer inline-block line-clamp-1 group-hover:text-blue-900 dark:group-hover:text-red-400 transition-colors duration-300 relative">
                        {movie.Title}
                        <div className="absolute bottom-0 left-0 h-0.5 bg-blue-500 dark:bg-red-400 w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </h3>
                    </div>
                    {/* View Details Button - Now permanently visible on desktop */}

                    <button
                      onClick={() => navigate(`/moviedetail/${movie.imdbID}`)}
                      className="hidden sm:block text-xs sm:text-sm bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-full transition-all duration-300 hover:cursor-pointer shadow hover:shadow-red-500/30 ml-2"
                    >
                      <FiInfo size={20} />
                    </button>
                  </div>

                  {/* Year - Mobile only (hidden on medium/large) */}
                  <span className="sm:hidden text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                    {movie.Year}
                  </span>

                  <div className="flex flex-wrap gap-1 mt-1 mb-3">
                    {movie.Genre ? (
                      movie.Genre.split(",").map((genre, index) => (
                        <span
                          key={index}
                          className="text-[12px] sm:text-xs bg-blue-100 text-gray-900 dark:bg-gray-500 dark:text-gray-200 px-2 py-0.75 rounded-full group-hover:bg-blue-200 dark:group-hover:bg-gray-600 transition-colors duration-300"
                        >
                          {genre.trim()}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Unknown
                      </span>
                    )}
                  </div>

                  {/* Plot */}
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 max-h-[36px] sm:max-h-none italic font-serif mb-1 sm:mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                    {movie.Plot || "No description available"}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-12 min-h-[40vh]">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-4 sm:mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 sm:h-16 w-12 sm:w-16 mx-auto text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 mb-2 sm:mb-3">
              {error.includes("No movies found") ? (
                <>
                  No results for{" "}
                  <span className="font-bold text-red-500">"{searchTerm}"</span>
                </>
              ) : (
                "Oops! Something went wrong"
              )}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
              {error.includes("No movies found")
                ? "Try searching for something else"
                : error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 hover:cursor-pointer sm:px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300 text-sm sm:text-base"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MovieList;

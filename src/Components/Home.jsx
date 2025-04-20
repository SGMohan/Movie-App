import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiPlay,
  FiSearch,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaImdb } from "react-icons/fa";
import { useTheme } from "../Context/ThemeContext";

// Featured movies data
const featuredMovies = [
  {
    id: "tt15398776",
    title: "Oppenheimer",
    year: "2023",
    tagline: "The world forever changes",
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
    backdrop:
      "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
    genre: "Biography, Drama, History",
    rating: 8.5,
    runtime: "180 min",
    director: "Christopher Nolan",
  },
  {
    id: "tt9362722",
    title: "Spider-Man: Across the Spider-Verse",
    year: "2023",
    tagline: "It's how you wear the mask that matters",
    description:
      "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg",
    backdrop:
      "https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg",
    genre: "Animation, Action, Adventure",
    rating: 8.7,
    runtime: "140 min",
    director: "Joaquim Dos Santos",
  },
  {
    id: "tt1517268",
    title: "Barbie",
    year: "2023",
    tagline: "She's everything. He's just Ken.",
    description:
      "Barbie suffers a crisis that leads her to question her world and her existence, prompting a journey of self-discovery.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
    backdrop:
      "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
    genre: "Adventure, Comedy, Fantasy",
    rating: 7.0,
    runtime: "114 min",
    director: "Greta Gerwig",
  },
];

// Trending movies data
const trendingMovies = [
  {
    id: "tt27118357",
    title: "Amaran",
    year: "2024",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNTAzMGQ2MGItMjk5OC00YWIwLThmMjUtYmNjMTIxNzVlZWQ4XkEyXkFqcGc@._V1_SX300.jpg",
    genre: "Action, Drama",
    rating: 8.1,
  },
  {
    id: "tt6718170",
    title: "The Super Mario Bros. Movie",
    year: "2023",
    poster:
      "https://m.media-amazon.com/images/M/MV5BOTJhNzlmNzctNTU5Yy00N2YwLThhMjQtZDM0YjEzN2Y0ZjNhXkEyXkFqcGdeQXVyMTEwMTQ4MzU5._V1_SX300.jpg",
    genre: "Animation, Adventure, Comedy",
    rating: 7.0,
  },
  {
    id: "tt10366206",
    title: "John Wick: Chapter 4",
    year: "2023",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SX300.jpg",
    genre: "Action, Crime, Thriller",
    rating: 7.8,
  },
  {
    id: "tt12844910",
    title: "Pathaan",
    year: "2023",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNDdkNTY1MDQtY2I5MC00OTFlLTg5OWQtZWE2YzE5NWFiMDgzXkEyXkFqcGc@._V1_SX300.jpg",
    genre: "Action, Thriller",
    rating: 5.9,
  },
  {
    id: "tt1375666",
    title: "Inception",
    year: "2010",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    genre: "Action, Adventure, Sci-Fi",
    rating: 8.8,
  },
  {
    id: "tt26233598",
    title: "Raayan",
    year: "2024",
    poster:
      "https://m.media-amazon.com/images/M/MV5BYzdmNzBjMDgtMmJkNC00ZjU3LTgxZTctY2QyOTkxMTFhOTU5XkEyXkFqcGc@._V1_SX300.jpg",
    genre: "Action, Drama",
    rating: 6.5,
  },
];




const Home = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleExploreClick = () => {
    navigate("/movies");
  };

  const handleMovieClick = (id) => {
    navigate(`/moviedetail/${id}`);
  };

  const nextFeatured = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentFeaturedIndex((prev) =>
        prev === featuredMovies.length - 1 ? 0 : prev + 1
      );
      setIsTransitioning(false);
    }, 500);
  };

  const prevFeatured = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentFeaturedIndex((prev) =>
        prev === 0 ? featuredMovies.length - 1 : prev - 1
      );
      setIsTransitioning(false);
    }, 500);
  };

  // Auto-rotate featured movies every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextFeatured();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const currentMovie = featuredMovies[currentFeaturedIndex];

  return (
    <div
      className={`relative min-h-screen overflow-hidden ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* Hero Section with Featured Movies Carousel */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-10">
          <img
            src={currentMovie.backdrop}
            alt={currentMovie.title}
            className="w-full h-full object-cover object-fit"
            onLoad={() => setIsTransitioning(false)}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/1920x1080?text=Movie+Backdrop";
            }}
          />
          <div
            className={`absolute inset-0 ${
              isDarkMode
                ? "bg-gradient-to-r from-gray-900 via-gray-900/70 to-gray-900/20"
                : "bg-gradient-to-r from-white via-white/70 to-white/20"
            }`}
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevFeatured}
          className="absolute hover:cursor-pointer left-4 top-1/2 z-20 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={nextFeatured}
          className="absolute hover:cursor-pointer right-4 top-1/2 z-20 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
        >
          <FiChevronRight size={24} />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex gap-2">
          {featuredMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (index !== currentFeaturedIndex && !isTransitioning) {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentFeaturedIndex(index);
                    setIsTransitioning(false);
                  }, 500);
                }
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentFeaturedIndex
                  ? "bg-red-600 w-6"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div
          className={`relative h-full flex items-center z-10 px-6 sm:px-10 lg:px-20 transition-opacity duration-500 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="max-w-2xl">
            <div className="flex items-center mb-4">
              <span className="bg-red-600 text-white text-sm font-bold px-2 py-1 rounded mr-3">
                NEW RELEASE
              </span>
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {currentMovie.year} • {currentMovie.genre.split(",")[0]} •{" "}
                {currentMovie.runtime}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">
              {currentMovie.title}
            </h1>

            <p className="text-lg sm:text-xl italic mb-6">
              "{currentMovie.tagline}"
            </p>

            <p
              className={`text-lg mb-8 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {currentMovie.description}
            </p>

            <div className="flex items-center mb-8">
              <div className="flex items-center mr-6">
                <FaImdb className="text-yellow-400 text-3xl mr-2" />
                <span className="text-xl font-bold">
                  {currentMovie.rating}/10
                </span>
              </div>
              <span
                className={`text-lg ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Director: {currentMovie.director}
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => handleMovieClick(currentMovie.id)}
                className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:scale-105"
              >
                <FiPlay className="mr-2" size={20} />
                Watch Trailer
              </button>
              <button
                onClick={handleExploreClick}
                className={`flex items-center px-6 py-3 border-2 font-semibold rounded-full transition-all duration-300 ${
                  isDarkMode
                    ? "border-white text-white hover:bg-white/10"
                    : "border-gray-900 text-gray-900 hover:bg-gray-900/10"
                }`}
              >
                <FiSearch className="mr-2" size={20} />
                Explore Movies
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Movies Section */}
      <div className={`py-16 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl sm:text-4xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              } mb-4`}
            >
              <span className="text-red-500">Trending</span> Movies
            </h2>
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } max-w-2xl mx-auto`}
            >
              Discover what's popular right now
            </p>
          </div>

          {/* Movie Posters Grid - Modified for small screens */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
            {trendingMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => handleMovieClick(movie.id)}
                className="group relative overflow-hidden rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              >
                {/* Movie Poster with fallback */}
                <div className="aspect-[2/3] w-full overflow-hidden bg-gray-200">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x450?text=No+Poster";
                    }}
                  />
                </div>

                {/* Gradient Overlay - Always visible on mobile, shown on hover for larger screens */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent sm:opacity-0 group-hover:sm:opacity-100 transition-opacity duration-300" />

                {/* Movie Info - Always visible on mobile, shown on hover for larger screens */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 sm:translate-y-10 group-hover:sm:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-sm sm:text-lg">
                    {movie.title}
                  </h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-300 text-xs sm:text-sm">
                      {movie.year}
                    </span>
                    <span className="text-yellow-400 text-xs sm:text-sm flex items-center">
                      <FiStar className="mr-1" /> {movie.rating}
                    </span>
                  </div>
                  {/* Genre - Always visible on mobile */}
                  <div className="mt-1 sm:mt-2 flex flex-wrap gap-1">
                    {movie.genre
                      .split(", ")
                      .slice(0, 2)
                      .map((genre, i) => (
                        <span
                          key={i}
                          className="text-xs bg-red-600/80 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full"
                        >
                          {genre}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`py-16 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl sm:text-4xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              } mb-4`}
            >
              Why Choose <span className="text-red-500">MovieLand</span>?
            </h2>
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } max-w-2xl mx-auto`}
            >
              The ultimate destination for movie enthusiasts with powerful
              features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎬",
                title: "Extensive Collection",
                description:
                  "Access thousands of movies from all genres and eras, from classic cinema to the latest blockbusters.",
              },
              {
                icon: "🔍",
                title: "Smart Search",
                description:
                  "Find exactly what you're looking for with our advanced filters and personalized recommendations.",
              },
              {
                icon: "📱",
                title: "Watch Anywhere",
                description:
                  "Enjoy your favorite movies on any device, anytime, anywhere.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-8 rounded-xl shadow-lg hover:shadow-xl duration-300 hover:-translate-y-2 transform transition-transform ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3
                  className={`text-xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  } mb-3`}
                >
                  {feature.title}
                </h3>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        className={`py-20 ${
          isDarkMode
            ? "bg-gradient-to-r from-blue-900 to-purple-900"
            : "bg-gradient-to-r from-blue-600 to-purple-600"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Explore the World of Cinema?
          </h2>
          <p className="text-xl text-gray-200 mb-10">
            Join millions of movie lovers discovering their next favorite film.
          </p>
          <button
            onClick={handleExploreClick}
            className="px-10 py-4 hover:cursor-pointer bg-red-600 hover:bg-red-700 text-white font-bold rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Browse All Movies
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { CgSmileNoMouth } from "react-icons/cg";
import { BsArrowLeft, BsArrowRightCircleFill } from "react-icons/bs";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("https://www.omdbapi.com/", {
          params: {
            i: id,
            plot: "full",
            apikey: "5946fd15",
          },
        });

        if (data.Response === "False") {
          navigate("/");
          return;
        }

        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, navigate]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleIMDBClick = () => {
    if (movieDetails?.imdbID) {
      window.open(
        `https://www.imdb.com/title/${movieDetails.imdbID}`,
        "_blank"
      );
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <div className=" text-red-800 dark:text-red-200 p-4 rounded-lg max-w-md text-center">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            Oops! Something went wrong <CgSmileNoMouth className="text-4xl" />
          </h2>
          <p className="text-lg ">{error}...!</p>

          <button
            onClick={handleBackClick}
            className="mt-4 px-4 py-2 font-bold hover:cursor-pointer bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!movieDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No movie data available
          </p>
          <button
            onClick={handleBackClick}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Action Buttons */}
        <div className="flex justify-between mb-6">
          <button
            onClick={() => navigate("/movies")}
            className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors hover:cursor-pointer gap-2"
          >
            <BsArrowLeft />
            Back to Movies
          </button>

          <button
            onClick={handleIMDBClick}
            className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors hover:cursor-pointer gap-2"
          >
            View on IMDB
            <BsArrowRightCircleFill />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster Column */}
          <div className="w-full lg:w-1/3 flex flex-col items-center">
            <img
              src={
                movieDetails.Poster !== "N/A"
                  ? movieDetails.Poster
                  : "https://via.placeholder.com/300x450?text=No+Poster"
              }
              alt={movieDetails.Title}
              className="w-full max-w-xs rounded-xl shadow-lg mb-6 object-cover transition-transform hover:scale-105 hover:cursor-pointer"
            />

            <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-bold mb-2 text-center text-gray-800 dark:text-white">
                Ratings
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    IMDb:
                  </span>
                  <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded text-sm">
                    {movieDetails.imdbRating}/10
                  </span>
                </div>
                {movieDetails.Ratings?.map((rating, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {rating.Source}:
                    </span>
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                      {rating.Value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {movieDetails.Title} ({movieDetails.Year})
              </h1>

              <div className="flex flex-wrap gap-2 mb-4">
                {movieDetails.Genre?.split(", ").map((genre, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-medium px-2.5 py-0.5 rounded"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      Director:
                    </span>{" "}
                    {movieDetails.Director}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      Writer:
                    </span>{" "}
                    {movieDetails.Writer}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      Cast:
                    </span>{" "}
                    {movieDetails.Actors}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      Runtime:
                    </span>{" "}
                    {movieDetails.Runtime}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      Language:
                    </span>{" "}
                    {movieDetails.Language}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      Country:
                    </span>{" "}
                    {movieDetails.Country}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Plot
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {movieDetails.Plot}
                </p>
              </div>

              {movieDetails.Awards !== "N/A" && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    Awards
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    {movieDetails.Awards}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Released
                  </p>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {movieDetails.Released}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Box Office
                  </p>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {movieDetails.BoxOffice !== "N/A"
                      ? movieDetails.BoxOffice
                      : "-"}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Production
                  </p>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {movieDetails.Production !== "N/A"
                      ? movieDetails.Production
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

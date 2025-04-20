import React, { useState, useEffect } from "react";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { useTheme } from "../../Context/ThemeContext";
import { useMovie } from "../../Context/MovieContext";
import { NavLink } from "react-router-dom";

const AppHeader = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [input, setInput] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(
    window.innerWidth < 1024
  );
  const { setSearchTerm, filterByGenre, selectedGenre, getAvailableGenres } =
    useMovie();

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setShowMobileMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = () => {
    if (input.trim() !== "") {
      setSearchTerm(input.trim());
      setShowMobileMenu(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  //   ? "text-white font-medium border-b-2 border-red-500"
  //   : "text-gray-900 font-medium border-b-2 border-blue-600";

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="relative">
        <div className="bg-blue-100/50 dark:bg-gray-800/80 backdrop-blur-sm px-4 sm:px-6 py-3">
          <div className="w-full px-4 sm:px-6 mx-auto max-w-screen-xl">
            <div className="flex items-center justify-between gap-4">
              {/* Left side - Menu button and title */}
              <div className="flex items-center gap-4">
                {isMediumScreen && (
                  <button
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className="p-2 rounded-full bg-blue-100 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors duration-200"
                    aria-label="Toggle menu"
                  >
                    {showMobileMenu ? (
                      <FaTimes className="text-lg" />
                    ) : (
                      <FaBars className="text-lg" />
                    )}
                  </button>
                )}

                <h1 className="text-2xl sm:text-3xl font-bold">
                  <span className="bg-gradient-to-r from-red-600 via-blue-700 to-red-400 bg-clip-text text-transparent font-serif tracking-tight">
                    MovieLand
                  </span>
                </h1>
              </div>

              {/* Right side - Search, filter and theme toggle */}
              <div className="flex items-center gap-3 md:gap-4">
                {/* Search and filter - only visible on large screens */}
                {!isMediumScreen && (
                  <>
                    <div className="relative w-40 md:w-48">
                      <select
                        value={selectedGenre}
                        onChange={(e) => filterByGenre(e.target.value)}
                        className="block appearance-none w-full px-3 py-1.5 md:px-4 md:py-2 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                      >
                        {getAvailableGenres().map((genre) => (
                          <option key={genre} value={genre}>
                            {genre}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="relative w-40 sm:w-44 md:w-52">
                      <input
                        type="text"
                        placeholder="Search movies..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKey}
                        className="w-full py-1.5 md:py-2 pl-3 md:pl-4 pr-10 text-sm rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 transition-all duration-200"
                      />
                      <button
                        onClick={handleSearch}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                        aria-label="Search"
                      >
                        <BiSearch className="text-xl" />
                      </button>
                    </div>
                  </>
                )}

                {/* Theme toggle - always visible */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-blue-100 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors duration-200"
                  aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
                >
                  {isDarkMode ? (
                    <FaSun className="text-lg sm:text-xl text-yellow-400" />
                  ) : (
                    <FaMoon className="text-lg sm:text-xl" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu - shown on medium and small screens */}
            {isMediumScreen && showMobileMenu && (
              <div className="mt-4 pb-2 space-y-4">
                {/* Filter and Search for mobile menu */}
                <div className="flex flex-col gap-3 px-2">
                  <select
                    value={selectedGenre}
                    onChange={(e) => filterByGenre(e.target.value)}
                    className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  >
                    {getAvailableGenres().map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>

                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Search movies..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKey}
                      className="w-full py-2 pl-4 pr-10 text-sm rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 transition-all duration-200"
                    />
                    <button
                      onClick={handleSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                      aria-label="Search"
                    >
                      <BiSearch className="text-xl" />
                    </button>
                  </div>
                </div>

                {/* Navigation Links for mobile menu */}
                <nav className="flex flex-col space-y-2 px-2">
                  <NavLink
                    to="/"
                    onClick={() => setShowMobileMenu(false)}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg text-sm ${
                        isActive
                          ? isDarkMode
                            ? "bg-gray-700 text-white"
                            : "bg-blue-100 text-gray-900"
                          : isDarkMode
                          ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                          : "text-gray-600 hover:bg-blue-100 hover:text-gray-900"
                      }`
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/movies"
                    onClick={() => setShowMobileMenu(false)}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg text-sm ${
                        isActive
                          ? isDarkMode
                            ? "bg-gray-700 text-white"
                            : "bg-blue-100 text-gray-900"
                          : isDarkMode
                          ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                          : "text-gray-600 hover:bg-blue-100 hover:text-gray-900"
                      }`
                    }
                  >
                    Movies
                  </NavLink>
                </nav>
              </div>
            )}

            {/* Navigation Links for large screens */}
            {!isMediumScreen && (
              <div className="mt-4 space-x-6">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium ${
                      isActive
                        ? isDarkMode
                          ? "bg-gray-700 text-white"
                          : "bg-blue-100 text-gray-900"
                        : isDarkMode
                        ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                        : "text-gray-600 hover:bg-blue-100 hover:text-gray-900"
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/movies"
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium ${
                      isActive
                        ? isDarkMode
                          ? "bg-gray-700 text-white"
                          : "bg-blue-100 text-gray-900"
                        : isDarkMode
                        ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                        : "text-gray-600 hover:bg-blue-100 hover:text-gray-900"
                    }`
                  }
                >
                  Movies
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

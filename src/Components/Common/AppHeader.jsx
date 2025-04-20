import React, { useState } from "react";
import { FaMoon, FaSun, FaBars } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { useTheme } from "../../Context/ThemeContext";
import { useMovie } from "../../Context/MovieContext";
import { NavLink } from "react-router-dom";

const AppHeader = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [input, setInput] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { setSearchTerm, filterByGenre, selectedGenre, getAvailableGenres } =
    useMovie();

  const handleSearch = () => {
    if (input.trim() !== "") {
      setSearchTerm(input.trim());
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Active link style
  const activeLinkStyle = isDarkMode
    ? "text-white font-medium border-b-2 border-red-500"
    : "text-gray-900 font-medium border-b-2 border-blue-600";

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="relative">
        {/* Main header content */}
        <div className="bg-blue-100/50 dark:bg-gray-800/80 backdrop-blur-sm px-4 sm:px-6 py-3">
          <div className="container mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              {/* App Title and Mobile Menu Button */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-2 sm:gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  <span className="bg-gradient-to-r from-red-600 via-blue-700 to-red-400 bg-clip-text text-transparent font-serif tracking-tight">
                    MovieLand
                  </span>
                </h1>

                {/* Mobile Menu Button - Only on small screens */}
                <div className="flex items-center gap-2 sm:hidden">
                  <button
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className="p-2 rounded-full bg-blue-100 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors duration-200"
                    aria-label="Toggle menu"
                  >
                    <FaBars className="text-lg" />
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-blue-100 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors duration-200"
                    aria-label={`Switch to ${
                      isDarkMode ? "light" : "dark"
                    } mode`}
                  >
                    {isDarkMode ? (
                      <FaSun className="text-lg text-yellow-400" />
                    ) : (
                      <FaMoon className="text-lg" />
                    )}
                  </button>
                </div>
              </div>

              {/* Navigation Links - Visible on medium+ screens */}
              <div className="hidden sm:flex items-center gap-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-2 py-1 text-sm transition-colors duration-200 ${
                      isActive
                        ? activeLinkStyle
                        : isDarkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/movies"
                  className={({ isActive }) =>
                    `px-2 py-1 text-sm transition-colors duration-200 ${
                      isActive
                        ? activeLinkStyle
                        : isDarkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`
                  }
                >
                  Movies
                </NavLink>
              </div>

              {/* Search and Filter - Visible on all screens */}
              <div className="w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                  {/* For small screens: Search and Filter boxes */}
                  <div className="flex flex-row items-center gap-3 w-full sm:hidden">
                    {/* Filter Box - Classic style */}
                    <div className="relative flex-1 min-w-[120px]">
                      <select
                        value={selectedGenre}
                        onChange={(e) => filterByGenre(e.target.value)}
                        className="block appearance-none w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                      >
                        {getAvailableGenres().map((genre) => (
                          <option
                            key={genre}
                            value={genre}
                            className="text-sm bg-blue-100/50 backdrop-blur-sm text-gray-700 dark:text-gray-200 dark:bg-gray-800"
                          >
                            {genre}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Search Box */}
                    <div className="relative flex-1">
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          name="search"
                          placeholder="Search..."
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleKey}
                          className="w-full py-2 pl-4 pr-10 text-sm rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 transition-all duration-200"
                        />
                        <button
                          onClick={handleSearch}
                          className="absolute right-2 p-1 text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                          aria-label="Search"
                        >
                          <BiSearch className="text-xl" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* For medium+ screens: Filter and search */}
                  <div className="hidden sm:flex sm:flex-row items-center gap-3">
                    {/* Filter Dropdown */}
                    <div className="relative w-48">
                      <select
                        value={selectedGenre}
                        onChange={(e) => filterByGenre(e.target.value)}
                        className="block appearance-none w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                      >
                        {getAvailableGenres().map((genre) => (
                          <option
                            key={genre}
                            value={genre}
                            className="text-sm bg-blue-100/50 text-gray-700 dark:text-gray-200 dark:bg-gray-800"
                          >
                            {genre}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Search Box */}
                    <div className="w-64 md:w-72 lg:w-80">
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          name="search"
                          placeholder="Search movies..."
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleKey}
                          className="w-full py-2 pl-4 pr-10 text-sm sm:text-base rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 transition-all duration-200"
                        />
                        <button
                          onClick={handleSearch}
                          className="absolute right-2 p-1 text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                          aria-label="Search"
                        >
                          <BiSearch className="text-xl" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Theme Toggle - Hidden on small screens (shown in mobile menu) */}
              <button
                onClick={toggleTheme}
                className="hidden sm:flex flex-shrink-0 p-2 rounded-full bg-blue-100 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors duration-200"
                aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              >
                {isDarkMode ? (
                  <FaSun className="text-xl text-yellow-400" />
                ) : (
                  <FaMoon className="text-xl" />
                )}
              </button>
            </div>

            {/* Mobile Menu - Only shown on small screens when toggled */}
            {showMobileMenu && (
              <div className="sm:hidden mt-4 pb-2 space-y-3">
                {/* Mobile Navigation Links */}
                <div className="flex flex-col space-y-2">
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
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Gradient bottom border only */}
        <div className="h-1 bg-gradient-to-r from-red-600 via-blue-700 to-red-400 w-full"></div>
      </div>
    </header>
  );
};

export default AppHeader;

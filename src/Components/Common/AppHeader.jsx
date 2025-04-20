import React, { useState } from "react";
import { FaMoon, FaSun, FaBars, FaTimes, FaFilter } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { useTheme } from "../../Context/ThemeContext";
import { useMovie } from "../../Context/MovieContext";
import { NavLink } from "react-router-dom";

const AppHeader = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [input, setInput] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const { setSearchTerm, filterByGenre, selectedGenre, getAvailableGenres } =
    useMovie();

  const handleSearch = () => {
    if (input.trim() !== "") {
      setSearchTerm(input.trim());
      setShowMobileSearch(false);
      setShowMobileMenu(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const activeLinkStyle = isDarkMode
    ? "text-white font-medium border-b-2 border-red-500"
    : "text-gray-900 font-medium border-b-2 border-blue-600";

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="relative">
        <div className="bg-blue-100/50 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-3">
          <div className="max-w-[1440px] w-full mx-auto">
            {/* Main Header Content */}
            <div className="flex items-center justify-between">
              {/* Logo and Mobile Menu Button */}
              <div className="flex items-center gap-4 sm:gap-6">
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="md:hidden p-2 rounded-full bg-blue-100 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors duration-200"
                  aria-label="Toggle menu"
                >
                  {showMobileMenu ? (
                    <FaTimes className="text-lg" />
                  ) : (
                    <FaBars className="text-lg" />
                  )}
                </button>

                <h1 className="text-2xl font-bold whitespace-nowrap">
                  <span className="bg-gradient-to-r from-red-600 via-blue-700 to-red-400 bg-clip-text text-transparent font-serif tracking-tight">
                    MovieLand
                  </span>
                </h1>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-4">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `px-2 py-1 text-sm transition-colors duration-200 whitespace-nowrap ${
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
                      `px-2 py-1 text-sm transition-colors duration-200 whitespace-nowrap ${
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
                </nav>
              </div>

              {/* Desktop Search and Filter */}
              <div className="hidden md:flex items-center gap-2 flex-1 max-w-2xl mx-4">
                <div className="relative min-w-[120px]">
                  <select
                    value={selectedGenre}
                    onChange={(e) => filterByGenre(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  >
                    {getAvailableGenres().map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative flex-1 min-w-[150px]">
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    className="w-full py-1.5 pl-4 pr-10 text-sm rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 transition-all duration-200"
                  />
                  <button
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    aria-label="Search"
                  >
                    <BiSearch className="text-xl" />
                  </button>
                </div>
              </div>

              {/* Mobile Controls and Theme Toggle */}
              <div className="flex items-center gap-2">
                {/* Mobile Search and Filter Icons */}
                <div className="md:hidden flex items-center gap-2">
                  <button
                    onClick={() => {
                      setShowMobileFilter(!showMobileFilter);
                      setShowMobileSearch(false);
                    }}
                    className="p-2 rounded-full bg-blue-100 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors duration-200"
                    aria-label="Filter movies"
                  >
                    <FaFilter className="text-lg" />
                  </button>
                  <button
                    onClick={() => {
                      setShowMobileSearch(!showMobileSearch);
                      setShowMobileFilter(false);
                    }}
                    className="p-2 rounded-full bg-blue-100 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors duration-200"
                    aria-label="Search movies"
                  >
                    <BiSearch className="text-xl" />
                  </button>
                </div>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-blue-100 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors duration-200"
                  aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
                >
                  {isDarkMode ? (
                    <FaSun className="text-lg text-yellow-400" />
                  ) : (
                    <FaMoon className="text-lg" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Search Input - Only appears when search icon is clicked */}
            {showMobileSearch && (
              <div className="md:hidden mt-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    className="w-full py-2 pl-4 pr-10 text-sm rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 transition-all duration-200"
                    autoFocus
                  />
                  <button
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    aria-label="Search"
                  >
                    <BiSearch className="text-xl" />
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Filter Dropdown - Only appears when filter icon is clicked */}
            {showMobileFilter && (
              <div className="md:hidden mt-3">
                <div className="relative">
                  <select
                    value={selectedGenre}
                    onChange={(e) => {
                      filterByGenre(e.target.value);
                      setShowMobileFilter(false);
                    }}
                    className="block appearance-none w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  >
                    {getAvailableGenres().map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Mobile Menu */}
            {showMobileMenu && (
              <div className="md:hidden mt-3 space-y-3">
                {/* Navigation Links */}
                <div className="flex flex-col space-y-1">
                  <NavLink
                    to="/"
                    onClick={() => setShowMobileMenu(false)}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm ${
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
                      `px-3 py-2 rounded-md text-sm ${
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

        {/* Bottom Gradient Line */}
        <div className="h-1 bg-gradient-to-r from-red-600 via-blue-700 to-red-400 w-full"></div>
      </div>
    </header>
  );
};

export default AppHeader;

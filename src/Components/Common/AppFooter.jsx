import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaImdb } from "react-icons/fa";
import { useTheme } from "../../Context/ThemeContext";

const AppFooter = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <footer
      className={`py-8 ${
        isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* About - Full width on mobile */}
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-red-600 via-blue-700 to-red-400 bg-clip-text text-transparent font-serif tracking-tight">
              MovieLand
            </h3>
            <p className="text-sm mb-4">
              Your ultimate destination for discovering movies from around the
              world.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook">
                <FaFacebook className="h-5 w-5 hover:text-blue-500 transition" />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter className="h-5 w-5 hover:text-blue-400 transition" />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram className="h-5 w-5 hover:text-pink-500 transition" />
              </a>
              <a href="#" aria-label="IMDb">
                <FaImdb className="h-5 w-5 hover:text-yellow-400 transition" />
              </a>
            </div>
          </div>

          {/* Quick Links and Categories side by side on mobile */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigation("/")}
                  className="text-sm hover:underline cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/movies")}
                  className="text-sm hover:underline cursor-pointer"
                >
                  Movies
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/trending")}
                  className="text-sm hover:underline cursor-pointer"
                >
                  Trending
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/upcoming")}
                  className="text-sm hover:underline cursor-pointer"
                >
                  Upcoming
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="grid grid-cols-2 gap-2">
              {[
                "Action",
                "Comedy",
                "Drama",
                "Horror",
                "Sci-Fi",
                "Thriller",
              ].map((item, index) => (
                <li key={index}>
                  <button className="text-sm hover:underline cursor-pointer">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact - Full width on mobile */}
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>info@movieland.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Hollywood, CA</li>
            </ul>
          </div>
        </div>

        <div
          className={`border-t ${
            isDarkMode ? "border-gray-700" : "border-gray-300"
          } pt-6 text-center text-sm`}
        >
          <p>© {new Date().getFullYear()} MovieLand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;

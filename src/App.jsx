import React from "react";
import AppHeader from "./Components/Common/AppHeader";
import { ThemeProvider } from "./Context/ThemeContext";
import MovieProvider from "./Context/MovieContext";
import MovieList from "./Components/Movies/MovieList";
import MovieDetails from "./Components/Movies/MovieDetails";
import Home from "./Components/Home";

import { Routes, Route, Navigate } from "react-router-dom";
import AppFooter from "./Components/Common/AppFooter";

const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100 flex flex-col">
        <MovieProvider>
          <AppHeader />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<MovieList />} />
              <Route path="/moviedetail/:id" element={<MovieDetails />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <AppFooter />
        </MovieProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;

# 🎬 MovieLand - Movie Browsing Web App

**MovieLand** is a sleek, modern movie browsing application built with **React** and **Context API**. Users can explore trending movies, view detailed info, and switch between dark and light themes. Powered by a smooth UI and state management, it offers a fun and engaging movie discovery experience.

---

## 🚀 Features

- **Trending Movies**: Browse the most popular and trending movies.
- **Movie Details**: View descriptions, ratings, release dates, and more.
- **Theme Toggle**: Seamlessly switch between dark and light mode.
- **Loading Indicator**: Spinner during API fetch for better UX.
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop.
- **Context API**: Global state management for movies and theme.
- **Modular Components**: Clean and reusable component structure.

---

## 🛠️ Technologies Used

- **Frontend**: React, CSS (or Tailwind CSS if used)
- **Routing**: React Router DOM
- **State Management**: Context API, React Hooks (`useState`, `useEffect`, `useContext`)
- **Icons**: (optional) React Icons
- **API**: OMDB API (or your movie data)

---

## 📦 Install Dependencies


- npm install
- npm install axios
- npm install react-router-dom
- npm install react-icons # If icons are used.

---

## 📁 Folder Structure
movieapp/
├── src/
│   ├── Components/
│   │   ├── Common/
│   │   │   ├── AppHeader.jsx
│   │   │   └── AppFooter.jsx
│   │   ├── Movies/
│   │   │   ├── MovieList.jsx
│   │   │   └── MovieDetails.jsx
│   │   ├── Home.jsx
│   │   └── Loading.jsx
│   ├── Context/
│   │   ├── MovieContext.jsx
│   │   └── ThemeContext.jsx
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
└── README.md

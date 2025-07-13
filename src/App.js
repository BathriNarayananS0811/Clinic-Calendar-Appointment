import React, { useState } from "react";
import Login from "./components/Login";
import Calendar from "./components/Calendar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      {isLoggedIn ? (
        <Calendar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      ) : (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
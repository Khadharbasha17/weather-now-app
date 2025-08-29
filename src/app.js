import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");          // User input city
  const [weather, setWeather] = useState(null); // Weather data from API
  const [error, setError] = useState("");       // Error messages

  const API_KEY = "YOUR_API_KEY_HERE"; // 🔑 Replace with your OpenWeatherMap API key

  // Function to fetch weather details
  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("⚠️ Please enter a city name.");
      setWeather(null);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        setError("❌ City not found. Please try again.");
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch (err) {
      setError("⚠️ Unable to fetch weather data. Please try again later.");
      setWeather(null);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Segoe UI, sans-serif",
        textAlign: "center",
        marginTop: "50px",
        color: "#333",
      }}
    >
      <h1>🌦 Weather Now</h1>

      {/* Input field */}
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "200px",
        }}
      />

      {/* Button */}
      <button
        onClick={fetchWeather}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "none",
          background: "#007BFF",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Get Weather
      </button>

      {/* Error message */}
      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}

      {/* Weather data */}
      {weather && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            borderRadius: "10px",
            display: "inline-block",
            background: "#f4f4f9",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>🌡 Temperature: {weather.main.temp} °C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬 Wind Speed: {weather.wind.speed} m/s</p>
          <p>☁ Condition: {weather.weather[0].description}</p>
          <img
            alt="weather icon"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
        </div>
      )}
    </div>
  );
}

export default App;

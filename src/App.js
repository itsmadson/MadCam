import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeFormatter = new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
        timeStyle: "medium",
      });
      const dateFormatter = new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
        dateStyle: "short",
      });
      const dayFormatter = new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
        weekday: "long",
      });
      setCurrentTime(timeFormatter.format(now));
      setCurrentDate(dateFormatter.format(now));
      setCurrentDay(dayFormatter.format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    fetch("https://prayer.aviny.com/api/prayertimes/236")
      .then((response) => response.json())
      .then((data) => {
        const formatTimeWithoutSeconds = (timeString) => {
          const [hours, minutes] = timeString.split(":");
          return `${hours}:${minutes}`;
        };

        const formattedPrayerTimes = {
          Imsaak: formatTimeWithoutSeconds(data.Imsaak),
          Sunrise: formatTimeWithoutSeconds(data.Sunrise),
          Noon: formatTimeWithoutSeconds(data.Noon),
          Sunset: formatTimeWithoutSeconds(data.Sunset),
          Maghreb: formatTimeWithoutSeconds(data.Maghreb),
          Midnight: formatTimeWithoutSeconds(data.Midnight),
        };

        setPrayerTimes(formattedPrayerTimes);
      })
      .catch((error) => console.error("Error fetching prayer times:", error));

    fetch(
      "http://api.weatherapi.com/v1/forecast.json?key=dd0d6cd5cf2641969d4162625240608&q=Yazd&days=3&aqi=no&alerts=no"
    )
      .then((response) => response.json())
      .then((data) => {
        const weatherForecast = data.forecast.forecastday.map((day) => ({
          date: new Date(day.date).toLocaleDateString("fa-IR"),
          maxTemp: Math.round(day.day.maxtemp_c),
          minTemp: Math.round(day.day.mintemp_c),
          condition: day.day.condition.text,
          icon: day.day.condition.icon,
        }));
        setWeatherData(weatherForecast);
      })
      .catch((error) => console.error("Error fetching weather data:", error));

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app">
      <div className="glass-container">
        <h1 className="title">God's Eyes</h1>
        <div className="date-time">
          <div className="date">
            {currentDay} - {currentDate}
          </div>
          <div className="time">{currentTime}</div>
        </div>
        <div className="video-container">
          <img src="/video_feed" alt="وب‌کم استریم" />
        </div>
      </div>
      <div className="glass-container prayer-times">
        <h2 className="subtitle">اوقات شرعی یزد</h2>
        {prayerTimes ? (
          <div className="prayer-times-grid">
            <div>اذان صبح: {prayerTimes.Imsaak}</div>
            <div>طلوع آفتاب: {prayerTimes.Sunrise}</div>
            <div>اذان ظهر: {prayerTimes.Noon}</div>
            <div>غروب آفتاب: {prayerTimes.Sunset}</div>
            <div>اذان مغرب: {prayerTimes.Maghreb}</div>
            <div>نیمه شب شرعی: {prayerTimes.Midnight}</div>
          </div>
        ) : (
          <div>در حال بارگذاری...</div>
        )}
      </div>
      <div className="glass-container weather-forecast">
        <h2 className="subtitle">پیش‌بینی آب و هوای یزد</h2>
        {weatherData ? (
          <div className="weather-grid">
            {weatherData.map((day, index) => (
              <div key={index} className="weather-item">
                <div>{day.date}</div>
                <img src={day.icon} alt={day.condition} />
                <div>{day.condition}</div>
                <div>حداکثر: {day.maxTemp}°C</div>
                <div>حداقل: {day.minTemp}°C</div>
              </div>
            ))}
          </div>
        ) : (
          <div>در حال بارگذاری...</div>
        )}
      </div>
    </div>
  );
};

export default App;

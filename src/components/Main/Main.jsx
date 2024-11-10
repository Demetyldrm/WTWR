import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.jsx";
import "./Main.css";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  handleCardLike,
  isLiked,
  isLoggedIn,
}) {
  const { currentTemparatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemparatureUnit]}
          &deg; {currentTemparatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.warm;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleCardLike={handleCardLike}
                  isLiked={isLiked}
                  isLoggedIn={isLoggedIn}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;

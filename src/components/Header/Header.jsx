import "./Header.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import avatar from "../../assets/avatar.svg";

function Header({
  handleAddClick,
  weatherData,
  currentTemperatureUnit,
  handleToggleSwitchChange,
  handleRegisterModal,
  handleLoginModal,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  if (isLoggedIn === true) {
    return (
      <header className="header">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Logo" />
        </Link>

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
        <div className="header__actions">
          <ToggleSwitch
            currentTemperatureUnit={currentTemperatureUnit}
            handleToggleSwitchChange={handleToggleSwitchChange}
          />

          <button
            onClick={() => {
              handleAddClick;
            }}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>

          <div className="header__user-container">
            <Link to="/profile" className="header__link">
              <p className="header__username">{currentUser.name}</p>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="header__avatar"
              />
            </Link>
          </div>
        </div>
      </header>
    );
  } else {
    return (
      <header className="header">
        <Link to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </Link>
        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>
        <div className="header__actions">
          <ToggleSwitch />
        </div>
        <button onClick={handleRegisterModal} className="header__signup">
          Sign Up
        </button>
        <button onClick={handleLoginModal} className="header__login">
          Log In
        </button>
      </header>
    );
  }
}

export default Header;

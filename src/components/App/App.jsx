import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../App/App.css";
import { coordinates, APIkey } from "../../utils/constants.js";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Main from "../../components/Main/Main.jsx";
import Profile from "../../components/Profile/Profile.jsx";
import ItemModal from "../../components/ItemModal/ItemModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import AddItemModal from "../../components/AddItemModal/AddItemModal.jsx";
import { getItems, addItem, addCardLike, deleteItem } from "../../utils/api.js";
import DeleteModal from "../DeleteModal/DeleteModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { signUp, getUserProfile, handleEditProfile } from "../../utils/auth";
import * as auth from "../../utils/auth.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
    weather: "",
  });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleRegisterModal = () => {
    setActiveModal("signup");
  };
  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleCardLike = (_id, isLiked) => {
    const token = localStorage.getItem("jwt");
    return !isLiked
      ? addCardLike(_id, token).then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
          setIsLiked(true);
        })
      : removeCardLike(_id, token).then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
          setIsLiked(false);
        });
  };

  const handleCardDelete = () => {
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onEditProfileSubmit = ({ name, avatar }) => {
    handleEditProfile({ name, avatar }).then((res) => {
      setCurrentUser(res);
      closeActiveModal();
    });
  };

  const handleOnAddItem = async (newItem) => {
    const token = localStorage.getItem("jwt");
    const addedItem = await addItem(newItem, token);
    setClothingItems((prevItems) => [addedItem.data, ...prevItems]);
    closeActiveModal();
  };

  const handleToggleSwitchState = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleDeleteCardClick = () => {
    setActiveModal("delete-confirmation");
  };

  const onSignUp = ({ email, password, name, avatar }) => {
    const userProfile = { email, password, name, avatar };
    signUp(userProfile)
      .then((data) => {
        onLogIn({ email, password });
      })
      .catch((error) => {
        console.error("error at signing up", error);
      });
  };

  const onLogIn = ({ email, password }) => {
    console.log("login");
    auth.logIn({ email, password }).then((data) => {
      console.log("data", data);

      localStorage.setItem("jwt", data.token);
      getUserProfile(data.token).then((res) => {
        console.log(res);
        setCurrentUser(res);
        setIsLoggedIn(true);
      });
      closeActiveModal();
      navigate("/profile");
    });
  };

  const handleLogOutClick = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    closeActiveModal();
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    function handleCloseMethods(evt) {
      if (evt.key === "Escape" || evt.key === "esc") {
        closeActiveModal();
      }

      if (evt.type === "click" && evt.target.classList.contains("modal")) {
        closeActiveModal();
      }

      if (
        evt.type === "click" &&
        evt.target.classList.contains("modal__close")
      ) {
        closeActiveModal();
      }
    }

    if (activeModal !== "") {
      document.addEventListener("keydown", handleCloseMethods);
      document.addEventListener("click", handleCloseMethods);
    }

    return () => {
      document.removeEventListener("keydown", handleCloseMethods);
      document.removeEventListener("click", handleCloseMethods);
    };
  }, [activeModal]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserProfile().then((res) => {
        setCurrentUser(res.data);
        setIsLoggedIn(true);
      });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchState }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleRegisterModal={handleRegisterModal}
              handleLoginModal={handleLoginModal}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleCardLike={handleCardLike}
                    isLiked={isLiked}
                    isLoggedIn={isLoggedIn}
                  />
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      handleLogOutClick={handleLogOutClick}
                      handleEditProfileClick={handleEditProfileClick}
                      isLiked={isLiked}
                      handleCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
                      onLogIn={onLogIn}
                    />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>

            <Footer />
          </div>

          <AddItemModal
            buttonText="Add garment"
            title="New garment"
            isOpen={activeModal === "add-garment"}
            addItem={handleOnAddItem}
            onClose={closeActiveModal}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            confirmationModal={handleDeleteCardClick}
          />
          <DeleteModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            handleCardDelete={handleCardDelete}
            selectedCard={selectedCard}
          />
        </CurrentTemperatureUnitContext.Provider>
        <RegisterModal
          isOpen={activeModal === "signup"}
          onClose={closeActiveModal}
          onSignUp={onSignUp}
          openLoginModal={handleLoginModal}
          onRegister={onSignUp}
          isLoggedIn={onLogIn}
        />

        <LoginModal
          isOpen={activeModal === "login"}
          onClose={closeActiveModal}
          onLogIn={onLogIn}
          isSignUpOpen={onSignUp}
          openRegisterModal={handleRegisterModal}
        />

        <EditProfileModal
          isOpen={activeModal === "edit"}
          onClose={closeActiveModal}
          onProfileSubmit={onEditProfileSubmit}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

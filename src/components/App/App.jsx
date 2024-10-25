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
import { getItems, addItem, deleteItem } from "../../utils/api.js";
import DeleteModal from "../DeleteModal/DeleteModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { register, login, getUserProfile, editProfile } from "../../utils/auth";

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

  const handleSignupClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleRegisterRoute = () => {
    setActiveModal("register");
  };

  const handleLoginRoute = () => {
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit");
  };

  const handleAddClick = () => {
    setActiveModal("create");
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

  const onProfileSubmit = ({ name, avatar }) => {
    editProfile({ name, avatar }).then((res) => {
      setCurrentUser(res);
      closeActiveModal();
    });
  };

  const handleOnAddItem = (item) => {
    addItem(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };

  const handleToggleSwitchState = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleDeleteCardClick = () => {
    setActiveModal("delete-confirmation");
  };
  const handleRegister = ({ name, email, password, avatar }) => {
    const userProfile = { name, email, password, avatar };
    register(userProfile).then((res) => {
      console.log(res);
      setCurrentUser(userProfile);
      login({ email, password });
      setIsLoggedIn(true);
      closeActiveModal();
      navigate("/profile");
    });
  };

  const onLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    return signIn({ email, password }).then((res) => {
      console.log(res);
      localStorage.setItem("jwt", res.token);
      setIsLoggedIn(true);
      setCurrentUser(res.user);
      closeActiveModal();
      navigate("/profile");
    });
  };

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    closeActiveModal();
    navigate("/");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
        console.log(filterWeatherData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(() => {
        console.log("Error");
      });
  }, []);

  useEffect(() => {
    function handleCloseMethods(evt) {
      if (evt.key === "Escape" || evt.key === "esc" || evt.keyCode === 27) {
        closeActiveModal();
      }

      if (evt.type === "click" && evt.target.classList.contains("modal")) {
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
              handleSignupClick={handleSignupClick}
              handleLoginClick={handleLoginClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
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
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      onSignOut={onSignOut}
                      handleEditProfileClick={handleEditProfileClick}
                      isLiked={isLiked}
                      handleCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
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
            onClose={closeActiveModal}
            isOpen={activeModal === "create"}
            onAddItem={handleOnAddItem}
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
        <RegisterModal>
          isOpen={activeModal === "register"}
          onClose={closeActiveModal}
          handleRegister={handleRegister}
          handleLoginRoute={handleLoginRoute}
        </RegisterModal>

        <LoginModal
          isOpen={activeModal === "login"}
          onClose={closeActiveModal}
          onLogin={onLogin}
          handleRegisterRoute={handleRegisterRoute}
        />

        <EditProfileModal
          isOpen={activeModal === "edit"}
          onClose={closeActiveModal}
          onProfileSubmit={onProfileSubmit}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

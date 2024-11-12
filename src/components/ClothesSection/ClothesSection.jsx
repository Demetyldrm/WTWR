import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  handleCardClick,
  handleAddClick,
  clothingItems,
  isLiked,
  handleCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__items-title">Your Items</p>
        <button
          className="clothes-section__add-button"
          onClick={handleAddClick}
        >
          {" "}
          + Add New
        </button>
      </div>
      <ul className="cards__list">
        {clothingItems &&
          clothingItems
            .filter((item) => item.owner === currentUser._id)
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  handleCardClick={handleCardClick}
                  isLiked={isLiked}
                  handleCardLike={handleCardLike}
                  isLoggedIn={isLoggedIn}
                />
              );
            })}
      </ul>
    </div>
  );
}

export default ClothesSection;

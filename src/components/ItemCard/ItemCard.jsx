import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useState, useContext } from "react";

function ItemCard({ item, handleCardClick, handleCardLike, isLoggedIn }) {
  const [isLiked, setIsLiked] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const beenLiked = item.likes.some((id) => id === currentUser._id);
  const handleLike = () => {
    handleCardLike(item._id, isLiked).then(() => {
      setIsLiked(!isLiked);
    });
  };
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      {isLoggedIn && (
        <button
          onClick={handleLike}
          className={`card__like-btn ${isLiked && "card__like-btn_liked"} ${
            beenLiked && "card__like-btn_liked"
          }`}
        ></button>
      )}
      <img
        onClick={() => handleCardClick(item)}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;

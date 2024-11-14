import { useState, useContext } from "react";
import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import likeImage from "../../assets/like.png";
import likedImage from "../../assets/liked.png";

function ItemCard({ item, onCardClick, handleCardLike }) {
  const { name, imageUrl, likes } = item || {};
  const currentUser = useContext(CurrentUserContext);

  const isLiked =
    Array.isArray(item.likes) &&
    item.likes.some((id) => id === currentUser?._id);
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (event) => {
    event.stopPropagation();
    if (currentUser) {
      console.log("like button clicked");

      handleCardLike({ id: item._id, isLiked });
      console.log(isLiked);
    }
  };

  const itemLikeButtonClassName = isLiked ? "like-button liked" : "like-button";

  return (
    <li className="card" onClick={handleCardClick}>
      <div className="card__header">
        <h2 className="card__name">{name}</h2>
        {currentUser && (
          <button
            onClick={handleLike}
            className={itemLikeButtonClassName}
          ></button>
        )}
        <img
          className="like-button__icon"
          src={isLiked ? likedImage : likeImage}
          alt={isLiked ? "Unlike" : "Like"}
        />
      </div>
      <img className="card__image" src={imageUrl} alt={name} />
    </li>
  );
}

export default ItemCard;

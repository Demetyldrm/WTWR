import { useContext, useState, useEffect } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import likeImage from "../../assets/like.png";
import likedImage from "../../assets/liked.png";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked =
    Array.isArray(item.likes) &&
    item.likes.some((id) => id === currentUser?._id);

  const itemLikeButtonClassName = isLiked ? "like-button liked" : "like-button";

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked: isLiked });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {currentUser._id && (
          <img
            className={itemLikeButtonClassName}
            typeof="button"
            src={isLiked ? likedImage : likeImage}
            alt="Like Button"
            onClick={handleLike}
          />
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;

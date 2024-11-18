import { useContext, useState, useEffect } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import likeImage from "../../assets/like.png";
import likedImage from "../../assets/liked.png";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(false);
  // const isLiked =
  //   currentUser &&
  //   Array.isArray(item.likes) &&
  //   item.likes.some((id) => id === currentUser._id);

  useEffect(() => {
    const isLiked = item.likes.some((id) => id === currentUser._id);

    {
      isLiked ? setIsLiked(true) : setIsLiked(false);
    }
  }, [item.likes, currentUser._id]);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleCardLike = () => {
    setIsLiked(!isLiked);
    onCardLike(item, isLiked);
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {currentUser._id && (
          <img
            className={"like-button__icon"}
            typeof="button"
            src={isLiked ? likedImage : likeImage}
            alt="Like Button"
            onClick={handleCardLike}
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

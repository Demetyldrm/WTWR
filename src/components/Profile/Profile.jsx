import "./Profile.css";
import SideBar from "../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";

function Profile({
  handleAddClick,
  handleCardClick,
  clothingItems,
  handleEditProfileClick,
  isLiked,
  handleCardLike,
  isLoggedIn,
  onSignOut,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          onSignOut={onSignOut}
          onEditProfileData={handleEditProfileClick}
          handleEditProfileClick={handleEditProfileClick}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          handleCardClick={handleCardClick}
          isLiked={isLiked}
          handleCardLike={handleCardLike}
          isLoggedIn={isLoggedIn}
        />
      </section>
    </div>
  );
}
export default Profile;

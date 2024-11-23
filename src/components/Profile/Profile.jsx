import React, { useState, useContext, useEffect } from "react";

import "./Profile.css";
import SideBar from "../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";

function Profile({
  handleAddClick,
  clothingItems,
  handleEditProfileClick,
  handleCardLike,
  isLoggedIn,
  handleLogOutClick,
  onCardClick,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleLogOutClick={handleLogOutClick}
          onEditProfileData={handleEditProfileClick}
          handleEditProfileClick={handleEditProfileClick}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          onCardClick={onCardClick}
          handleCardLike={handleCardLike}
          isLoggedIn={isLoggedIn}
          // onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}
export default Profile;

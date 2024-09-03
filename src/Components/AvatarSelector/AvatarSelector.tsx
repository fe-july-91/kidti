import React, { useState } from 'react';
import { avatars } from '../../Utils/kit';
import './AvatarSelector.scss'

type Props = {
  avatar?: string;
}

export const AvatarSelector:React.FC<Props>= ({avatar}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(avatar);
  
  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev: boolean) => !prev);
  };

  return (
    <div className="avatar-selector">
      <label className="avatar-selector__label">Виберіть аватар</label>
      <div
        className="avatar-selector__selected"
        onClick={toggleDropdown}
      >
        {selectedAvatar ? (
          <img src={selectedAvatar} alt="Selected Avatar" />
        ) : (
          <div className="avatar-selector__placeholder">+</div>
        )}
      </div>
      {showDropdown && (
        <div className="avatar-selector__dropdown">
          {avatars.map((avatar, index) => (
            <div
              key={index}
              className="avatar-selector__dropdown--item"
              onClick={() => handleAvatarSelect(avatar)}
            >
              <img
                src={avatar}
                alt={`Avatar ${index + 1}`}
                className="avatar-selector__dropdown--image"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
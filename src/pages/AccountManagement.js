import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AccountManagement = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [profilePicture, setProfilePicture] = useState('');
  const [coverPhoto, setCoverPhoto] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser);
      setProfilePicture(currentUser.profilePicture || "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/avatar.png");
      setCoverPhoto(currentUser.coverPhoto || "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/cookies.jpg");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const updateUserInStorage = (updatedUser) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user => user.email === updatedUser.email ? updatedUser : user);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser)); // Update currentUser in storage
  };

  const handleSave = () => {
    const updatedUser = { ...user, profilePicture, coverPhoto };
    setUser(updatedUser);
    updateUserInStorage(updatedUser); // Persist changes to `localStorage`
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newProfilePicture = reader.result;
        setProfilePicture(newProfilePicture);
        setUser((prev) => ({ ...prev, profilePicture: newProfilePicture }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newCoverPhoto = reader.result;
        setCoverPhoto(newCoverPhoto);
        setUser((prev) => ({ ...prev, coverPhoto: newCoverPhoto }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="w-80 h-auto bg-white rounded-lg shadow-lg overflow-hidden relative">
        
        {/* Edit Button */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          title="Edit Profile"
        >
          ✏️
        </button>

        {/* Cover photo section */}
        {coverPhoto ? (
          <img src={coverPhoto} alt="cover" className="w-full h-40 object-cover" />
        ) : (
          <div className="w-full h-40 bg-gray-300"></div>
        )}

        <div className="text-center p-4">
          {/* Profile picture */}
          <img src={profilePicture} alt="avatar" className="w-20 h-20 rounded-full mx-auto -mt-12 border-4 border-white" />
          
          {/* User Information */}
          <div className="mt-4">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none"
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={user.position}
                  onChange={(e) => setUser({ ...user, position: e.target.value })}
                  className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none"
                  placeholder="Position"
                />
                <textarea
                  value={user.bio}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none"
                  placeholder="Bio"
                ></textarea>
              </>
            ) : (
              <>
                <div className="text-xl font-semibold text-gray-800">{user.name}</div>
                <div className="text-sm text-gray-500 mb-4">{user.position}</div>
                <p className="text-gray-600 text-sm mb-4">{user.bio}</p>
              </>
            )}

            {/* Profile and cover photo input fields, only visible in edit mode */}
            {isEditing && (
              <>
                <div className="mt-2">
                  <label className="block mb-2 text-gray-500">Change Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="w-full text-gray-700 px-4 py-2 bg-gray-200 rounded focus:outline-none"
                  />
                </div>
                <div className="mt-2">
                  <label className="block mb-2 text-gray-500">Change Cover Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverPhotoChange}
                    className="w-full text-gray-700 px-4 py-2 bg-gray-200 rounded focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
                >
                  Save Changes
                </button>
              </>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full py-3 mt-4 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;

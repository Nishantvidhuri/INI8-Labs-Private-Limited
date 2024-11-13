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
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const handleSave = () => {
    const updatedUser = { ...user, profilePicture, coverPhoto };
    setUser(updatedUser);
    updateUserInStorage(updatedUser);
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
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${isEditing ? 'w-full max-w-4xl flex flex-col md:flex-row' : 'w-80'}`}>
        
        <div className={`relative ${isEditing ? 'flex flex-col items-center md:w-1/3 bg-gray-200 p-4' : ''}`}>
          <div className={`${isEditing ? 'w-full h-32 bg-gray-300 rounded-lg overflow-hidden mb-4' : 'w-full h-40'}`}>
            {coverPhoto ? (
              <img src={coverPhoto} alt="cover" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-300"></div>
            )}
          </div>

          <div className={`${isEditing ? 'w-24 h-24 -mt-12 mb-4' : '-mt-12'} w-20 h-20 bg-gray-400 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto`}>
            <img src={profilePicture} alt="avatar" className="w-full h-full object-cover" />
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`${isEditing ? 'absolute bottom-4 right-4' : 'absolute top-2 right-2'} w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-lg`}
            title="Edit Profile"
          >
            <span className="material-icons">edit</span>
          </button>
        </div>

        <div className={`${isEditing ? 'p-6 md:w-2/3' : 'text-center p-4'}`}>
          {isEditing ? (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Name"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={user.position}
                  onChange={(e) => setUser({ ...user, position: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Position"
                />
              </div>
              <div className="mb-4">
                <input
                  type="date"
                  value={user.dob || ''}
                  onChange={(e) => setUser({ ...user, dob: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Date of Birth"
                />
              </div>
              <div className="mb-4">
                <textarea
                  value={user.bio}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Bio"
                  rows="3"
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-gray-500 mb-2">Change Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="w-full p-2 bg-gray-100 rounded focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-500 mb-2">Change Cover Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverPhotoChange}
                  className="w-full p-2 bg-gray-100 rounded focus:outline-none"
                />
              </div>

              <button
                onClick={handleSave}
                className="w-full py-3 mt-4 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-200"
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <div className="text-xl font-semibold text-gray-800">{user.name}</div>
              <div className="text-sm text-gray-500 mb-4">{user.position}</div>
              <p className="text-gray-600 text-sm mb-4">{user.bio}</p>
              <p className="text-gray-500 text-sm">
                Date of Birth: {user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A'}
              </p>
            </>
          )}

          <button
            onClick={handleLogout}
            className="w-full py-3 mt-4 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;

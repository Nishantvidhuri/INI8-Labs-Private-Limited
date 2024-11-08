import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = ({ setIsAuthenticated, setIsAdmin }) => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPosition, setEditPosition] = useState('');
  const [editBio, setEditBio] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate('/login');
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditPosition(user.position);
    setEditBio(user.bio);
  };

  const handleSaveUser = () => {
    const updatedUsers = users.map((user) =>
      user.email === editingUser.email ? { ...user, name: editName, position: editPosition, bio: editBio } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setEditingUser(null);
    alert('User updated successfully');
  };

  const handleDeleteUser = (email) => {
    const updatedUsers = users.filter((user) => user.email !== email);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert('User deleted successfully');
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-900 min-h-screen w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 w-full">
        <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400 mb-4 sm:mb-0">User Management</h2>
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-200 w-full sm:w-auto"
        >
          Logout
        </button>
      </div>

      {editingUser ? (
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md mb-6 w-full">
          <h3 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-4">Edit User</h3>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Name"
            className="w-full p-3 mb-4 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:outline-none focus:border-yellow-400"
          />
          <input
            type="text"
            value={editPosition}
            onChange={(e) => setEditPosition(e.target.value)}
            placeholder="Position"
            className="w-full p-3 mb-4 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:outline-none focus:border-yellow-400"
          />
          <textarea
            value={editBio}
            onChange={(e) => setEditBio(e.target.value)}
            placeholder="Bio"
            className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:outline-none focus:border-yellow-400"
          ></textarea>
          <button
            onClick={handleSaveUser}
            className="w-full py-3 mt-4 bg-green-500 text-gray-900 font-semibold rounded hover:bg-green-600 transition duration-200"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="w-full bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <thead>
              <tr className="text-yellow-400 text-left">
                <th className="p-4 text-sm md:text-base">Name</th>
                <th className="p-4 text-sm md:text-base">Email</th>
                <th className="p-4 text-sm md:text-base">Position</th>
                <th className="p-4 text-sm md:text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email} className="text-gray-200 border-t border-gray-700">
                  <td className="p-4 text-sm md:text-base">{user.name}</td>
                  <td className="p-4 text-sm md:text-base">{user.email}</td>
                  <td className="p-4 text-sm md:text-base">{user.position}</td>
                  <td className="p-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 w-full sm:w-auto"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.email)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 w-full sm:w-auto"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPage;

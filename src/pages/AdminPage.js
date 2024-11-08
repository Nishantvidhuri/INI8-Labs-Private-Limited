import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const demoUsers = [
  { name: "Alice Johnson", email: "alice@example.com", password: "alice123", position: "Software Engineer", bio: "Loves coding.", profilePicture: "https://randomuser.me/api/portraits/women/1.jpg", coverPhoto: "https://picsum.photos/800/200?random=1" },
  { name: "Bob Smith", email: "bob@example.com", password: "bob123", position: "Product Manager", bio: "Building products.", profilePicture: "https://randomuser.me/api/portraits/men/2.jpg", coverPhoto: "https://picsum.photos/800/200?random=2" },
  { name: "Cathy Brown", email: "cathy@example.com", password: "cathy123", position: "UX Designer", bio: "User-friendly designs.", profilePicture: "https://randomuser.me/api/portraits/women/3.jpg", coverPhoto: "https://picsum.photos/800/200?random=3" },
  { name: "David Lee", email: "david@example.com", password: "david123", position: "Data Scientist", bio: "Loves data.", profilePicture: "https://randomuser.me/api/portraits/men/4.jpg", coverPhoto: "https://picsum.photos/800/200?random=4" },
  { name: "Eva Green", email: "eva@example.com", password: "eva123", position: "Backend Developer", bio: "Server-side apps.", profilePicture: "https://randomuser.me/api/portraits/women/5.jpg", coverPhoto: "https://picsum.photos/800/200?random=5" },
  { name: "Frank Wright", email: "frank@example.com", password: "frank123", position: "DevOps Engineer", bio: "CI/CD expert.", profilePicture: "https://randomuser.me/api/portraits/men/6.jpg", coverPhoto: "https://picsum.photos/800/200?random=6" },
  { name: "Grace Hill", email: "grace@example.com", password: "grace123", position: "Frontend Developer", bio: "Responsive UIs.", profilePicture: "https://randomuser.me/api/portraits/women/7.jpg", coverPhoto: "https://picsum.photos/800/200?random=7" },
  { name: "Henry Adams", email: "henry@example.com", password: "henry123", position: "QA Engineer", bio: "Software quality.", profilePicture: "https://randomuser.me/api/portraits/men/8.jpg", coverPhoto: "https://picsum.photos/800/200?random=8" },
  { name: "Ivy Martinez", email: "ivy@example.com", password: "ivy123", position: "Content Writer", bio: "Engaging content.", profilePicture: "https://randomuser.me/api/portraits/women/9.jpg", coverPhoto: "https://picsum.photos/800/200?random=9" },
  { name: "Jack Wilson", email: "jack@example.com", password: "jack123", position: "Mobile Developer", bio: "iOS/Android apps.", profilePicture: "https://randomuser.me/api/portraits/men/10.jpg", coverPhoto: "https://picsum.photos/800/200?random=10" }
];

const AdminPage = ({ setIsAuthenticated }) => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPosition, setEditPosition] = useState('');
  const [editBio, setEditBio] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load all users from sessionStorage when the component loads
    const storedUsers = JSON.parse(sessionStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('isAdmin');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditPosition(user.position);
    setEditBio(user.bio);
  };

  const handleSaveUser = () => {
    if (!editName || !editPosition || !editBio) {
      alert('Please fill in all fields.');
      return;
    }

    const updatedUsers = users.map((user) =>
      user.email === editingUser.email ? { ...user, name: editName, position: editPosition, bio: editBio } : user
    );
    setUsers(updatedUsers);
    sessionStorage.setItem('users', JSON.stringify(updatedUsers));
    setEditingUser(null);
    alert('User updated successfully');
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditName('');
    setEditPosition('');
    setEditBio('');
  };

  const handleDeleteUser = (email) => {
    const updatedUsers = users.filter((user) => user.email !== email);
    setUsers(updatedUsers);
    sessionStorage.setItem('users', JSON.stringify(updatedUsers));
    alert('User deleted successfully');
  };

  const handleResetUsers = () => {
    sessionStorage.setItem('users', JSON.stringify(demoUsers));
    setUsers(demoUsers);
    alert('Demo users have been reset successfully.');
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-yellow-400">User Management</h2>
        <div className="space-x-4">
          <button
            onClick={handleResetUsers}
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
          >
            Reset Demo Users
          </button>
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {editingUser ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">Edit User</h3>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Name"
            className="w-full p-3 mb-4 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:outline-none focus:border-yellow-400"
            required
          />
          <input
            type="text"
            value={editPosition}
            onChange={(e) => setEditPosition(e.target.value)}
            placeholder="Position"
            className="w-full p-3 mb-4 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:outline-none focus:border-yellow-400"
            required
          />
          <textarea
            value={editBio}
            onChange={(e) => setEditBio(e.target.value)}
            placeholder="Bio"
            className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:outline-none focus:border-yellow-400"
            required
          ></textarea>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleSaveUser}
              className="w-full py-3 bg-green-500 text-gray-900 font-semibold rounded hover:bg-green-600 transition duration-200"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancelEdit}
              className="w-full py-3 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <table className="w-full bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="text-yellow-400 text-left">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Position</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email} className="text-gray-200 border-t border-gray-700">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.position}</td>
                <td className="p-4 space-x-4">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.email)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;

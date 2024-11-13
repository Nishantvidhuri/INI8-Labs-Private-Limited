import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [position, setPosition] = useState('');
  const [bio, setBio] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const getRandomProfilePicture = () => {
    const gender = Math.random() > 0.5 ? 'men' : 'women';
    const id = Math.floor(Math.random() * 100);
    return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
  };

  const getRandomCoverPhoto = () => {
    return `https://picsum.photos/800/200?random=${Math.floor(Math.random() * 1000)}`;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === email)) {
      alert('An account with this email already exists.');
      return;
    }

    const newUser = {
      name,
      email,
      password,
      position,
      bio,
      dateOfBirth,
      profilePicture: getRandomProfilePicture(),
      coverPhoto: getRandomCoverPhoto(),
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! Please log in.');
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form className="bg-gray-800 p-8 rounded-lg shadow-md w-96 space-y-6" onSubmit={handleRegister}>
        <h2 className="text-2xl font-semibold text-center text-yellow-400">Register</h2>
        
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:outline-none focus:border-yellow-400"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:outline-none focus:border-yellow-400"
          required
        />
        
        {/* Date of Birth Field */}
        <input
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:outline-none focus:border-yellow-400"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:outline-none focus:border-yellow-400"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 px-3 text-gray-400"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:outline-none focus:border-yellow-400"
            required
          />
        </div>

        <input
          type="text"
          placeholder="Position (e.g., Creative Manager)"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:outline-none focus:border-yellow-400"
        />
        <textarea
          placeholder="Short Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded focus:outline-none focus:border-yellow-400"
        ></textarea>

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-gray-900 font-semibold rounded hover:bg-green-600 transition duration-200"
        >
          Register
        </button>

        <p className="text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

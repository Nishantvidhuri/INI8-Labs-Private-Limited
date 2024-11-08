import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setIsAuthenticated, setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const demoAccount = {
    email: "alice@example.com",
    password: "alice123"
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const adminEmail = 'nishantvidhuri0987@gmail.com';
    const adminPassword = 'admin123';

    if (email === adminEmail && password === adminPassword) {
      setIsAuthenticated(true);
      setIsAdmin(true);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('isAdmin', 'true');
      setLoading(false);
      navigate('/admin');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find(user => user.email === email && user.password === password);

    if (currentUser) {
      setIsAuthenticated(true);
      setIsAdmin(false);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('isAdmin', 'false');
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      setLoading(false);
      navigate('/account');
    } else {
      setErrorMessage('Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 sm:p-6 relative">
      {/* Login Form */}
      <form
        className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-semibold text-center text-yellow-400">Login</h2>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4">
            {errorMessage}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <button
          type="submit"
          className="w-full py-3 bg-yellow-400 text-gray-900 font-semibold rounded hover:bg-yellow-500 transition duration-200 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Login"
          )}
        </button>

        <p className="text-center text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-yellow-400 hover:underline">
            Register New Account
          </Link>
        </p>
      </form>

      {/* Quick Access Box: below form on small/medium screens, top-right on large screens */}
      <div className="bg-gray-800 text-gray-200 p-4 rounded-lg shadow-lg max-w-xs mt-4 sm:mt-6 md:mt-8 lg:absolute lg:top-10 lg:right-10 lg:mt-0">
        <h3 className="text-yellow-400 text-lg font-semibold mb-2">Quick Access</h3>
        <p className="mb-2">Use the following credentials:</p>
        <div className="mb-4">
          <p className="font-semibold">Admin Account:</p>
          <p>Email: <span className="text-yellow-300">nishantvidhuri0987@gmail.com</span></p>
          <p>Password: <span className="text-yellow-300">admin123</span></p>
          <p className="text-sm text-gray-400 mt-1">Admin can edit or delete user accounts.</p>
        </div>
        <div>
          <p className="font-semibold">Demo Account:</p>
          <p>Email: <span className="text-yellow-300">{demoAccount.email}</span></p>
          <p>Password: <span className="text-yellow-300">{demoAccount.password}</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

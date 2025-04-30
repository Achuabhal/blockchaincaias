import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  // State variables for form inputs and error messages
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handle form submission using a GET request
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!username || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      // Sending data as query parameters
      const response = await axios.post('http://localhost:5000/signup', {
        params: { username, email, password },
      });

      // Navigate to dashboard on successful signup
      if (response.status === 200) {
        navigate('/hi');
      }
    } catch (err) {
      // Check if error response exists and set error message accordingly
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Sign-up failed');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {/* Display error message if it exists */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {/* Link to the login page */}
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Signup;

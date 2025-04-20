import React, { useRef } from 'react';
import axios from 'axios';

const OrganizerLogin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post('http://localhost:9999/api/v1/organizer/login', {
        email,
        password,
      });

      // If successful, you can store the token or redirect
      alert('Login successful!');
      console.log(response.data);

      localStorage.setItem('token', response.data.token);
      // Example: navigate('/organizer/dashboard');
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || 'Login failed';
      alert(message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Organizer Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            ref={emailRef}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            ref={passwordRef}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default OrganizerLogin;

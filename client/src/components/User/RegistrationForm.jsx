import React, { useRef } from 'react';
import axios from 'axios';

const RegisterationForm = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleRegister = async (e) => {
    e.preventDefault();

    const newUser = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      mobile: mobileRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };

    try {
      const res = await axios.post('http://localhost:9999/api/v1/user/register', newUser);
      alert('Registration successful!');
      console.log(res.data);

      // Optionally reset form
      nameRef.current.value = '';
      emailRef.current.value = '';
      mobileRef.current.value = '';
      passwordRef.current.value = '';
      confirmPasswordRef.current.value = '';

    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || 'Registration failed';
      alert(message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">User Registration</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            ref={nameRef}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            ref={emailRef}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Mobile</label>
          <input
            type="tel"
            ref={mobileRef}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            ref={passwordRef}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            ref={confirmPasswordRef}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterationForm;

import React, { useRef, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL
console.log(API_URL);
console.log("API URL:", process.env.REACT_APP_API_BASE_URL);

const OrganizerRegisterForm = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const organizationNameRef = useRef();
  const contactNumberRef = useRef();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const organizerData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
      organizationName: organizationNameRef.current.value,
      contactNumber: contactNumberRef.current.value,
    };

    try {
      const res = await axios.post('http://localhost:9999/api/v1/organizer/register', organizerData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
        console.log('data', organizerData);
        
      setSuccessMsg('Organizer registered successfully!');
      e.target.reset(); // Clear form
    } catch (error) {
      const errMessage =
        error.response?.data?.message || 'Registration failed. Try again.';
      setErrorMsg(errMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Organizer Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Full Name" ref={nameRef} required className="w-full p-2 border rounded" />
        <input type="email" placeholder="Email" ref={emailRef} required className="w-full p-2 border rounded" />
        <input type="password" placeholder="Password" ref={passwordRef} required className="w-full p-2 border rounded" />
        <input type="confirmPassword" placeholder="Confirm Password" ref={confirmPasswordRef} required className="w-full p-2 border rounded" />
        <input type="text" placeholder="Organization Name" ref={organizationNameRef} className="w-full p-2 border rounded" />
        <input type="text" placeholder="Contact Number" ref={contactNumberRef} className="w-full p-2 border rounded" />

        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        {successMsg && <p className="text-green-600">{successMsg}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default OrganizerRegisterForm;

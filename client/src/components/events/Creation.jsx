import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const Creation = () => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const locationRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const categoryRef = useRef();
  const imageRef = useRef();
  const capacityRef = useRef();

  const [organizerId, setOrganizerId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);

        console.log('decoded', decoded);
        
        setOrganizerId(decoded.id);
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!organizerId) {
      alert("Organizer not identified. Please login again.");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", titleRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("location", locationRef.current.value);
    formData.append("date", dateRef.current.value);
    formData.append("time", timeRef.current.value);
    formData.append("category", categoryRef.current.value);
    formData.append("capacity", capacityRef.current.value || 100);
    formData.append("organizer", organizerId);
    formData.append("image", imageRef.current.files[0]); // important!
  
    try {
      const res = await axios.post('http://localhost:9999/api/v1/events/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      alert('Event created successfully!');
      console.log('res', res.data);
  
      // Reset form
      titleRef.current.value = '';
      descriptionRef.current.value = '';
      locationRef.current.value = '';
      dateRef.current.value = '';
      timeRef.current.value = '';
      categoryRef.current.value = 'Other';
      imageRef.current.value = '';
      capacityRef.current.value = '';
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || 'Event creation failed';
      alert(message);
    }
  };
  

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input ref={titleRef} type="text" placeholder="Title" required className="w-full border px-4 py-2 rounded" />
        <textarea ref={descriptionRef} placeholder="Description" required className="w-full border px-4 py-2 rounded" />
        <input ref={locationRef} type="text" placeholder="Location" required className="w-full border px-4 py-2 rounded" />
        <input ref={dateRef} type="date" required className="w-full border px-4 py-2 rounded" />
        <input ref={timeRef} type="time" required className="w-full border px-4 py-2 rounded" />
        <select ref={categoryRef} defaultValue="Other" required className="w-full border px-4 py-2 rounded">
          <option value="Music">Music</option>
          <option value="Tech">Tech</option>
          <option value="Sports">Sports</option>
          <option value="Art">Art</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>
        <input type="file" ref={imageRef} accept="image/*" required />
        <input ref={capacityRef} type="number" placeholder="Capacity (default 100)" className="w-full border px-4 py-2 rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default Creation;

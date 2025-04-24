import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { styled } from '@mui/system';
import StyledButton from '../StyledComponents/StyledButton';
import BannerImg from '../../assets/images/homebanner/evnt3.png';

const FormWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  padding: theme.spacing(5),
  borderRadius: theme.spacing(3),
  backdropFilter: 'blur(8px)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
  width: '100%',
  maxWidth: 750,
  margin: '0 auto',
  color: '#fff',
  marginTop: theme.spacing(10),
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(6),
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(4),
    maxWidth: '90%',
    padding: theme.spacing(3),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
  '& .MuiInputBase-input': {
    color: '#fff',
    paddingRight: theme.spacing(2),
  },
  '& .MuiInputLabel-root': {
    color: '#bbb',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#999',
    },
    '&:hover fieldset': {
      borderColor: '#fff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ff6e40',
    },
  },
  '& input[type=number]': {
    '-moz-appearance': 'textfield',
    appearance: 'textfield',
  },
  '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
  '& input[type="date"]::-webkit-calendar-picker-indicator, & input[type="time"]::-webkit-calendar-picker-indicator': {
    filter: 'invert(1)',
    cursor: 'pointer',
    height: '24px',
    width: '24px',
    backgroundColor: '#fff0',
    borderRadius: '50%',
  },
  '& input[type="date"], & input[type="time"]': {
    colorScheme: 'light',
  },
}));

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
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setOrganizerId(decoded.id);
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!organizerId) {
      alert('Organizer not identified. Please login again.');
      return;
    }

    const formData = new FormData();
    formData.append('title', titleRef.current.value);
    formData.append('description', descriptionRef.current.value);
    formData.append('location', locationRef.current.value);
    formData.append('date', dateRef.current.value);
    formData.append('time', timeRef.current.value);
    formData.append('category', categoryRef.current.value);
    formData.append('capacity', capacityRef.current.value || 100);
    formData.append('organizer', organizerId);
    formData.append('image', imageRef.current.files[0]);

    try {
      const res = await axios.post('http://localhost:9999/api/v1/events/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${localStorage.getItem('token')}`,
        },
        withCredentials: true,
      });

      alert('Event created successfully!');
      console.log('res', res.data);

      titleRef.current.value = '';
      descriptionRef.current.value = '';
      locationRef.current.value = '';
      dateRef.current.value = '';
      timeRef.current.value = '';
      categoryRef.current.value = 'Other';
      imageRef.current.value = '';
      capacityRef.current.value = '';
      setFileName('');
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || 'Event creation failed';
      alert(message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${BannerImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: { xs: '80px', sm: '100px' },
        paddingBottom: { xs: '80px', sm: '100px' },
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.3)',
          zIndex: 1,
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <FormWrapper component="form" onSubmit={handleSubmit}>
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            textAlign="center"
            sx={{ color: '#fff', mb: 4, fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } }}
          >
            Create <span style={{ color: '#ff6e40' }}>New Event</span>
          </Typography>

          <StyledTextField inputRef={titleRef} label="Event Title" required />
          <StyledTextField inputRef={descriptionRef} label="Description" multiline rows={3} required />
          <StyledTextField inputRef={locationRef} label="Location" required />

          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <StyledTextField
              inputRef={dateRef}
              type="date"
              label="Date"
              InputLabelProps={{ shrink: true }}
              required
            />
            <StyledTextField
              inputRef={timeRef}
              type="time"
              label="Time"
              InputLabelProps={{ shrink: true }}
              required
            />
          </Box>

          <StyledTextField
            inputRef={categoryRef}
            label="Category"
            select
            defaultValue="Other"
            required
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    backgroundColor: '#111',
                    border: '1px solid #555',
                    borderRadius: '8px',
                    color: '#fff',
                  },
                },
              },
            }}
          >
            {['Music', 'Tech', 'Sports', 'Art', 'Education', 'Other'].map((option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{
                  backgroundColor: '#111',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#222',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#333',
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: '#444',
                  },
                }}
              >
                {option}
              </MenuItem>
            ))}
          </StyledTextField>

          <Box sx={{ mb: 2 }}>
            <InputLabel sx={{ color: '#bbb', mb: 1 }}>Event Image</InputLabel>
            <input
              ref={imageRef}
              type="file"
              accept="image/*"
              id="event-image"
              required
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="event-image">
              <Box
                sx={{
                  display: 'inline-block',
                  px: 3,
                  py: 1.5,
                  backgroundColor: '#222',
                  color: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #444',
                  cursor: 'pointer',
                }}
              >
                {fileName ? 'Change Image' : 'Upload Image'}
              </Box>
            </label>
            {fileName && (
              <Typography
                variant="body2"
                sx={{ mt: 1, color: '#aaa', fontStyle: 'italic', wordBreak: 'break-all' }}
              >
                {fileName}
              </Typography>
            )}
          </Box>

          <StyledTextField
            inputRef={capacityRef}
            type="number"
            label="Capacity (default 100)"
          />

          <StyledButton type="submit" fullWidth sx={{ mt: 2 }}>
            Create Event
          </StyledButton>
        </FormWrapper>
      </Box>
    </Box>
  );
};

export default Creation;

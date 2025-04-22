import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import StyledButton from '../StyledButton';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const FormWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.08)",
  padding: theme.spacing(5),
  borderRadius: theme.spacing(3),
  backdropFilter: "blur(8px)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  width: "100%",
  maxWidth: 750,
  margin: "0 auto",
  color: "#fff",
  marginTop: theme.spacing(10),
  [theme.breakpoints.down("md")]: {
    marginTop: theme.spacing(6),
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(4),
    maxWidth: "90%",
    padding: theme.spacing(3),
  },
}));

const Row = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiInputBase-input': {
    color: '#fff',
    fontSize: '1rem',
  },
  '& .MuiInputLabel-root': {
    color: '#bbb',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#999',
    },
    '&:hover fieldset': {
      borderColor: '#ff6e40',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ff6e40',
    },
  },
  '& .MuiFormLabel-root.Mui-focused': {
    color: '#ff6e40', // Focused label color
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
  },
}));

const SignupOrganizer = () => {
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
      const res = await axios.post(`${API_URL}api/v1/organizer/register`, organizerData, {
        headers: { 'Content-Type': 'application/json' },
      });

      setSuccessMsg('Organizer registered successfully!');
      e.target.reset();
    } catch (error) {
      const errMessage =
        error.response?.data?.message || 'Registration failed. Try again.';
      setErrorMsg(errMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper component="form" onSubmit={handleSubmit}>
      <Typography
        variant="h4"
        fontWeight={700}
        gutterBottom
        textAlign="center"
        sx={{ color: '#fff', mb: 4 }}
      >
        Register as <span style={{ color: "#ff6e40" }}>Organizer</span>
      </Typography>

      {/* Two fields per line with better spacing */}
      <Row>
        <StyledTextField label="Full Name" inputRef={nameRef} required />
        <StyledTextField label="Email" type="email" inputRef={emailRef} required />
      </Row>

      <Row>
        <StyledTextField label="Password" type="password" inputRef={passwordRef} required />
        <StyledTextField label="Confirm Password" type="password" inputRef={confirmPasswordRef} required />
      </Row>

      <Row>
        <StyledTextField label="Organization Name" inputRef={organizationNameRef} />
        <StyledTextField label="Contact Number" inputRef={contactNumberRef} />
      </Row>

      {/* Error and Success Messages */}
      {errorMsg && (
        <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
          {errorMsg}
        </Typography>
      )}
      {successMsg && (
        <Typography color="success.main" sx={{ mt: 2, textAlign: 'center' }}>
          {successMsg}
        </Typography>
      )}

      <StyledButton type="submit" fullWidth sx={{ mt: 4 }} disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </StyledButton>
    </FormWrapper>
  );
};

export default SignupOrganizer;
  
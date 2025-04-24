import React from 'react';
import { TextField } from '@mui/material';

const StyledTextField = (props) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      sx={{
        mb: 2,
        '& .MuiInputBase-input': { color: '#fff' },
        '& .MuiInputLabel-root': { color: '#bbb' },
        '& .MuiOutlinedInput-root': {
          '& fieldset': { borderColor: '#999' },
          '&:hover fieldset': { borderColor: '#fff' },
          '&.Mui-focused fieldset': { borderColor: '#ff6e40' },
        },
      }}
      {...props}
    />
  );
};

export default StyledTextField;

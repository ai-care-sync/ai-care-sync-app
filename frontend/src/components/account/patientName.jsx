import React from 'react';
import { Typography, TextField, Button } from '@mui/material';

const PatientName = ({ firstName, lastName, setFirstName, setLastName, handleUserInfoSubmit }) => {
    
  return (
    <>
      <Typography sx={{
        color: '#90A2B4',
        fontSize: '14px',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 400,
        fontStyle: 'normal',
        lineHeight: '23px'
      }}>
        Enter your first and last name:
      </Typography>
      <form>
        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleUserInfoSubmit} // Replace with your submit logic
          disabled={!firstName || !lastName} // Button is disabled if either name or email is empty
        >
          Next
        </Button>
      </form>
    </>
  );
};

export default PatientName;

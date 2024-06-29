import React, { useState } from 'react';
import  { TextField, Button} from "@mui/material"
// import { TextField, Button } from '@material-ui/core';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your code to handle form submission here
  };

  return (
    <form onSubmit={handleSubmit} style={{ width : "30%", margin : "10px auto"}}>
      <TextField
        id="name"
        size='small'
        label="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        id="email"
        size='small'
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        id="message"
        label="Message"
        size='small'
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        multiline
        rows={4}
        fullWidth
        margin="normal"
        required
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Contact;
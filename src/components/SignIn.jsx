import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender,setGender] = useState("male");

  const navigate = useNavigate();

const handleSignUp = async (e) => {
  e.preventDefault();

  if (name && email && password && gender) {
    const userData = { name, email, password, gender };

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("User registered:", userData);
        navigate("/");
      } else {
        const errorData = await response.json();
        alert("Registration failed: " + errorData.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred while registering.");
    }
  }
};



  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Paper elevation={6} sx={{ padding: 4, width: "100%", maxWidth: 400, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Register Account
        </Typography>

        <form onSubmit={handleSignUp}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <TextField
            label="Email"
            type='email'
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
           <FormControl>
            <FormLabel id="demo-radio-buttons-group-label" color="black">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <Box>
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
              </Box>
              </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            // color="orange"
            fullWidth
            sx={{ bgcolor:'orange',mt: 2, borderRadius: "20px" }}
          >
            Sign Up
          </Button>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link href="/login" variant="body2" underline="hover" >
              Already have an account? Login
            </Link>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default SignIn;

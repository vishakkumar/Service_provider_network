import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
  Link,
  Radio,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Check on load: if no user, set flag to 0
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      localStorage.setItem("flag", "0");
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      const userData = { email, isAdmin };
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("flag", "1");

      console.log("User logged in:", email, "Admin:", isAdmin);
      navigate("/"); // or "/dashboard"
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
      <Paper elevation={6} sx={{ padding: 4, width: "100%", maxWidth: 600, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Login to Your Account
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
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

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember Me"
            />
            <FormControlLabel
              control={
                <Radio
                  color="primary"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              }
              label="Admin Login"
            />
            <FormControlLabel
              control={
                <Radio
                  color="primary"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              }
              label="Service Provider Login"
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, borderRadius: "20px", py: 1 }}
          >
            Login
          </Button>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link href="#" variant="body2" underline="hover">
              Forgot Password?
            </Link>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;

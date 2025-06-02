
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "male",
    phone: "",
    dob: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful!");
        navigate("/");
      } else {
        const error = await response.json();
        alert("Error: " + error.message);
      }
    } catch (err) {
      alert("Failed to connect to server.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f36c13, #fe9900)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          p: 4,
          width: "100%",
          maxWidth: 600,
          borderRadius: 4,
          color: "#fff",
        }}
      >
        <Typography variant="h5" textAlign="center" fontWeight="bold" mb={2}>
          Complete Registration
        </Typography>

        <form onSubmit={handleSignUp}>
          <TextField
            label="Full Name"
            name="name"
            fullWidth
            variant="filled"
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
            sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            variant="filled"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            variant="filled"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
            sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
          />

          <TextField
            label="Phone Number"
            name="phone"
            fullWidth
            variant="filled"
            margin="normal"
            value={formData.phone}
            onChange={handleChange}
            required
            sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
          />

          <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            fullWidth
            variant="filled"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={formData.dob}
            onChange={handleChange}
            required
            sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
          />

          <FormControl sx={{ mt: 2 }}>
            <FormLabel sx={{ color: "#fff" }}>Gender</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>

          <TextField
            label="Country"
            name="country"
            fullWidth
            variant="filled"
            margin="normal"
            value={formData.country}
            onChange={handleChange}
            sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
          />

          <TextField
            label="State"
            name="state"
            fullWidth
            variant="filled"
            margin="normal"
            value={formData.state}
            onChange={handleChange}
            sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
          />

          <TextField
            label="City"
            name="city"
            fullWidth
            variant="filled"
            margin="normal"
            value={formData.city}
            onChange={handleChange}
            sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
          />

          <TextField
            label="Zip Code"
            name="zip"
            fullWidth
            variant="filled"
            margin="normal"
            value={formData.zip}
            onChange={handleChange}
            sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
          />

          <TextField
            label="Full Address"
            name="address"
            multiline
            rows={2}
            fullWidth
            variant="filled"
            margin="normal"
            value={formData.address}
            onChange={handleChange}
            sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: "30px",
              fontWeight: "bold",
              backgroundColor: "#fff",
              color: "#f36c13",
              textTransform: "none",
            }}
          >
            Register
          </Button>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link href="/login" underline="hover" sx={{ color: "#fff" }}>
              Already registered? Login
            </Link>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default SignIn


// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Paper,
//   Link,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   FormLabel,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const SignIn = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [gender, setGender] = useState("male");
//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     if (name && email && password && gender) {
//       const userData = { name, email, password, gender };
//       try {
//         const response = await fetch("http://localhost:5000/register", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(userData),
//         });
//         if (response.ok) {
//           navigate("/");
//         } else {
//           const errorData = await response.json();
//           alert("Registration failed: " + errorData.message);
//         }
//       } catch (error) {
//         alert("An error occurred while registering.");
//       }
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #f36c13, #fe9900)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         px: 2,
//       }}
//     >
//       <Paper
//         elevation={6}
//         sx={{
//           backdropFilter: "blur(12px)",
//           backgroundColor: "rgba(255, 255, 255, 0.1)",
//           border: "1px solid rgba(255, 255, 255, 0.3)",
//           p: 4,
//           width: "100%",
//           maxWidth: 420,
//           borderRadius: 4,
//           color: "#fff",
//         }}
//       >
//         <Typography
//           variant="h5"
//           textAlign="center"
//           fontWeight="bold"
//           mb={2}
//           sx={{ color: "#fff" }}
//         >
//           Register Account
//         </Typography>

//         <form onSubmit={handleSignUp}>
//           <TextField
//             label="Full Name"
//             variant="filled"
//             fullWidth
//             margin="normal"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             InputProps={{ sx: { color: "#fff" } }}
//             InputLabelProps={{ sx: { color: "#fff" } }}
//             sx={{
//               backgroundColor: "rgba(255,255,255,0.15)",
//               borderRadius: 2,
//               "& .MuiFilledInput-root:hover": {
//                 backgroundColor: "rgba(255,255,255,0.25)",
//               },
//             }}
//           />

//           <TextField
//             label="Email"
//             type="email"
//             variant="filled"
//             fullWidth
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             InputProps={{ sx: { color: "#fff" } }}
//             InputLabelProps={{ sx: { color: "#fff" } }}
//             sx={{
//               backgroundColor: "rgba(255,255,255,0.15)",
//               borderRadius: 2,
//               "& .MuiFilledInput-root:hover": {
//                 backgroundColor: "rgba(255,255,255,0.25)",
//               },
//             }}
//           />

//           <TextField
//             label="Password"
//             type="password"
//             variant="filled"
//             fullWidth
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             InputProps={{ sx: { color: "#fff" } }}
//             InputLabelProps={{ sx: { color: "#fff" } }}
//             sx={{
//               backgroundColor: "rgba(255,255,255,0.15)",
//               borderRadius: 2,
//               "& .MuiFilledInput-root:hover": {
//                 backgroundColor: "rgba(255,255,255,0.25)",
//               },
//             }}
//           />

//           <FormControl sx={{ mt: 2, color: "#fff" }}>
//             <FormLabel sx={{ color: "#fff" }}>Gender</FormLabel>
//             <RadioGroup
//               row
//               name="gender"
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//             >
//               <FormControlLabel value="female" control={<Radio sx={{ color: "#fff" }} />} label="Female" />
//               <FormControlLabel value="male" control={<Radio sx={{ color: "#fff" }} />} label="Male" />
//               <FormControlLabel value="other" control={<Radio sx={{ color: "#fff" }} />} label="Other" />
//             </RadioGroup>
//           </FormControl>

//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{
//               mt: 3,
//               py: 1.5,
//               borderRadius: "30px",
//               fontWeight: "bold",
//               backgroundColor: "#fff",
//               color: "#f36c13",
//               textTransform: "none",
//               transition: "0.3s",
//               "&:hover": {
//                 backgroundColor: "#f5f5f5",
//               },
//             }}
//           >
//             Sign Up
//           </Button>

//           <Box sx={{ textAlign: "center", mt: 2 }}>
//             <Link href="/login" underline="hover" sx={{ color: "#fff" }}>
//               Already have an account? Login
//             </Link>
//           </Box>
//         </form>
//       </Paper>
//     </Box>
//   );
// };

// export default SignIn;




// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Paper,
//   Link,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';

// const SignIn = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [gender,setGender] = useState("male");

//   const navigate = useNavigate();

// const handleSignUp = async (e) => {
//   e.preventDefault();

//   if (name && email && password && gender) {
//     const userData = { name, email, password, gender };

//     try {
//       const response = await fetch("http://localhost:5000/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       if (response.ok) {
//         console.log("User registered:", userData);
//         navigate("/");
//       } else {
//         const errorData = await response.json();
//         alert("Registration failed: " + errorData.message);
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//       alert("An error occurred while registering.");
//     }
//   }
// };



//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 2,
//       }}
//     >
//       <Paper elevation={6} sx={{ padding: 4, width: "100%", maxWidth: 400, borderRadius: 3 }}>
//         <Typography variant="h5" gutterBottom textAlign="center">
//           Register Account
//         </Typography>

//         <form onSubmit={handleSignUp}>
//           <TextField
//             label="Full Name"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />

//           <TextField
//             label="Email"
//             type='email'
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <TextField
//             label="Password"
//             type="password"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//            <FormControl>
//             <FormLabel id="demo-radio-buttons-group-label" color="black">Gender</FormLabel>
//             <RadioGroup
//               aria-labelledby="demo-radio-buttons-group-label"
//               name="gender"
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//             >
//               <Box>
//               <FormControlLabel value="female" control={<Radio />} label="Female" />
//               <FormControlLabel value="male" control={<Radio />} label="Male" />
//               <FormControlLabel value="other" control={<Radio />} label="Other" />
//               </Box>
//               </RadioGroup>
//           </FormControl>
//           <Button
//             type="submit"
//             variant="contained"
//             // color="orange"
//             fullWidth
//             sx={{ bgcolor:'orange',mt: 2, borderRadius: "20px" }}
//           >
//             Sign Up
//           </Button>

//           <Box sx={{ textAlign: "center", mt: 2 }}>
//             <Link href="/login" variant="body2" underline="hover" >
//               Already have an account? Login
//             </Link>
//           </Box>
//         </form>
//       </Paper>
//     </Box>
//   );
// };

// export default SignIn;

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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      localStorage.setItem("flag", "0");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        const response = await fetch("http://localhost:5000/register");
        const users = await response.json();

        const matchedUser = users.find(
          (user) => user.email === email && user.password === password
        );

        if (matchedUser) {
          localStorage.setItem(
            "user",
            JSON.stringify({ name: matchedUser.name, email: matchedUser.email })
          );
          localStorage.setItem("flag", "1");
          console.log("Login successful:", matchedUser.email);
          navigate("/");
        } else {
          alert("Invalid email or password.");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login.");
      }
    } else {
      alert("Please fill in both email and password.");
    }
  };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        // bgcolor: "gray",
    //  background: #ded03a;
    //  background: linear-gradient(108deg, rgba(222, 208, 58, 1) 37%, rgba(255, 133, 84, 1) 85%);
      }}
    >
      <Box
        sx={{
          // width: "90%",
          // display: "flex",
          // justifyContent: "flex-end",
          // alignItems: "center",
          // bgcolor: "gray",
        }}
      >
        <Paper
          elevation={6}
          sx={{ padding: 4, width: "100%", maxWidth: 400, borderRadius: 3 }}
        >
          <Typography variant="h5" gutterBottom textAlign="center">
            Customer Login
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

            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember Me"
              sx={{ mt: 1 }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, borderRadius: "20px", py: 1 }}
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
    </Box>
  );
};

export default Login;



// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Checkbox,
//   FormControlLabel,
//   Paper,
//   Link,
//   Radio,
//   RadioGroup,
//   FormControl,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginType, setLoginType] = useState(""); // "admin", "service", or "customer"
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (!user) {
//       localStorage.setItem("flag", "0");
//     }
//   }, []);

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (email && password && loginType) {
//       const userData = {
//         email,
//         isAdmin: loginType === "admin",
//         isServiceProvider: loginType === "service",
//         isCustomer: loginType === "customer",
//       };

//       localStorage.setItem("user", JSON.stringify(userData));
//       localStorage.setItem("flag", "1");

//       console.log("User logged in:", email);
//       console.log("Role - Admin:", userData.isAdmin, "Service Provider:", userData.isServiceProvider, "Customer:", userData.isCustomer);

//       navigate("/"); // redirect after login
//     } else {
//       alert("Please fill all fields and select a login type.");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         width: "100%",
//       }}
//     >
//       <Box
//         sx={{
//           width: "90%",
//           display: "flex",
//           justifyContent: "flex-end",
//           alignItems: "center",
//           bgcolor: "gray",
//         }}
//       >
//         <Paper
//           elevation={6}
//           sx={{ padding: 4, width: "100%", maxWidth: 400, borderRadius: 3 }}
//         >
//           <Typography variant="h5" gutterBottom textAlign="center">
//             Login to Your Account
//           </Typography>

//           <form onSubmit={handleLogin}>
//             <TextField
//               label="Email"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />

//             <TextField
//               label="Password"
//               type="password"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <FormControlLabel
//               control={<Checkbox color="primary" />}
//               label="Remember Me"
//               sx={{ mt: 1 }}
//             />
//             <FormControl component="fieldset" sx={{ mt: 1, display: "flex" }}>
//               <RadioGroup
//                 row
//                 value={loginType}
//                 onChange={(e) => setLoginType(e.target.value)}
//               >
//                 <FormControlLabel value="admin" control={<Radio />} label="Admin Login" />
//                 <FormControlLabel value="service" control={<Radio />} label="Service Provider Login" />
//                 <FormControlLabel value="customer" control={<Radio />} label="Customer Login" />
//               </RadioGroup>
//             </FormControl>
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               fullWidth
//               sx={{ mt: 3, borderRadius: "20px", py: 1 }}
//             >
//               Login
//             </Button>
//             <Box sx={{ textAlign: "center", mt: 2 }}>
//               <Link href="#" variant="body2" underline="hover">
//                 Forgot Password?
//               </Link>
//             </Box>
//           </form>
//         </Paper>
//       </Box>
//     </Box>
//   );
// };

// export default Login;



// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Checkbox,
//   FormControlLabel,
//   Paper,
//   Link,
//   Radio,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   // const [isAdmin, setIsAdmin] = useState(false);
//   // const [isServiceProvider,setIsServiceProvider] =useState(false);
//   const [loginType, setLoginType] = useState(""); // could be "admin" or "service"
//   const navigate = useNavigate();


//   // Check on load: if no user, set flag to 0
//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (!user) {
//       localStorage.setItem("flag", "0");
//     }
//   }, []);

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (email && password) {
//       const userData = { email, isAdmin,isServiceProvider };
//       localStorage.setItem("user", JSON.stringify(userData));
//       localStorage.setItem("flag", "1");

//       console.log("User logged in:", email, "Admin:", isAdmin,"serviceProvider :",isServiceProvider);
//       navigate("/"); // or "/dashboard"
//     }
//   };

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
//       <Paper elevation={6} sx={{ padding: 4, width: "100%", maxWidth: 600, borderRadius: 3 }}>
//         <Typography variant="h5" gutterBottom textAlign="center">
//           Login to Your Account
//         </Typography>

//         <form onSubmit={handleLogin}>
//           <TextField
//             label="Email"
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

//           <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
//             <FormControlLabel
//               control={<Checkbox color="primary" />}
//               label="Remember Me"
//             />


//               <FormControlLabel
//                 control={
//                   <Radio
//                     color="primary"
//                     checked={loginType === "admin"}
//                     onChange={() => setLoginType("admin")}
//                   />
//                 }
//                 label="Admin Login"
//               />
//               <FormControlLabel
//                 control={
//                   <Radio
//                     color="primary"
//                     checked={loginType === "service"}
//                     onChange={() => setLoginType("service")}
//                   />
//                 }
//                 label="Service Provider Login"
//               />

//           </Box>

//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 2, borderRadius: "20px", py: 1 }}
//           >
//             Login
//           </Button>

//           <Box sx={{ textAlign: "center", mt: 2 }}>
//             <Link href="#" variant="body2" underline="hover">
//               Forgot Password?
//             </Link>
//           </Box>
//         </form>
//       </Paper>
//     </Box>
//   );
// };

// export default Login;

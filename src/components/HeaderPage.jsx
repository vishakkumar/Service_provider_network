import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { keyframes } from "@emotion/react";

// Gradient animation for brand name
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Smooth slide-up effect for nav buttons
const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const HeaderPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const loginStatus = localStorage.getItem("flag") === "true";
    setIsLoggedIn(loginStatus);

    const header = document.getElementById("header");
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
      } else {
        header.style.boxShadow = "none";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("flag");
    localStorage.removeItem("user");
    localStorage.setItem("flag", "flase");
    setIsLoggedIn(false);
    handleMenuClose();
    navigate("/");
  };

  return (
    <Box
      id="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        px: { xs: 2, sm: 4 },
        py: 1.5,
        backdropFilter: "blur(12px)",
        transition: "box-shadow 0.3s ease-in-out",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          height: "60px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 1.5, sm: 0 },
        }}
      >
        {/* Left logo section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Diversity2Icon sx={{ color: "#FE9900", fontSize: 32 }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              letterSpacing: 1.2,
              background:
                "linear-gradient(-45deg,rgb(252, 108, 13), #FE9900,rgb(255, 173, 50))",
              backgroundSize: "300% 300%",
              animation: `${gradientAnimation} 6s ease infinite`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SPN Service Provider Network
          </Typography>
        </Box>

        {/* Right nav section */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
            animation: `${fadeInUp} 0.6s ease`,
          }}
        >
          <Button
            onClick={() => navigate("/")}
            sx={{
              color: "#FE9900",
              fontSize: "15px",
              px: 2.5,
              py: 1,
              borderRadius: "10px",
              fontWeight: "bold",
              textTransform: "none",
              backgroundColor: "transparent",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s ease",
              // "&:hover": {
              //   backgroundColor: "#e8f5e9",
              //   boxShadow: "0 0 8px rgb(252, 108, 13)",
              //   transform: "translateY(-1px) scale(1.03)",
              // },
              // "&::after": {
              //   content: '""',
              //   position: "absolute",
              //   bottom: 0,
              //   left: 0,
              //   height: "2px",
              //   width: "0%",
              //   backgroundColor: "rgb(252, 108, 13)",
              //   transition: "width 0.3s ease-in-out",
              // },
              // "&:hover::after": {
              //   width: "100%",
              // },
            }}
          >
            HOME
          </Button>

          {!isLoggedIn ? (
            <>
              <Button
                onClick={() => navigate("/login")}
                sx={{               color: "#FE9900",
              fontSize: "15px",
              px: 2.5,
              py: 1,
              borderRadius: "10px",
              fontWeight: "bold",
              textTransform: "none",
              backgroundColor: "transparent",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s ease", }}
              >
                LOGIN
              </Button>
              <Button
                onClick={() => navigate("/signin")}
                sx={{               
                  color: "#FE9900",
                  fontSize: "15px",
                  px: 2.5,
                  py: 1,
                  borderRadius: "10px",
                  fontWeight: "bold",
                  textTransform: "none",
                  backgroundColor: "transparent",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",}}
              >
                SIGN IN
              </Button>
            </>
          ) : (
            <>
              <IconButton onClick={handleMenuOpen} sx={{ color: "#FE9900" }}>
                <AccountCircleIcon fontSize="large" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => { navigate("/myaccount"); handleMenuClose(); }}>
                  My Account
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderPage;


// import React, { useEffect } from "react";
// import { Box, Button, Typography } from "@mui/material";
// import Diversity2Icon from "@mui/icons-material/Diversity2";
// import { useNavigate } from "react-router-dom";
// import { keyframes } from "@emotion/react";

// // Gradient animation for brand name
// const gradientAnimation = keyframes`
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `;

// // Smooth slide-up effect for nav buttons
// const fadeInUp = keyframes`
//   0% { opacity: 0; transform: translateY(10px); }
//   100% { opacity: 1; transform: translateY(0); }
// `;

// const HeaderPage = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const header = document.getElementById("header");
//     const handleScroll = () => {
//       if (window.scrollY > 20) {
//         header.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
//       } else {
//         header.style.boxShadow = "none";
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <Box
//       id="header"
//       sx={{
//         position: "sticky",
//         top: 0,
//         zIndex: 1100,
//         // width: "100%",
//         px: { xs: 2, sm: 4 },
//         py: 1.5,
//         backdropFilter: "blur(12px)",
//         // backgroundColor: "#16404D",
//         // borderBottom: "1px solid #dcdcdc",
//         transition: "box-shadow 0.3s ease-in-out",
//         overflowX: "hidden", 
//       }}
//     >
//       <Box
//         sx={{
//           maxWidth: "1200px",
//           mx: "auto",
//           height:'60px',
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           flexDirection: { xs: "column", sm: "row" },
//           gap: { xs: 1.5, sm: 0 },
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Diversity2Icon sx={{ color: "#FE9900", fontSize: 32 }} />
//           <Typography
//             variant="h5"
//             sx={{
//               fontWeight: 700,
//               letterSpacing: 1.2,
//               background: "linear-gradient(-45deg,rgb(252, 108, 13), #FE9900,rgb(255, 173, 50))",
//               backgroundSize: "300% 300%",
//               animation: `${gradientAnimation} 6s ease infinite`,
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             SPN Service Provider Network
//           </Typography>
//         </Box>

//         <Box
//           sx={{
//             display: "flex",
//             gap: 2,
//             flexWrap: "wrap",
//             justifyContent: "center",
//             animation: `${fadeInUp} 0.6s ease`,
//           }}
//         >
//           {[
//             { label: "HOME", path: "/" },
//             { label: "LOGIN", path: "/login" },
//             { label: "SIGN IN", path: "/signin" },
//           ].map((item, index) => (
//             <Button
//               key={item.label}
//               onClick={() => navigate(item.path)}
//               sx={{
//                 color: "#FE9900",
//                 // fontWeight: '500',
//                 fontSize: "15px",
//                 px: 2.5,
//                 py: 1,
//                 borderRadius: "10px",
//                 fontWeight:'Bold',
//                 textTransform: "none",
//                 backgroundColor: "transparent",
//                 position: "relative",
//                 overflow: "hidden",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   backgroundColor: "#e8f5e9",
//                   boxShadow: "0 0 8px rgb(252, 108, 13)",
//                   transform: "translateY(-1px) scale(1.03)",
//                 },
//                 "&::after": {
//                   content: '""',
//                   position: "absolute",
//                   bottom: 0,
//                   left: 0,
//                   height: "2px",
//                   width: "0%",
//                   backgroundColor: "rgb(252, 108, 13)",
//                   transition: "width 0.3s ease-in-out",
//                 },
//                 "&:hover::after": {
//                   width: "100%",
//                 },
//               }}
//             >
//               {item.label}
//             </Button>
//           ))}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default HeaderPage;




// import React, { useEffect } from "react";
// import {
//   Box,
//   Button,
//   Typography,

// } from "@mui/material";
// import Diversity2Icon from "@mui/icons-material/Diversity2";
// import { useNavigate } from "react-router-dom";
// import { keyframes } from "@emotion/react";

// const gradientAnimation = keyframes`
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `;

// const HeaderPage = () => {
//   const navigate = useNavigate();
  

//   useEffect(() => {
//     const handleScroll = () => {
//       const header = document.getElementById("header");
//       if (window.scrollY > 20) {
//         header.style.boxShadow = "0 6px 16px rgba(0,0,0,0.12)";
//       } else {
//         header.style.boxShadow = "none";
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <Box
//       id="header"
//       sx={{
//         position: "sticky",
//         top: 0,
//         zIndex: 1000,
//         width: "100%",
//         px: { xs: 2, sm: 4 },
//         py: 1.5,
//         backdropFilter: "blur(10px)",
//         backgroundColor: "rgba(255,255,255,0.75)",
//         borderBottom: "1px solid #e0e0e0",
//         transition: "box-shadow 0.3s ease",
//       }}
//     >
//       <Box
//         sx={{
//           maxWidth: "1200px",
//           mx: "auto",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           flexDirection: { xs: "column", sm: "row" },
//           gap: { xs: 1, sm: 0 },
//         }}
//       >
//         {/* Logo & Title */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Diversity2Icon sx={{ color: "#2e7d32", fontSize: 30 }} />
//           <Typography
//             variant="h5"
//             sx={{
//               fontWeight: 700,
//               letterSpacing: 1,
//               background: "linear-gradient(-45deg, #2e7d32, #66bb6a, #2e7d32)",
//               backgroundSize: "300% 300%",
//               animation: `${gradientAnimation} 8s ease infinite`,
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             SPN Service Network
//           </Typography>
//         </Box>

//         {/* Navigation Buttons */}
//         <Box
//           sx={{
//             display: "flex",
//             gap: 2,
//             flexWrap: "wrap",
//             justifyContent: "center",
//           }}
//         >
//           {[
//             { label: "Home", path: "/" },
//             { label: "Login", path: "/login" },
//             { label: "Sign In", path: "/signin" },
//           ].map((item) => (
//             <Button
//               key={item.label}
//               onClick={() => navigate(item.path)}
//               sx={{
//                 position: "relative",
//                 color: "#2e7d32",
//                 fontWeight: 500,
//                 fontSize: "16px",
//                 px: 2,
//                 py: 1,
//                 borderRadius: "8px",
//                 textTransform: "none",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   backgroundColor: "#e8f5e9",
//                   transform: "scale(1.05)",
//                 },
//                 "&::after": {
//                   content: '""',
//                   position: "absolute",
//                   width: "0%",
//                   height: "2px",
//                   left: 0,
//                   bottom: 0,
//                   backgroundColor: "#2e7d32",
//                   transition: "width 0.3s ease-in-out",
//                 },
//                 "&:hover::after": {
//                   width: "100%",
//                 },
//               }}
//             >
//               {item.label}
//             </Button>
//           ))}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default HeaderPage;



// import React from 'react';
// import { Box, Button, Typography } from '@mui/material';
// import Diversity2Icon from '@mui/icons-material/Diversity2';
// import { useNavigate } from 'react-router-dom';
// import { keyframes } from '@emotion/react';

// // Gradient animation for title
// const gradientAnimation = keyframes`
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `;

// const HeaderPage = () => {
//   const navigate = useNavigate();

//   return (
//     <Box
//       sx={{
//         width: '100%',
//         backgroundColor: '#ffffff',
//         borderBottom: '1px solid #e0e0e0',
//         px: 3,
//         py: 2,
//         position: 'sticky',
//         top: 0,
//         zIndex: 1000,
//         boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
//         transition: 'all 0.3s ease',
//         animation: 'fadeIn 0.8s ease-in',
//         '@keyframes fadeIn': {
//           from: { opacity: 0, transform: 'translateY(-20px)' },
//           to: { opacity: 1, transform: 'translateY(0)' },
//         },
//       }}
//     >
//       <Box
//         sx={{
//           maxWidth: '1200px',
//           mx: 'auto',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexDirection: { xs: 'column', sm: 'row' },
//           gap: { xs: 1.5, sm: 0 },
//         }}
//       >
//         {/* Logo & Title */}
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <Diversity2Icon sx={{ color: '#2e7d32', fontSize: 30 }} />
//           <Typography
//             variant="h5"
//             sx={{
//               fontWeight: 700,
//               background: 'linear-gradient(-45deg, #2e7d32, #66bb6a, #2e7d32)',
//               backgroundSize: '300% 300%',
//               animation: `${gradientAnimation} 8s ease infinite`,
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               letterSpacing: 1,
//             }}
//           >
//             SPN Service Network
//           </Typography>
//         </Box>

//         {/* Nav Buttons */}
//         <Box
//           sx={{
//             display: 'flex',
//             gap: 2,
//             flexWrap: 'wrap',
//             justifyContent: 'center',
//           }}
//         >
//           {[
//             { label: 'Home', path: '/' },
//             { label: 'Login', path: '/login' },
//             { label: 'Sign In', path: '/signin' },
//           ].map((item) => (
//             <Button
//               key={item.label}
//               onClick={() => navigate(item.path)}
//               sx={{
//                 position: 'relative',
//                 color: '#2e7d32',
//                 fontWeight: 500,
//                 fontSize: '16px',
//                 px: 2,
//                 py: 1,
//                 borderRadius: '8px',
//                 textTransform: 'none',
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                   backgroundColor: '#e8f5e9',
//                   transform: 'scale(1.05)',
//                 },
//                 '&::after': {
//                   content: '""',
//                   position: 'absolute',
//                   width: '0%',
//                   height: '2px',
//                   left: 0,
//                   bottom: 0,
//                   backgroundColor: '#2e7d32',
//                   transition: 'width 0.3s ease-in-out',
//                 },
//                 '&:hover::after': {
//                   width: '100%',
//                 },
//               }}
//             >
//               {item.label}
//             </Button>
//           ))}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default HeaderPage;


// import React from 'react';
// import { Box, Button, Typography } from '@mui/material';
// import Diversity2Icon from '@mui/icons-material/Diversity2';
// import { useNavigate } from 'react-router-dom';

// const HeaderPage = () => {
//   const navigate = useNavigate();

//   return (
//     <Box
//       sx={{
//         width: '100%',
//         backgroundColor: '#ffffff',
//         borderBottom: '1px solid #e0e0e0',
//         px: 3,
//         py: 2,
//         boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
//         position: 'sticky',
//         top: 0,
//         zIndex: 1000,
//       }}
//     >
//       <Box
//         sx={{
//           maxWidth: '1200px',
//           mx: 'auto',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexDirection: { xs: 'column', sm: 'row' },
//           gap: { xs: 1.5, sm: 0 },
//         }}
//       >
//         {/* Logo and Title */}
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <Diversity2Icon sx={{ color: '#2e7d32', fontSize: 28 }} />
//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: '600',
//               fontSize: { xs: '18px', sm: '22px' },
//               color: '#333',
//             }}
//           >
//             SPN Service
//             Provider Network
//           </Typography>
//         </Box>

//         {/* Nav Buttons */}
//         <Box
//           sx={{
//             display: 'flex',
//             gap: 2,
//             flexWrap: 'wrap',
//             justifyContent: 'center',
//           }}
//         >
//           {[
//             { label: 'Home', path: '/' },
//             { label: 'Login', path: '/login' },
//             { label: 'Sign In', path: '/signin' },
//           ].map((item) => (
//             <Button
//               key={item.label}
//               onClick={() => navigate(item.path)}
//               sx={{
//                 color: '#2e7d32',
//                 fontWeight: 500,
//                 textTransform: 'none',
//                 fontSize: '16px',
//                 px: 2,
//                 py: 1,
//                 borderRadius: '8px',
//                 transition: 'all 0.3s',
//                 '&:hover': {
//                   backgroundColor: '#e8f5e9',
//                 },
//               }}
//             >
//               {item.label}
//             </Button>
//           ))}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default HeaderPage;



// import React from 'react';
// import { Box, Button, Typography } from '@mui/material';
// import { keyframes } from '@emotion/react';
// import Diversity2Icon from '@mui/icons-material/Diversity2';
// import { useNavigate } from 'react-router-dom';

// const gradientAnimation = keyframes`
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `;

// const backgroundAnimation = keyframes`
//   0% { background-color: rgb(255, 0, 0); color: white; }
//   50% { background-color: white; color: rgb(255, 0, 0); }
//   100% { background-color: rgb(255, 0, 0); color: white; }
// `;

// const HeaderPage = () => {
//   const navigate = useNavigate();

//   return (
//     <Box sx={{ width: '100%'}}>
//      <Box
//         sx={{
//           background: 'linear-gradient(-45deg, #ff4e50, #f9d423, #ff4e50, #f9d423)',
//           backgroundSize: '400% 400%',
//           animation: `${gradientAnimation} 10s ease infinite`,
//           color: '#fff',
//           borderRadius: '10px',
//           width: '95%',
//           height: '50px',
//           margin: 'auto',
//           padding: '10px 20px',
//           display: 'flex',
//           flexDirection: { xs: 'column', sm: 'row' },
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           gap: { xs: 2, sm: 0 },
//         }}
//       >

//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: { xs: 'center', sm: 'flex-start' },
//             width: { xs: '100%', sm: 'auto' },
//           }}
//         >
//           <Diversity2Icon sx={{ padding: '5px' }} />
//           <Typography sx={{ fontSize: { xs: '16px', sm: '20px' }, textAlign: 'center' }}>
//             SPN Service Provider Network
//           </Typography>
//         </Box>

//         <Box
//           sx={{
//             display: 'flex',
//             gap: 2,
//             flexWrap: 'wrap',
//             justifyContent: { xs: 'center', sm: 'flex-end' },
//             width: { xs: '100%', sm: 'auto' },
//           }}
//         >
//           <Button
//             sx={{
//               animation: `${gradientAnimation} 10s infinite alternate ease-in-out`,
//               // fontFamily: 'sans-serif',
//               fontSize: { xs: '16px', sm: '20px' },
//               minWidth: '80px',
//             }}
//             onClick={() => navigate('/')}
//           >
//             Home
//           </Button>
//           <Button
//             sx={{
//               animation: `${gradientAnimation} 10s infinite alternate ease-in-out`,
//               // fontFamily: 'sans-serif',
//               fontSize: { xs: '16px', sm: '20px'},
//               minWidth: '80px',
//             }}
//             onClick={() => navigate('/login')}
//           >
//             Log in
//           </Button>
//           <Button
//             sx={{
//               animation: `${gradientAnimation} 10s infinite alternate ease-in-out`,
//               // fontFamily: 'sans-serif',
//               fontSize: { xs: '16px', sm: '20px' },
//               minWidth: '80px',
//             }}
//             onClick={() => navigate('/signin')}
//           >
//             Sign In
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default HeaderPage;

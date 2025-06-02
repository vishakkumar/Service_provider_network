import { Box, Button, Typography, Grid } from "@mui/material";
import React from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useNavigate } from "react-router-dom";


const AboutUs = () => {
  const navigate = useNavigate();
  const handleNavigation = (label) => {
    switch (label) {
      case "Official Page":
        navigate("/admin");
        break;
      case "Register Your Business":
        navigate("/register-business");
        break;
      case "Pricing":
        navigate("/pricing");
        break;
      case "About SPN":
        navigate("/aboutspn");
        break;
      case "Policy":
        navigate("/policy");
        break;  
      case "Support":
        navigate("/support");
        break;  
      case "Raise Ticket":
        navigate("/raiseticket");
        break;  
      case "Account Profile":
        navigate("/accountprofile");
        break;
      case "News":
        navigate("/news");
        break;
      case "Careers":
        navigate("/careers");
        break;
      case "Privacy":
        navigate("/privacy");
        break;  
      case "About SPN":
        navigate("/profile");
        break;  
      case "Instagram":
        navigate("/instagram");
        break;  
      case "Facebook":
        navigate("/facebook");
        break;  
      case "LinkedIn":
        navigate("/profile");
        break;  
      case "WhatsApp":
        navigate("/whatsapp");
        break;  
      
        // Add more routes as needed
      default:
        console.log(`Clicked: ${label}`);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          // background: "linear-gradient(135deg, #5f2c82, #49a09d)",
          // background:'#16404D',
          background:' #2F3C7E',
          backgroundSize: "400% 400%",
          animation: "gradient 12s ease infinite",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          mt: 8,
          py: 6,
          px: 4,
          color: '#FBEAEB',
          
        }}
      >
        <Typography
          variant="h3"
          textAlign="center"
          fontWeight="bold"
          mb={5}
          sx={{
            textShadow: "0 3px 6px rgba(0,0,0,0.4)",
            letterSpacing: 1.5,
            color: "#FE9900",
          }}
        >
          About Us
        </Typography>

        <Grid
          container
          spacing={5}
          justifyContent="center"
          textAlign="center"
        >
          {sections.map(({ title, links }, index) => (
            <Grid item xs={12} sm={6} md={2.5} key={index}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                {title}
              </Typography>
              <Box display="flex" flexDirection="column" alignItems="center">
                {links.map(({ label, icon }) => (
                  <Button
                    key={label}
                    startIcon={icon}
                    sx={buttonStyle}
                    onClick={() => handleNavigation(label)}
                  >
                    {label}
                  </Button>

                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Typography
          sx={{
            mt: 6,
            fontSize: "15px",
            textAlign: "center",
            maxWidth: "1000px",
            mx: "auto",
            lineHeight: 1.8,
            color: "#e0f2f1",
          }}
        >
          <strong>"SPN - Connecting You to Trusted Services, 100% Verified!"</strong><br />
          SPN (Service Provider Network) is a future-ready advertising platform linking users with verified, local professionals across every service industry. From electricians to caterers, every provider on SPN is thoroughly verified for excellence, trust, and commitment. Whether you're seeking skilled craftsmanship or technical service, our intuitive platform guarantees a seamless, transparent, and modern experience. Join us and elevate how services are discovered, delivered, and trusted.
        </Typography>
      </Box>
    </Box>
  );
};

const buttonStyle = {
  color: "#e0f7fa",
  textTransform: "none",
  fontSize: "15px",
  justifyContent: "flex-start",
  px: 1,
  py: 0,
  transition: "all 0.3s ease",
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateX(3px)',
    color: "#ffffff",
  },
};

const sections = [
  {
    title: "Business",
    links: [
      { label: "Pricing" },
      { label: "Register Your Business" },
      { label: "Become Delivery Partner" },
      { label: "Official Page"},
    ],
  },
  {
    title: "Store",
    links: [
      { label: "Policy" },
      { label: "Support" },
      { label: "Raise Ticket" },
      { label: "Account Profile" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "News" },
      { label: "Careers" },
      { label: "Privacy" },
      { label: "About SPN" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { label: "Instagram", icon: <InstagramIcon /> },
      { label: "Facebook", icon: <FacebookIcon /> },
      { label: "LinkedIn", icon: <LinkedInIcon /> },
      { label: "WhatsApp", icon: <WhatsAppIcon /> },
    ],
  },
];

export default AboutUs;








// import { Box, Button, Typography, Grid } from "@mui/material";
// import React from "react";
// import InstagramIcon from '@mui/icons-material/Instagram';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// const AboutUs = () => {
//   return (
//     <Box>
//       <Box
//         sx={{
//           background: "linear-gradient(-45deg,rgb(51, 24, 24),rgb(189, 179, 129),rgb(46, 10, 11),rgb(194, 189, 162))",
//           backgroundSize: "400% 400%",
//           animation: "gradient 15s ease infinite",
//           borderBottomLeftRadius: "20px",
//           borderBottomRightRadius: "20px",
//           marginTop: "20px",
//           padding: "30px 20px",
//         }}
//       >
//         <Typography variant="h3" textAlign="center" color="white" fontWeight="bold" mb={4}>
//           About Us
//         </Typography>

//         <Grid
//           container
//           spacing={4}
//           sx={{
//             textAlign: "center",
//             justifyContent: "center",
//             color: "#fff",
//           }}
//         >
//           <Grid item xs={12} sm={6} md={2}>
//             <Typography variant="h6" gutterBottom>Business</Typography>
//             <Box sx={{ display: "flex", flexDirection: "column" ,alignItems:'center'}}>
//               <Button sx={buttonStyle}>Pricing</Button>
//               <Button sx={buttonStyle}>Register Your Business</Button>
//               <Button sx={buttonStyle}>Become Delivery Partner</Button>
//             </Box>
//           </Grid>

//           <Grid item xs={12} sm={6} md={2}>
//             <Typography variant="h6" gutterBottom>Store</Typography>
//             <Box sx={{ display: "flex", flexDirection: "column" ,alignItems:'center'}}>
//               <Button sx={buttonStyle}>Policy</Button>
//               <Button sx={buttonStyle}>Support</Button>
//               <Button sx={buttonStyle}>Raise Ticket</Button>
//               <Button sx={buttonStyle}>Account Profile</Button>
//             </Box>
//           </Grid>

//           <Grid item xs={12} sm={6} md={2}>
//             <Typography variant="h6" gutterBottom>Company</Typography>
//             <Box sx={{ display: "flex", flexDirection: "column",alignItems:'center' }}>
//               <Button sx={buttonStyle}>News</Button>
//               <Button sx={buttonStyle}>Careers</Button>
//               <Button sx={buttonStyle}>Privacy</Button>
//               <Button sx={buttonStyle}>About SPN</Button>
//             </Box>
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <Typography variant="h6" gutterBottom>Follow Us</Typography>
//             <Box sx={{ display: "flex", flexDirection: "column",alignItems:'center' }}>
//               <Button startIcon={<InstagramIcon />} sx={buttonStyle}>Instagram</Button>
//               <Button startIcon={<FacebookIcon />} sx={buttonStyle}>Facebook</Button>
//               <Button startIcon={<LinkedInIcon />} sx={buttonStyle}>LinkedIn</Button>
//               <Button startIcon={<WhatsAppIcon />} sx={buttonStyle}>WhatsApp</Button>
//             </Box>
//           </Grid>
//         </Grid>

//         <Typography
//           sx={{
//             color: "#fefefe",
//             textAlign: "center",
//             marginTop: "40px",
//             fontSize: "16px",
//           }}
//         >
//           "SPN - Connecting You to Trusted Services, 100% Verified!"<br />
//           "SPN (Service Provider Network) is a trusted advertising platform connecting customers with verified service providers across various industries. We ensure that every service provider on our platform undergoes a thorough verification process, guaranteeing reliability, professionalism, and quality service. Whether you're looking for electricians, plumbers, carpenters, photographers, or other skilled professionals, SPN makes it easy to find and connect with trusted experts. Our mission is to bridge the gap between customers and service providers, ensuring a seamless and hassle-free experience for both. Advertise your services with us and grow your business in a trusted network!"
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// // Button Style
// const buttonStyle = {
//   color: "#fff",
//   marginTop: "8px",
//   fontSize: "14px",
//   textTransform: "capitalize",
//   justifyContent: "flex-start",
// };

// export default AboutUs;



// import { Box, Button, Typography, Grid } from "@mui/material";
// import React from "react";
// import InstagramIcon from '@mui/icons-material/Instagram';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';


// const AboutUs = () => {
//   return (
//     <Box>
//       <Box
//         sx={{
//           background: "rgb(223, 223, 223)",
//           borderBottomLeftRadius: "20px",
//           borderBottomRightRadius: "20px",
//           marginTop: "20px",
//           padding: "20px",
//         }}
//       >
//         <Typography variant="h2" textAlign="center" color="red">
//           About Us
//         </Typography>

//         <Grid
//           container
//           spacing={2}
//           sx={{
//             width: "100%",
//             marginTop: "20px",
//             textAlign: "center",
//             display: "flex",
//             justifyContent: "flex-start",
//           }}
//         >
//           <Grid item xs={12} sm={4} md={2}>
//             <Typography variant="h5" color="rgb(155, 152, 152)">
//               Business
//             </Typography>
//             <Box sx={{display: "flex",flexDirection: "column"}}>
//               <Button sx={buttonStyle}>Pricing</Button>
//               <Button sx={buttonStyle}>Register Your Business</Button>
//               <Button sx={buttonStyle}>Become Delivery Partner </Button>
              
//               </Box>
//           </Grid>

//           <Grid item xs={12} sm={4} md={2}>
//             <Typography variant="h5" color="rgb(155, 152, 152)">
//               Store
//             </Typography>
//             <Box sx={{ display: "flex", flexDirection: "column" }}>
//               <Button sx={buttonStyle}>Policy</Button>
//               <Button sx={buttonStyle}>Support</Button>
//               <Button sx={buttonStyle}>Raise Ticket</Button>
//               <Button sx={buttonStyle}>Account Profile</Button>
//             </Box>
//           </Grid>

//           <Grid item xs={12} sm={4} md={2}>
//             <Typography variant="h5" color="rgb(155, 152, 152)">
//               Company
//             </Typography>
//             <Box sx={{ display: "flex", flexDirection: "column" }}>
//               <Button sx={buttonStyle}>News</Button>
//               <Button sx={buttonStyle}>Careers</Button>
//               <Button sx={buttonStyle}>Privacy</Button>
//               <Button sx={buttonStyle}>About SPN</Button>
//             </Box>
//           </Grid>
//           <Grid item xs={12} sm={4} md={2}>

//           </Grid>
//           <Grid item xs={12} sm={4} md={4}>
//             <Typography variant="h5" sx={{ textDecoration: 'underline' }} color="rgb(155, 152, 152)">
//               Social Media
//             </Typography>
//             <Box sx={{ display: "flex", flexDirection: "column" }}>
//               <Button startIcon={<InstagramIcon />} sx={buttonStyle}>Instagram</Button>
//               <Button startIcon={<FacebookIcon />} sx={buttonStyle}>Facebook</Button>
//               <Button startIcon={<LinkedInIcon />} sx={buttonStyle}>LinkedIn</Button>
//               <Button startIcon={<WhatsAppIcon />} sx={buttonStyle}>What's App</Button>
//             </Box>
//           </Grid>

//         </Grid>

//         <Typography
//           sx={{
//             color: "rgb(139, 139, 68)",
//             textAlign: "center",
//             marginTop: "20px",
//           }}
//         >
//           "SPN - Connecting You to Trusted Services, 100% Verified!"
//           <br />
//           "SPN (Service Provider Network) is a trusted advertising platform
//           connecting customers with verified service providers across various
//           industries. We ensure that every service provider on our platform
//           undergoes a thorough verification process, guaranteeing reliability,
//           professionalism, and quality service. Whether you're looking for
//           electricians, plumbers, carpenters, photographers, or other skilled
//           professionals, SPN makes it easy to find and connect with trusted
//           experts. Our mission is to bridge the gap between customers and
//           service providers, ensuring a seamless and hassle-free experience for
//           both. Advertise your services with us and grow your business in a
//           trusted network!"
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// // Button Style
// const buttonStyle = {
//   color: "gray",
//   marginTop: "10px",
//   fontSize: "10px",
//   textDecoration: "none",
//   textTransform: "capitalize",
// };

// export default AboutUs;





// import { Box, Button, Typography, Grid } from '@mui/material';
// import React from 'react';

// const AboutUs = () => {
//   return (
//     <Box> 
//       <Box sx={{ background: "white", borderBottomLeftRadius: '20px', borderBottomRightRadius: "20px", marginTop: '20px', padding: '20px',background:'rgb(223, 223, 223)', }}>
//         <Typography variant="h2" textAlign="center" color="red">
//           About Us
//         </Typography>
        
//         <Grid container  sx={{width:'100%', marginTop: '20px',textAlign:'center',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center' }}>
//           <Grid item lg={2}>
//             <Typography variant="h6" color="rgb(155, 152, 152)">Business</Typography>
//             <Box sx={{borderRight:'1px solid gray',display:'flex',flexDirection:'column'}}>
//             <Button onClick={() => alert("Button clicked!")}
//               sx={{color:'gray', marginTop: '10px',fontSize:'10px',textDecoration:'none', 
//                 textTransform: 'capitalize' }}
//             >Register Your Business </Button>
//             <Button onClick={() => alert("Button clicked!")}
//               sx={{color:'gray', marginTop: '10px',fontSize:'10px',textDecoration:'none', 
//                 textTransform: 'capitalize' }}
//             >Pricing </Button>
//             </Box>
//           </Grid>
//           <Grid item lg={2} textAlign="center">
//             <Typography variant="h6" color="rgb(155, 152, 152)">Company</Typography>
//             <Box sx={{borderRight:'1px solid gray',display:'flex',flexDirection:'column'}}>
//             <Button onClick={() => alert("Button clicked!")}
//               sx={{color:'gray', marginTop: '10px',fontSize:'10px',textDecoration:'none', 
//                 textTransform: 'capitalize' }}
//             >News </Button>
//             <Button onClick={() => alert("Button clicked!")}
//               sx={{color:'gray', marginTop: '10px',fontSize:'10px',textDecoration:'none', 
//                 textTransform: 'capitalize' }}
//             >Careers </Button>
//             <Button onClick={() => alert("Button clicked!")}
//               sx={{color:'gray', marginTop: '10px',fontSize:'10px',textDecoration:'none', 
//                 textTransform: 'capitalize' }}
//             >Privacy </Button>
//             <Button onClick={() => alert("Button clicked!")}
//               sx={{color:'gray', marginTop: '10px',fontSize:'10px',textDecoration:'none', 
//                 textTransform: 'capitalize' }}
//             >About SPN </Button>
            

            
//             </Box>

//           </Grid>

//         <Grid item lg={2} textAlign="center">
//             <Typography variant="h6" color="rgb(155, 152, 152)">Store</Typography>
//             <Box sx={{borderRight:'1px solid gray',display:'flex',flexDirection:'column'}}>
//             <Button onClick={() => alert("Button clicked!")}
//               sx={{color:'gray', marginTop: '10px',fontSize:'10px',textDecoration:'none', 
//                 textTransform: 'capitalize' }}
//             >Account Profile </Button>
//             <Button onClick={() => alert("Button clicked!")}
//               sx={{color:'gray', marginTop: '10px',fontSize:'10px',textDecoration:'none', 
//                 textTransform: 'capitalize' }}
//             >Store Support </Button>
//             </Box>
//           </Grid>

//         </Grid>
        

//         <Typography sx={{ color: 'rgb(139, 139, 68)', textAlign: 'center', marginTop: '20px' }}>
//           "SPN - Connecting You to Trusted Services, 100% Verified!"<br/>
//           "SPN (Service Provider Network) is a trusted advertising platform connecting customers with verified service providers across various industries. We ensure that every service provider on our platform undergoes a thorough verification process, guaranteeing reliability, professionalism, and quality service. Whether you're looking for electricians, plumbers, carpenters, photographers, or other skilled professionals, SPN makes it easy to find and connect with trusted experts. Our mission is to bridge the gap between customers and service providers, ensuring a seamless and hassle-free experience for both. Advertise your services with us and grow your business in a trusted network!"
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default AboutUs;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import ImageSlider from "./ImageSlider";
import ServiceList from "./ServiceList";

const BodyPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [businessName, setBusinessName] = useState("");

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [businessNames, setBusinessNames] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get("./services.json");

        const unique = (arr) => [...new Set(arr)];

        setCategories(unique(data.services.map((s) => s.service)));
        setLocations(unique(data.services.map((s) => s.contact.location)));
        setBusinessNames(unique(data.services.map((s) => s.business_name)));
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const filterStyles = {
    height: "40px",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    backgroundColor: "white",
    borderRadius: 2,
    px: 1.5,
    fontSize: "0.95rem",
  };

  return (
    <Box sx={{ background: "#f9f9f9", minHeight: "100vh", }}>
      {/* <Box sx={{ pt: 4, pb: 2, textAlign: "center" }}>
        <Typography
          variant="h4"
          fontWeight={700}
          color="primary"
          sx={{ letterSpacing: 1 }}
        >
          
        </Typography>
      </Box> */}

      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <ImageSlider />
      </Box>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          justifyContent:'center',
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
          padding: 3,
          borderRadius: 3,
          // width: "95%",
          margin: "auto",
          // background: "#FBF5DD",
        }}
      >
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          displayEmpty
          variant="outlined"
          size="small"
          fullWidth
          sx={filterStyles}
        >
          <MenuItem value="">Category</MenuItem>
          <MenuItem value="all">All Categories</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          displayEmpty
          variant="outlined"
          size="small"
          fullWidth
          sx={filterStyles}
        >
          <MenuItem value="">Location</MenuItem>
          <MenuItem value="all">All Locations</MenuItem>
          {locations.map((loc) => (
            <MenuItem key={loc} value={loc}>
              {loc}
            </MenuItem>
          ))}
        </Select>


        {/* <Select
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          displayEmpty
          variant="outlined"
          size="small"
          fullWidth
          sx={filterStyles}
        >
          <MenuItem value="">Business Name</MenuItem>
          <MenuItem value="all">All Businesses</MenuItem>
          {businessNames.map((bName) => (
            <MenuItem key={bName} value={bName}>
              {bName}
            </MenuItem>
          ))}
        </Select> */}

        <TextField
          variant="outlined"
          size="small"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            sx: filterStyles,
          }}
          fullWidth
        />
      </Paper>
      <Box sx={{ mt: 6  }}>
        <ServiceList
          search={search}
          category={category}
          location={location}
          businessName={businessName}
        />
      </Box>
    </Box>
  );
};

export default BodyPage;









// import { Box, TextField, InputAdornment, Select, MenuItem } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import ImageSlider from "./ImageSlider";
// import SearchIcon from "@mui/icons-material/Search";
// import ServiceList from "./ServiceList";
// import axios from "axios";

// const BodyPage = () => {
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [location, setLocation] = useState("");
//   const [businessName, setBusinessName] = useState("");

//   // const [services, setServices] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const [businessNames, setBusinessNames] = useState([]);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await axios.get("./services.json"); // Fetch JSON file
//         // setServices(response.data.services);

//         const uniqueCategories = [
//           ...new Set(response.data.services.map((s) => s.service)),
//         ];
//         const uniqueLocations = [
//           ...new Set(response.data.services.map((s) => s.contact.location)),
//         ];
//         const uniqueBusinessNames = [
//           ...new Set(response.data.services.map((s) => s.business_name)),
//         ];

//         setCategories(uniqueCategories);
//         setLocations(uniqueLocations);
//         setBusinessNames(uniqueBusinessNames);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       }
//     };

//     fetchServices();
//   }, []);

//   return (
//     <Box>
//       <Box sx={{ height: "20px",}} />
//       <Box sx={{display:'flex',justifyContent:'center' }}>
//         <ImageSlider />
//       </Box>

//       <Box
//         sx={{
//           padding: "10px",
//           display: "flex",
//           justifyContent: "center",
//           gap: 2,
//           borderRadius:'50px ',
//           marginBottom:'10px',
//           marginTop:'20px',
//           width:'95%',
//           margin:'auto'
//         }}
//       >
//         <Select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           displayEmpty
//           size="small"
//           sx={{
//             height: "40px",
//             '& .MuiOutlinedInput-notchedOutline': {
//               border: 'none',
//             },
//             backgroundColor: 'white' // optional for visual consistency
//           }}
//           >
//           <MenuItem value="">Category</MenuItem>
//           <MenuItem value="all">All Categories</MenuItem>
//           {categories.map((cat) => (
//             <MenuItem key={cat} value={cat}>
//               {cat}
//             </MenuItem>
//           ))}
//         </Select>

//         <Select
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           displayEmpty
//           size="small"
//           sx={{
//             height: "40px",
//             '& .MuiOutlinedInput-notchedOutline': {
//               border: 'none',
//             },
//             backgroundColor: 'white' // optional for visual consistency
//           }}
//         >
//           <MenuItem value="">Location</MenuItem>
//           <MenuItem value="all">All Locations</MenuItem>
//           {locations.map((loc) => (
//             <MenuItem key={loc} value={loc}>
//               {loc}
//             </MenuItem>
//           ))}
//         </Select>

//         <Select
//           value={businessName}
//           onChange={(e) => setBusinessName(e.target.value)}
//           displayEmpty
//           size="small"
//           sx={{
//             height: "40px",
//             '& .MuiOutlinedInput-notchedOutline': {
//               border: 'none',
//             },
//             backgroundColor: 'white' // optional for visual consistency
//           }}
//         >
//           <MenuItem value="">Business Name</MenuItem>
//           <MenuItem value="all">All Businesses</MenuItem>
//           {businessNames.map((bName) => (
//             <MenuItem key={bName} value={bName}>
//               {bName}
//             </MenuItem>
//           ))}
//         </Select>

//         <TextField 
//           variant="outlined"
//           size="small"
//           placeholder="Search services..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           sx={{
//             height: "40px",
//             '& .MuiOutlinedInput-notchedOutline': {
//               border: 'none',
//             },
//             backgroundColor: 'white' // optional for visual consistency
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>

//       <ServiceList
//         search={search}
//         category={category}
//         location={location}
//         businessName={businessName}
//       />
//     </Box>
//   );
// };

// export default BodyPage;



// import { Box, TextField, InputAdornment, Select, MenuItem } from '@mui/material';
// import React, { useState } from 'react';
// import ImageSlider from './ImageSlider';
// import SearchIcon from '@mui/icons-material/Search';
// import ServiceList from './ServiceList';
// const BodyPage = () => {
//   const [search, setSearch] = useState('');
//   const [category, setCategory] = useState('');
//   const [location, setLocation] = useState('');

//   return (
//     <Box>
//       <Box sx={{ height: '80px' }} />
//       <Box >
//         <ImageSlider />
//       </Box>
//       {/* height:'100vh',background: "linear-gradient(to right, #111, #b00000)", */}

//       <Box sx={{padding: '10px',height:"100px",display: 'flex', justifyContent: 'flex-end', gap: 2, }}>
//         <Select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           displayEmpty
//           size="small"sx={{border:'0px',height:"40px"}}
//         >
//           <MenuItem value="">Select Category</MenuItem>
//           <MenuItem value="plumbing">Plumbing</MenuItem>
//           <MenuItem value="electrical">Electrical</MenuItem>
//           <MenuItem value="cleaning">Cleaning</MenuItem>
//         </Select>
//         <Select
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           displayEmpty
//           size="small"
//         >
//           <MenuItem value="">Select Location</MenuItem>
//           <MenuItem value="new-york">New York</MenuItem>
//           <MenuItem value="los-angeles">Los Angeles</MenuItem>
//           <MenuItem value="chicago">Chicago</MenuItem>
//         </Select>
//         <TextField
//           variant="outlined"
//           size="small"
//           placeholder="Search services..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />

//       </Box>
//       <ServiceList/>
//     </Box>
//   );
// };

// export default BodyPage;

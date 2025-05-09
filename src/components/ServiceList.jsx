// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Card, CardContent, Typography, Grid, CircularProgress, Alert, Box, Stack,
//   Pagination, CardMedia, CardHeader, Avatar, IconButton, CardActions, Tooltip
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { Fade } from "@mui/material";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import PhoneIcon from "@mui/icons-material/Phone";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import ShareIcon from "@mui/icons-material/Share";
// import Rating from '@mui/material/Rating';

// const ServiceList = ({ search, category, location, businessName }) => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [wishlist, setWishlist] = useState({});
//   const itemsPerPage = 10;
//   const navigate = useNavigate();

//   const currentUserId = "user123"; // Replace with actual user context if available

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         // const response = await axios.get("./services.json");
//         const response = await axios.get("http://localhost:5000/services/"); 
//         setServices(response.data.services);
//       } catch (err) {
//         setError("Failed to fetch services.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchServices();
//   }, []);

//   const toggleWishlist = (id) => {
//     setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleShare = (service) => {
//     const shareData = {
//       title: service.business_name,
//       text: `${service.business_name} offers ${service.service}`,
//       url: window.location.origin + `/service/${service.id}`,
//     };
//     if (navigator.share) {
//       navigator.share(shareData).catch((err) => console.error("Share failed", err));
//     } else {
//       navigator.clipboard.writeText(shareData.url);
//       alert("Link copied!");
//     }
//   };

//   const filteredServices = services.filter((service) => {
//     const matchesSearch = search
//       ? service.service.toLowerCase().includes(search.toLowerCase()) ||
//         service.business_name.toLowerCase().includes(search.toLowerCase())
//       : true;
//     const matchesCategory = category && category !== "all" ? service.service === category : true;
//     const matchesLocation = location && location !== "all" ? service.contact.location === location : true;
//     const matchesBusiness = businessName && businessName !== "all" ? service.business_name === businessName : true;
//     return matchesSearch && matchesCategory && matchesLocation && matchesBusiness;
//   });

//   const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
//   const paginatedServices = filteredServices.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleRatingChange = async (serviceId, newValue) => {
//     try {
//       const updated = services.map((service) => {
//         if (service.id === serviceId) {
//           const existing = service.ratings?.find((r) => r.customerId === currentUserId);
//           if (existing) {
//             existing.value = newValue;
//           } else {
//             if (!service.ratings) service.ratings = [];
//             service.ratings.push({ customerId: currentUserId, value: newValue });
//           }
//         }
//         return service;
//       });
//       setServices(updated);

//       await axios.post("http://localhost:5000/services/ratings", {
//         serviceId,
//         customerId: currentUserId,
//         value: newValue,
//       });
//     } catch (error) {
//       console.error("Failed to save rating:", error);
//     }
//   };

//   if (loading) return <CircularProgress sx={{ m: "40px auto", display: "block" }} />;
//   if (error) return <Alert severity="error">{error}</Alert>;

//   return (
//     <Box sx={{ width: "95%", margin: "auto", pb: 4 }}>
//       <Typography variant="h4" textAlign="center" sx={{ pt: 3, fontWeight: 700 }}>
//         Explore Services Around You
//       </Typography>

//       {filteredServices.length === 0 ? (
//         <Typography variant="h6" textAlign="center" mt={4}>
//           No services found matching your criteria.
//         </Typography>
//       ) : (
//         <>
//           <Grid container spacing={3} mt={1}>
//             {paginatedServices.map((service) => {
//               const userRating = service.ratings?.find((r) => r.customerId === currentUserId)?.value || 0;
//               return (
//                 <Fade in={true} timeout={600} key={service.id}>
//                   <Grid item xs={12} sm={6} md={3}>
//                     <Card sx={{ maxWidth: 345, margin: "auto", boxShadow: 6, borderRadius: 4 }}>
//                       <CardHeader
//                         avatar={<Avatar sx={{ bgcolor: "#FF6201" }}>{service.business_name[0]}</Avatar>}
//                         title={service.business_name}
//                         subheader={service.service}
//                       />
//                       <CardMedia
//                         component="img"
//                         height="194"
//                         image={service.image || "https://via.placeholder.com/400x300"}
//                         alt={service.business_name}
//                       />
//                       <CardContent>
//                         <Typography variant="body2" color="text.secondary" gutterBottom>
//                           {service.description}
//                         </Typography>
//                         <Stack direction="row" spacing={1} alignItems="center" mb={1}>
//                           <LocationOnIcon fontSize="small" />
//                           <Typography variant="body2">{service.contact.location}</Typography>
//                         </Stack>
//                       </CardContent>

//                       <CardActions disableSpacing>
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', px: 1 }}>
//                           <Rating
//                             value={userRating}
//                             onChange={(e, newValue) => {
//                               e.stopPropagation();
//                               handleRatingChange(service.id, newValue);
//                             }}
//                           />
//                           <Box>
//                             <Tooltip title="Share">
//                               <IconButton onClick={(e) => { e.stopPropagation(); handleShare(service); }}>
//                                 <ShareIcon />
//                               </IconButton>
//                             </Tooltip>
//                             <Tooltip title="Add to Wishlist">
//                               <IconButton onClick={(e) => { e.stopPropagation(); toggleWishlist(service.id); }}>
//                                 {wishlist[service.id] ? <FavoriteIcon sx={{ color: "#e53935" }} /> : <FavoriteBorderIcon />}
//                               </IconButton>
//                             </Tooltip>
//                           </Box>
//                         </Box>
//                       </CardActions>
//                     </Card>
//                   </Grid>
//                 </Fade>
//               );
//             })}
//           </Grid>
//           <Box display="flex" justifyContent="center" mt={4}>
//             <Pagination count={totalPages} page={currentPage} onChange={(e, val) => setCurrentPage(val)} />
//           </Box>
//         </>
//       )}
//     </Box>
//   );
// };

// export default ServiceList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Box,
  Stack,
  Pagination,
  CardMedia,
  CardHeader,
  Avatar,
  IconButton,
  CardActions,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Fade } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import Rating from '@mui/material/Rating';

const ServiceList = ({ search, category, location, businessName }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState({});
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const [value, setValue] =useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("./services.json");
        setServices(response.data.services);
      } catch (err) {
        setError("Failed to fetch services. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = (service) => {
    const shareData = {
      title: service.business_name,
      text: `${service.business_name} offers ${service.service} in ${service.contact.location}`,
      url: window.location.origin + `/service/${service.id}`,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((err) =>
        console.error("Sharing failed:", err)
      );
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert("Link copied to clipboard!");
    }
  };

  const filteredServices = services.filter((service) => {
    const matchesSearch = search
      ? service.service.toLowerCase().includes(search.toLowerCase()) ||
        service.business_name.toLowerCase().includes(search.toLowerCase())
      : true;

    const matchesCategory =
      category && category !== "all" ? service.service === category : true;

    const matchesLocation =
      location && location !== "all"
        ? service.contact.location === location
        : true;

    const matchesBusiness =
      businessName && businessName !== "all"
        ? service.business_name === businessName
        : true;

    return (
      matchesSearch && matchesCategory && matchesLocation && matchesBusiness
    );
  });

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedServices = filteredServices.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading)
    return (
      <CircularProgress style={{ display: "block", margin: "40px auto" }} />
    );

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box
      sx={{
        // background: "#DDA853",
        width: "95%",
        margin: "auto",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(8px)",
        overflowX: "hidden",
        pb: 4,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        fontWeight={700}
        sx={{ color: "#2F3C7E", letterSpacing: 1.3, pt: 3 }}
      >
         Explore Services Around You
      </Typography>

      {filteredServices.length === 0 ? (
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          mt={4}
        >
          No services found matching your criteria.
        </Typography>
      ) : (
        <>
          <Grid container spacing={3} mt={1}>
            {paginatedServices.map((service) => (
              <Fade in={true} timeout={600} key={service.id}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      maxWidth: 345,
                      margin: "auto",
                      background: "#fff",
                      boxShadow: 6,
                      borderRadius: "20px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: "0 12px 35px rgba(0, 0, 0, 0.15)",
                      },
                    }}
                    onClick={() => navigate(`/service/${service.id}`)}
                  >
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: "#FF6201" }}>
                          {service.business_name[0]}
                        </Avatar>
                      }
                      title={service.business_name}
                      subheader={service.service}
                    />
                    <CardMedia
                      component="img"
                      height="194"
                      image={
                        service.image || "https://via.placeholder.com/400x300"
                      }
                      alt={service.business_name}
                      sx={{objectFit:'contain'}}
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {service.description}
                      </Typography>

                      <Stack
                        direction="row"
                        // spacing={1}
                        alignItems="center"
                        // mb={1}
                      >
                        <LocationOnIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.primary">
                          {service.contact.location}
                        </Typography>
                      </Stack>

                      {/* <Stack direction="row" spacing={1} alignItems="center">
                        <PhoneIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.primary">
                          {service.contact.phone}
                        </Typography>
                      </Stack> */}
                    </CardContent>

                    <CardActions disableSpacing>
                    <Box sx={{display:'flex',width:'300px',justifyContent:'space-between', alignItems:'center'}}>
                    <Tooltip>
                      <Rating
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      />
                        </Tooltip>
                      <Box>
                      <Tooltip title="Share">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(service);
                          }}
                        >
                          <ShareIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Add to Wishlist">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(service.id);
                          }}>
                          {wishlist[service.id] ? (
                            <FavoriteIcon sx={{ color: "#e53935" }} />
                          ) : (
                            <FavoriteBorderIcon />
                          )}
                        </IconButton>
                      </Tooltip>
                      </Box>
                      </Box>
                    </CardActions>
                  </Card>
                </Grid>
              </Fade>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              siblingCount={1}
              boundaryCount={1}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default ServiceList;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   CircularProgress,
//   Alert,
//   Box,
//   Stack,
//   Pagination,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { Fade } from "@mui/material";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import PhoneIcon from "@mui/icons-material/Phone";

// const ServiceList = ({ search, category, location, businessName }) => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await axios.get("./services.json");
//         setServices(response.data.services);
//       } catch (err) {
//         setError("Failed to fetch services. Please try again later.");
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchServices();
//   }, []);

//   const filteredServices = services.filter((service) => {
//     const matchesSearch = search
//       ? service.service.toLowerCase().includes(search.toLowerCase()) ||
//         service.business_name.toLowerCase().includes(search.toLowerCase())
//       : true;

//     const matchesCategory =
//       category && category !== "all" ? service.service === category : true;

//     const matchesLocation =
//       location && location !== "all"
//         ? service.contact.location === location
//         : true;

//     const matchesBusiness =
//       businessName && businessName !== "all"
//         ? service.business_name === businessName
//         : true;

//     return (
//       matchesSearch && matchesCategory && matchesLocation && matchesBusiness
//     );
//   });

//   const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const paginatedServices = filteredServices.slice(startIndex, endIndex);

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   if (loading)
//     return (
//       <CircularProgress style={{ display: "block", margin: "40px auto" }} />
//     );

//   if (error) return <Alert severity="error">{error}</Alert>;

//   return (
//     <Box
//       sx={{
//         // padding: 5,
//         background: "#DDA853",
//         // borderRadius: "28px",
//         width: "95%",
//         margin: "auto",
//         boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
//         backdropFilter: "blur(8px)",
//         overflowX: "hidden",
//       }}
//     >
//       <Typography
//         variant="h4"
//         gutterBottom
//         textAlign="center"
//         fontWeight={700}
//         sx={{ color: "#1976d2", letterSpacing: 1.3 }}
//       >
//         🔍 Explore Services Around You
//       </Typography>

//       {filteredServices.length === 0 ? (
//         <Typography
//           variant="h6"
//           color="text.secondary"
//           textAlign="center"
//           mt={4}
//         >
//           No services found matching your criteria.
//         </Typography>
//       ) : (
//         <>
//           <Grid container spacing={2} mt={3}>
//             {paginatedServices.map((service) => (
//               <Fade in={true} timeout={600} key={service.id}>
//                 <Grid item xs={12} md={6}>
//                   <Card
//                     sx={{
//                       display: "flex",
//                       flexDirection: { xs: "column", sm: "row" },
//                       background: "linear-gradient(120deg, #ffffff, #f1f8e9)",
//                       boxShadow: 6,
//                       borderRadius: "20px",
//                       cursor: "pointer",
//                       height: "250px",
//                       transition: "all 0.3s ease",
//                       "&:hover": {
//                         transform: "scale(1.03)",
//                         boxShadow: "0 12px 35px rgba(0, 0, 0, 0.15)",
//                       },
//                     }}
//                     onClick={() => navigate(`/service/${service.id}`)}
//                   >
//                     <Box sx={{}}>
//                     <Box
//                       sx={{
//                         width: { xs: "100%", sm: "40%",md:"50%" },
//                         height: { xs: 200, sm: 300 },
//                         backgroundImage: `url(${service.image || "https://via.placeholder.com/400x300"})`,
//                         backgroundSize:"contain",
//                         backgroundPosition: "center",
//                         backgroundRepeat: "no-repeat",
//                         // borderTopLeftRadius: "20px",
//                         // borderBottomLeftRadius: { sm: "20px", xs: 0 },
//                         // borderTopRightRadius: { xs: "20px", sm: 0 },
                        
//                       }}
//                     />
//                     </Box>
                    
//                     <CardContent
//                       sx={{
//                         width: { xs: "100%", sm: "60%" },
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "center",
//                         px: 3,
//                         py: 2,
//                       }}
//                     >
//                       <Typography
//                         variant="h6"
//                         gutterBottom
//                         sx={{ color: "#43a047", fontWeight: 700 }}
//                       >
//                         {service.business_name}
//                       </Typography>

//                       <Typography
//                         variant="subtitle1"
//                         color="text.secondary"
//                         gutterBottom
//                         sx={{ fontStyle: "italic" }}
//                       >
//                         {service.service}
//                       </Typography>

//                       <Typography
//                         variant="body2"
//                         sx={{ color: "#455a64", mb: 2, minHeight: "64px" }}
//                       >
//                         {service.description}
//                       </Typography>

//                       <Stack direction="row" spacing={1} alignItems="center" mb={1}>
//                         <LocationOnIcon fontSize="small" color="action" />
//                         <Typography variant="body2" color="text.primary">
//                           {service.contact.location}
//                         </Typography>
//                       </Stack>

//                       <Stack direction="row" spacing={1} alignItems="center">
//                         <PhoneIcon fontSize="small" color="action" />
//                         <Typography variant="body2" color="text.primary">
//                           {service.contact.phone}
//                         </Typography>
//                       </Stack>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               </Fade>
//             ))}
//           </Grid>

//           <Box display="flex" justifyContent="center" mt={4}>
//             <Pagination
//               count={totalPages}
//               page={currentPage}
//               onChange={handlePageChange}
//               color="primary"
//               shape="rounded"
//               siblingCount={1}
//               boundaryCount={1}
//             />
//           </Box>
//         </>
//       )}
//     </Box>
//   );
// };

// export default ServiceList;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   CircularProgress,
//   Alert,
//   Box,
//   Stack,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { Fade } from "@mui/material";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import PhoneIcon from "@mui/icons-material/Phone";

// const ServiceList = ({ search, category, location, businessName }) => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await axios.get("./services.json");
//         setServices(response.data.services);
//       } catch (err) {
//         setError("Failed to fetch services. Please try again later.");
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchServices();
//   }, []);

//   const filteredServices = services.filter((service) => {
//     const matchesSearch = search
//       ? service.service.toLowerCase().includes(search.toLowerCase()) ||
//         service.business_name.toLowerCase().includes(search.toLowerCase())
//       : true;

//     const matchesCategory =
//       category && category !== "all" ? service.service === category : true;

//     const matchesLocation =
//       location && location !== "all"
//         ? service.contact.location === location
//         : true;

//     const matchesBusiness =
//       businessName && businessName !== "all"
//         ? service.business_name === businessName
//         : true;

//     return (
//       matchesSearch && matchesCategory && matchesLocation && matchesBusiness
//     );
//   });

//   if (loading)
//     return (
//       <CircularProgress style={{ display: "block", margin: "40px auto" }} />
//     );

//   if (error) return <Alert severity="error">{error}</Alert>;

//   return (
//     <Box
//       sx={{
//         padding: 5,
//         // background: "linear-gradient(145deg,rgb(208, 233, 252), #fce4ec)",
//         background:'#DDA853',
//         borderRadius: "28px",
//         width: "90%",
//         margin: "auto",
//         boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
//         backdropFilter: "blur(8px)",
//         overflowX: "hidden",
//       }}
//     >
//       <Typography
//         variant="h4"
//         gutterBottom
//         textAlign="center"
//         fontWeight={700}
//         sx={{ color: "#1976d2", letterSpacing: 1.3 }}
//       >
//         🔍 Explore Services Around You
//       </Typography>

//       {filteredServices.length === 0 ? (
//         <Typography
//           variant="h6"
//           color="text.secondary"
//           textAlign="center"
//           mt={4}
//         >
//           No services found matching your criteria.
//         </Typography>
//       ) : (
//         <Grid container spacing={2} mt={3}>
//           {filteredServices.map((service) => (
//             <Fade in={true} timeout={600} key={service.id}>
//               <Grid item xs={12} md={6}>
//                 <Card
//                   sx={{
//                     display: "flex",
//                     flexDirection: { xs: "column", sm: "row" },
//                     background: "linear-gradient(120deg, #ffffff, #f1f8e9)",
//                     boxShadow: 6,
//                     borderRadius: "20px",
//                     cursor: "pointer",
//                     height:'300px',
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       transform: "scale(1.03)",
//                       boxShadow: "0 12px 35px rgba(0, 0, 0, 0.15)",
//                     },
//                   }}
//                   onClick={() => navigate(`/service/${service.id}`)}
//                 >
//                   {/* Left: Image */}
//                   <Box
//                      sx={{
//                       width: { xs: "100%", sm: "40%" },
//                       height: { xs: 200, sm: 300 }, // Match the Card height on larger screens
//                       backgroundImage: `url(${service.image || "https://via.placeholder.com/400x300"})`,
//                       backgroundSize: "contain",
//                       backgroundPosition: "center",
//                       backgroundRepeat: "no-repeat",
//                       borderTopLeftRadius: "20px",
//                       borderBottomLeftRadius: { sm: "20px", xs: 0 },
//                       borderTopRightRadius: { xs: "20px", sm: 0 },
//                     }}
//                   />

//                   {/* Right: Text Content */}
//                   <CardContent
//                     sx={{
//                       width: { xs: "100%", sm: "60%" },
//                       display: "flex",
//                       flexDirection: "column",
//                       justifyContent: "center",
//                       px: 3,
//                       py: 2,
//                     }}
//                   >
//                     <Typography
//                       variant="h6"
//                       gutterBottom
//                       sx={{ color: "#43a047", fontWeight: 700 }}
//                     >
//                       {service.business_name}
//                     </Typography>

//                     <Typography
//                       variant="subtitle1"
//                       color="text.secondary"
//                       gutterBottom
//                       sx={{ fontStyle: "italic" }}
//                     >
//                       {service.service}
//                     </Typography>

//                     <Typography
//                       variant="body2"
//                       sx={{ color: "#455a64", mb: 2, minHeight: "64px" }}
//                     >
//                       {service.description}
//                     </Typography>

//                     <Stack direction="row" spacing={1} alignItems="center" mb={1}>
//                       <LocationOnIcon fontSize="small" color="action" />
//                       <Typography variant="body2" color="text.primary">
//                         {service.contact.location}
//                       </Typography>
//                     </Stack>

//                     <Stack direction="row" spacing={1} alignItems="center">
//                       <PhoneIcon fontSize="small" color="action" />
//                       <Typography variant="body2" color="text.primary">
//                         {service.contact.phone}
//                       </Typography>
//                     </Stack>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             </Fade>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default ServiceList;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   CircularProgress,
//   Alert,
//   Box,
//   Stack,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { Fade } from "@mui/material";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import PhoneIcon from "@mui/icons-material/Phone";

// const ServiceList = ({ search, category, location, businessName }) => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await axios.get("./services.json");
//         setServices(response.data.services);
//       } catch (err) {
//         setError("Failed to fetch services. Please try again later.");
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchServices();
//   }, []);

//   const filteredServices = services.filter((service) => {
//     const matchesSearch = search
//       ? service.service.toLowerCase().includes(search.toLowerCase()) ||
//         service.business_name.toLowerCase().includes(search.toLowerCase())
//       : true;

//     const matchesCategory =
//       category && category !== "all" ? service.service === category : true;

//     const matchesLocation =
//       location && location !== "all"
//         ? service.contact.location === location
//         : true;

//     const matchesBusiness =
//       businessName && businessName !== "all"
//         ? service.business_name === businessName
//         : true;

//     return (
//       matchesSearch && matchesCategory && matchesLocation && matchesBusiness
//     );
//   });

//   if (loading)
//     return (
//       <CircularProgress style={{ display: "block", margin: "40px auto" }} />
//     );

//   if (error) return <Alert severity="error">{error}</Alert>;

//   return (
//     <Box
//       sx={{
//         padding: 5,
//         background: "linear-gradient(145deg,rgb(208, 233, 252), #fce4ec)",
//         borderRadius: "28px",
//         width: "90%",
//         margin: "auto",
//         boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
//         backdropFilter: "blur(8px)",
//         overflowX: "hidden", 
//       }}
//     >
//       <Typography
//         variant="h4"
//         gutterBottom
//         textAlign="center"
//         fontWeight={700}
//         sx={{ color: "#1976d2", letterSpacing: 1.3 }}
//       >
//         🔍 Explore Services Around You
//       </Typography>

//       {filteredServices.length === 0 ? (
//         <Typography
//           variant="h6"
//           color="text.secondary"
//           textAlign="center"
//           mt={4}
//         >
//           No services found matching your criteria.
//         </Typography>
//       ) : (
//         <Grid container spacing={2} mt={3}>
//           {filteredServices.map((service) => (
//             <Fade in={true} timeout={600} key={service.id}>
//               <Grid item xs={12} sm={6} md={12}>
//                 <Card
//                   sx={{
//                     background: "linear-gradient(120deg, #ffffff, #f1f8e9)",
//                     boxShadow: 6,
//                     borderRadius: "20px",
//                     cursor: "pointer",
//                     height: "100%",
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       transform: "scale(1.03)",
//                       boxShadow: "0 12px 35px rgba(0, 0, 0, 0.15)",
//                     },
//                   }}
//                   onClick={() => navigate(`/service/${service.id}`)}
//                 >
//                   <CardContent sx={{ px: 3, py: 4 }}>
//                     <Typography
//                       variant="h6"
//                       gutterBottom
//                       textAlign="center"
//                       sx={{ color: "#43a047", fontWeight: 700 }}
//                     >
//                       {service.business_name}
//                     </Typography>

//                     <Typography
//                       variant="subtitle1"
//                       color="text.secondary"
//                       textAlign="center"
//                       gutterBottom
//                       sx={{ fontStyle: "italic" }}
//                     >
//                       {service.service}
//                     </Typography>

//                     <Typography
//                       variant="body2"
//                       sx={{ color: "#455a64", my: 2, minHeight: "64px" }}
//                       textAlign="center"
//                     >
//                       {service.description}
//                     </Typography>

//                     <Stack
//                       direction="row"
//                       spacing={1}
//                       alignItems="center"
//                       justifyContent="center"
//                       mt={2}
//                     >
//                       <LocationOnIcon fontSize="small" color="action" />
//                       <Typography variant="body2" color="text.primary">
//                         {service.contact.location}
//                       </Typography>
//                     </Stack>

//                     <Stack
//                       direction="row"
//                       spacing={1}
//                       alignItems="center"
//                       justifyContent="center"
//                       mt={1}
//                     >
//                       <PhoneIcon fontSize="small" color="action" />
//                       <Typography variant="body2" color="text.primary">
//                         {service.contact.phone}
//                       </Typography>
//                     </Stack>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             </Fade>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default ServiceList;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   CircularProgress,
//   Alert,
//   Box,
//   Stack,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { Fade } from "@mui/material";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import PhoneIcon from "@mui/icons-material/Phone";

// const ServiceList = ({ search, category, location, businessName }) => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await axios.get("./services.json");
//         setServices(response.data.services);
//       } catch (err) {
//         setError("Failed to fetch services. Please try again later.");
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchServices();
//   }, []);

//   const filteredServices = services.filter((service) => {
//     const matchesSearch = search
//       ? service.service.toLowerCase().includes(search.toLowerCase()) ||
//         service.business_name.toLowerCase().includes(search.toLowerCase())
//       : true;

//     const matchesCategory =
//       category && category !== "all" ? service.service === category : true;

//     const matchesLocation =
//       location && location !== "all"
//         ? service.contact.location === location
//         : true;

//     const matchesBusiness =
//       businessName && businessName !== "all"
//         ? service.business_name === businessName
//         : true;

//     return (
//       matchesSearch && matchesCategory && matchesLocation && matchesBusiness
//     );
//   });

//   if (loading)
//     return (
//       <CircularProgress style={{ display: "block", margin: "40px auto" }} />
//     );

//   if (error) return <Alert severity="error">{error}</Alert>;

//   return (
//     <Box
//       sx={{
//         // padding: 5,
//         background: "linear-gradient(145deg,rgb(100, 149, 184), #fce4ec)",
//         borderRadius: "28px",
//         width: "100%",
//         margin: "auto",
//         boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
//         backdropFilter: "blur(8px)",
//         overflowX: "hidden", 
//       }}
//     >
//       <Typography
//         variant="h4"
//         gutterBottom
//         textAlign="center"
//         fontWeight={700}
//         sx={{ color: "#1976d2", letterSpacing: 1.3 }}
//       >
//         🔍 Explore Services Around You
//       </Typography>

//       {filteredServices.length === 0 ? (
//         <Typography
//           variant="h6"
//           color="text.secondary"
//           textAlign="center"
//           mt={4}
//         >
//           No services found matching your criteria.
//         </Typography>
//       ) : (
//         <Grid container spacing={2} mt={3}>
//           {filteredServices.map((service) => (
//             <Fade in={true} timeout={600} key={service.id}>
//               <Grid item xs={12} sm={6} md={4}>
//                 <Card
//                   sx={{
//                     background: "linear-gradient(120deg, #ffffff, #f1f8e9)",
//                     boxShadow: 6,
//                     borderRadius: "20px",
//                     cursor: "pointer",
//                     height: "100%",
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       transform: "scale(1.03)",
//                       boxShadow: "0 12px 35px rgba(0, 0, 0, 0.15)",
//                     },
//                   }}
//                   onClick={() => navigate(`/service/${service.id}`)}
//                 >
//                   <CardContent sx={{ px: 3, py: 4 }}>
//                     <Typography
//                       variant="h6"
//                       gutterBottom
//                       textAlign="center"
//                       sx={{ color: "#43a047", fontWeight: 700 }}
//                     >
//                       {service.business_name}
//                     </Typography>

//                     <Typography
//                       variant="subtitle1"
//                       color="text.secondary"
//                       textAlign="center"
//                       gutterBottom
//                       sx={{ fontStyle: "italic" }}
//                     >
//                       {service.service}
//                     </Typography>

//                     <Typography
//                       variant="body2"
//                       sx={{ color: "#455a64", my: 2, minHeight: "64px" }}
//                       textAlign="center"
//                     >
//                       {service.description}
//                     </Typography>

//                     <Stack
//                       direction="row"
//                       spacing={1}
//                       alignItems="center"
//                       justifyContent="center"
//                       mt={2}
//                     >
//                       <LocationOnIcon fontSize="small" color="action" />
//                       <Typography variant="body2" color="text.primary">
//                         {service.contact.location}
//                       </Typography>
//                     </Stack>

//                     <Stack
//                       direction="row"
//                       spacing={1}
//                       alignItems="center"
//                       justifyContent="center"
//                       mt={1}
//                     >
//                       <PhoneIcon fontSize="small" color="action" />
//                       <Typography variant="body2" color="text.primary">
//                         {service.contact.phone}
//                       </Typography>
//                     </Stack>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             </Fade>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default ServiceList;





// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   CircularProgress,
//   Alert,
//   Box,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { Fade } from "@mui/material";

// const ServiceList = ({ search, category, location, businessName }) => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await axios.get("./services.json");
//         setServices(response.data.services);
//       } catch (err) {
//         setError("Failed to fetch services. Please try again later.");
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchServices();
//   }, []);

//   const filteredServices = services.filter((service) => {
//     const matchesSearch = search
//       ? service.service.toLowerCase().includes(search.toLowerCase()) ||
//         service.business_name.toLowerCase().includes(search.toLowerCase())
//       : true;

//     const matchesCategory =
//       category && category !== "all" ? service.service === category : true;

//     const matchesLocation =
//       location && location !== "all"
//         ? service.contact.location === location
//         : true;

//     const matchesBusiness =
//       businessName && businessName !== "all"
//         ? service.business_name === businessName
//         : true;

//     return (
//       matchesSearch && matchesCategory && matchesLocation && matchesBusiness
//     );
//   });

//   if (loading)
//     return (
//       <CircularProgress style={{ display: "block", margin: "20px auto" }} />
//     );

//   if (error) return <Alert severity="error">{error}</Alert>;

//   return (
//     <Box
//       sx={{
//         padding: 4,
//         background: "linear-gradient(145deg, #e3f2fd, #fce4ec)",
//         borderRadius: "24px",
//         width: "96%",
//         margin: "auto",
//         boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
//         backdropFilter: "blur(6px)",
//       }}
//     >
//       <Typography
//         variant="h4"
//         gutterBottom
//         textAlign="center"
//         fontWeight={700}
//         sx={{ color: "#1e88e5", letterSpacing: 1.2 }}
//       >
//         Explore Services
//       </Typography>

//       {filteredServices.length === 0 ? (
//         <Typography
//           variant="h6"
//           color="text.secondary"
//           textAlign="center"
//           mt={4}
//         >
//           No services found matching your criteria.
//         </Typography>
//       ) : (
//         <Grid container spacing={4} mt={3}>
//           {filteredServices.map((service) => (
//             <Fade in={true} timeout={600} key={service.id}>
//               <Grid item xs={12} sm={6} md={6}>
//                 <Card
//                   sx={{
//                     background: "linear-gradient(120deg, #ffffff, #f1f8e9)",
//                     boxShadow: 6,
//                     height: "auto",
//                     borderRadius: "18px",
//                     cursor: "pointer",
//                     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                     "&:hover": {
//                       transform: "scale(1.05)",
//                       boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
//                     },
//                   }}
//                   onClick={() => navigate(`/service/${service.id}`)}
//                 >
//                   <CardContent sx={{ textAlign: "center", px: 3, py: 4 }}>
//                     <Typography
//                       variant="h6"
//                       gutterBottom
//                       sx={{ color: "#4caf50", fontWeight: 700 }}
//                     >
//                       {service.business_name}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       fontStyle="italic"
//                       gutterBottom
//                     >
//                       {service.service}
//                     </Typography>

//                     <Typography
//                       variant="body1"
//                       sx={{ my: 2, color: "#37474f" }}
//                     >
//                       {service.description}
//                     </Typography>
//                     <Typography
//                       variant="subtitle2"
//                       color="text.primary"
//                     >
//                       📍 {service.contact.location}
//                     </Typography>
//                     <Typography
//                       variant="subtitle2"
//                       color="text.primary"
//                     >
//                       📞 {service.contact.phone}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             </Fade>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default ServiceList;





// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   CircularProgress,
//   Alert,
//   Box,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { Fade } from "@mui/material";

// const ServiceList = ({ search, category, location, businessName }) => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await axios.get("./services.json");
//         setServices(response.data.services);
//       } catch (err) {
//         setError("Failed to fetch services. Please try again later.");
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchServices();
//   }, []);

//   const filteredServices = services.filter((service) => {
//     const matchesSearch = search
//       ? service.service.toLowerCase().includes(search.toLowerCase()) ||
//         service.business_name.toLowerCase().includes(search.toLowerCase())
//       : true;

//     const matchesCategory =
//       category && category !== "all" ? service.service === category : true;

//     const matchesLocation =
//       location && location !== "all"
//         ? service.contact.location === location
//         : true;

//     const matchesBusiness =
//       businessName && businessName !== "all"
//         ? service.business_name === businessName
//         : true;

//     return (
//       matchesSearch && matchesCategory && matchesLocation && matchesBusiness
//     );
//   });

//   if (loading)
//     return (
//       <CircularProgress style={{ display: "block", margin: "20px auto" }} />
//     );

//   if (error) return <Alert severity="error">{error}</Alert>;

//   return (
//     <Box
//       sx={{
//         padding: "20px",
//         background: "rgb(228,241,234)",
//         borderRadius: "20px",
//         width: "95%",
//         margin: "auto",
//       }}
//     >
//       <Typography variant="h4" gutterBottom textAlign={"center"}>
//          Services
//       </Typography>

//       {filteredServices.length === 0 ? (
//         <Typography
//           variant="h6"
//           color="text.secondary"
//           textAlign="center"
//           mt={4}
//         >
//           No services found matching your criteria.
//         </Typography>
//       ) : (
//         <Grid container spacing={3}>
//           {filteredServices.map((service) => (
//             <Fade in={true} timeout={600}>
//             <Grid item xs={12} sm={6} md={6} key={service.id}>
//               <Card
//                   sx={{
//                     backgroundColor: "#f9f9f9", // light gray
//                     boxShadow: 3,
//                     height: "250px",
//                     borderRadius: "12px",
//                     cursor: "pointer",
//                     transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
//                     "&:hover": {
//                       transform: "scale(1.03)",
//                       backgroundColor: "#e0f7fa", // light teal on hover
//                       boxShadow: 6,
//                     },
//                   }}
//                   onClick={() => navigate(`/service/${service.id}`)}
//                 >


//                 <CardContent sx={{ textAlign: "center" }}>
//                 <Typography variant="h6" gutterBottom sx={{ color: "#d32f2f", fontWeight: 600 }}>
//                   {service.business_name}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" fontStyle="italic">
//                   {service.service}
//                 </Typography>

//                   <Typography variant="body1" paragraph>
//                     {service.description}
//                   </Typography>
//                   <Typography variant="subtitle2" color="text.primary">
//                     📍 {service.contact.location}
//                   </Typography>
//                   <Typography variant="subtitle2" color="text.primary">
//                     📞 {service.contact.phone}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             </Fade>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default ServiceList;

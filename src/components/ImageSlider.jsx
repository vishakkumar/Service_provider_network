import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Box, Typography, CircularProgress } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";

const ImageSlider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null);     // error state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/add");
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load slider data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress sx={{ color: "#FBA518" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", height: "80vh" }}>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        style={{ width: "100%", height: "100%" }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                backgroundImage: `url(${product.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                px: { xs: 3, sm: 6 },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))",
                  zIndex: 1,
                }}
              />
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  color: "#fff",
                  maxWidth: { xs: "100%", sm: "60%" },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    fontWeight: 700,
                    color: "#FBA518",
                    mb: 1,
                  }}
                >
                  {/* {product.business_name} */}
                </Typography>

                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    fontFamily: `'Orbitron', sans-serif`,
                    lineHeight: 1.2,
                    mb: 2,
                    textShadow: "0px 2px 10px #000",
                  }}
                >
                  {product.service}
                </Typography>

                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "1.1rem",
                    opacity: 0.9,
                    lineHeight: 1.7,
                    mb: 3,
                  }}
                >
                  {product.description}
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ImageSlider;



// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import { Box, Typography, CircularProgress } from "@mui/material";
// import "swiper/css";
// import "swiper/css/pagination";

// // import sliderData from "http://localhost:3000/add"

// const ImageSlider = () => {
//   const [products, setProducts] = useState([]);

//   // console.log(sliderData)

// useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/add");
//         setProducts(response.data);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to load slider data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <Box sx={{ width: "100%", height: "80vh" ,}}>
//       {products.length ? (
//         <Swiper
//           modules={[Autoplay, Pagination]}
//           spaceBetween={0}
//           slidesPerView={1}
//           autoplay={{ delay: 4000, disableOnInteraction: false }}
//           pagination={{ clickable: true }}
//           loop
//           style={{ width: "100%", height: "100%" }}
//         >
//           {products.map((product, index) => (
//             <SwiperSlide key={index}>
//               <Box
//                 sx={{
//                   position: "relative",
//                   width: "100%",
//                   height: "100%",
//                   backgroundImage: `url(${product.image})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "flex-start",
//                   px: { xs: 3, sm: 6 },
//                 }}
//               >
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: "100%",
//                     height: "100%",
//                     background:
//                       "linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))",
//                     zIndex: 1,
//                   }}
//                 />
//                 <Box
//                   sx={{
//                     position: "relative",
//                     zIndex: 2,
//                     color: "#fff",
//                     maxWidth: { xs: "100%", sm: "60%" },
//                   }}
//                 >
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       textTransform: "uppercase",
//                       letterSpacing: 1,
//                       fontWeight: 700,
//                       color: "#FBA518",
//                       mb: 1,
//                     }}
//                   >
//                     {/* {product.business_name} */}
//                   </Typography>

//                   <Typography
//                     variant="h3"
//                     sx={{
//                       fontWeight: 800,
//                       fontFamily: `'Orbitron', sans-serif`,
//                       lineHeight: 1.2,
//                       mb: 2,
//                       textShadow: "0px 2px 10px #000",
//                     }}
//                   >
//                     {product.service}
//                   </Typography>

//                   <Typography
//                     variant="body1"
//                     sx={{
//                       fontSize: "1.1rem",
//                       opacity: 0.9,
//                       lineHeight: 1.7,
//                       mb: 3,
//                     }}
//                   >
//                     {product.discription}
//                   </Typography>
//                 </Box>
//               </Box>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       ) : (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100vh",
//           }}
//         >
//           <CircularProgress sx={{ color: "#FBA518" }} />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default ImageSlider;



// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import { Box, Typography, CircularProgress } from "@mui/material";
// import "swiper/css";
// import "swiper/css/pagination";

// const ImageSlider = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const data = [
//         {
//           service: "Electrician",
//           business_name: "Voltify Sparks",
//           discription:
//             "High-quality electrical repairs & installations with certified experts. Power your space safely.",
//           image:
//             "https://www.automationroboticscollege.com/wp-content/uploads/2023/04/Electrical-Technician-India-min.jpg",
//         },
//         {
//           service: "Photography",
//           business_name: "Pixel Prism",
//           discription:
//             "Capture memories in style. Events, portraits & creative photography with a cinematic flair.",
//           image:
//             "https://th.bing.com/th/id/OLC.y2HOxfJe0alQ6g480x360?&rs=1&pid=ImgDetMain",
//         },
//         {
//           service: "Computer Service",
//           business_name: "TechNova",
//           discription:
//             "Fast computer repairs, upgrades & virus removal. Your digital systems, optimized.",
//           image:
//             "https://miro.medium.com/v2/resize:fit:509/1*wIDCd0nN3SFiPo2miQ0f7w.jpeg",
//         },
//         {
//           service: "Plumbing",
//           business_name: "HydroFix",
//           discription:
//             "Leak-free plumbing solutions, installations, and maintenance with modern tools & skilled hands.",
//           image:
//             "https://thumbs.dreamstime.com/b/handyman-repairing-faucet-sink-bathroom-maintenance-household-assistance-concept-close-up-indian-plumber-264239059.jpg",
//         },
//       ];
//       await new Promise((res) => setTimeout(res, 700));
//       setProducts(data);
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <Box sx={{ width: "100vw", height: "100vh" }}>
//       {products.length ? (
//         <Swiper
//           modules={[Autoplay, Pagination]}
//           spaceBetween={0}
//           slidesPerView={1}
//           autoplay={{ delay: 4000, disableOnInteraction: false }}
//           pagination={{ clickable: true }}
//           loop
//           style={{ width: "100%", height: "100%" }}
//         >
//           {products.map((product, index) => (
//             <SwiperSlide key={index}>
//               <Box
//                 sx={{
//                   position: "relative",
//                   width: "100%",
//                   height: "100%",
//                   backgroundImage: `url(${product.image})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "flex-start",
//                   px: { xs: 3, sm: 6 },
//                 }}
//               >
//                 {/* Dark Overlay */}
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: "100%",
//                     height: "100%",
//                     background:
//                       "linear-gradient(to right, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.4))",
//                     zIndex: 1,
//                   }}
//                 />

//                 {/* Text Content */}
//                 <Box
//                   sx={{
//                     position: "relative",
//                     zIndex: 2,
//                     color: "#fff",
//                     maxWidth: { xs: "100%", sm: "60%" },
//                   }}
//                 >
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       textTransform: "uppercase",
//                       letterSpacing: 1,
//                       fontWeight: 700,
//                       color: "#FBA518",
//                       mb: 1,
//                     }}
//                   >
//                     {product.business_name}
//                   </Typography>

//                   <Typography
//                     variant="h3"
//                     sx={{
//                       fontWeight: 800,
//                       fontFamily: `'Orbitron', sans-serif`,
//                       lineHeight: 1.2,
//                       mb: 2,
//                       textShadow: "0px 2px 10px #000",
//                     }}
//                   >
//                     {product.service}
//                   </Typography>

//                   <Typography
//                     variant="body1"
//                     sx={{
//                       fontSize: "1.1rem",
//                       opacity: 0.9,
//                       lineHeight: 1.7,
//                       mb: 3,
//                     }}
//                   >
//                     {product.discription}
//                   </Typography>
//                 </Box>
//               </Box>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       ) : (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "100vh",
//           }}
//         >
//           <CircularProgress sx={{ color: "#FBA518" }} />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default ImageSlider;





// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   CircularProgress,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import "swiper/css";
// import "swiper/css/pagination";

// const MotionGrid = motion(Grid);

// const ImageSlider = () => {
//   const [products, setProducts] = useState([]);
 
 

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const data = [
//         {
//           service: "Electrician",
//           business_name: "Voltify Sparks",
//           discription:
//             "High-quality electrical repairs & installations with certified experts. Power your space safely.",
//           image:
//             "https://www.automationroboticscollege.com/wp-content/uploads/2023/04/Electrical-Technician-India-min.jpg",
//         },
//         {
//           service: "Photography",
//           business_name: "Pixel Prism",
//           discription:
//             "Capture memories in style. Events, portraits & creative photography with a cinematic flair.",
//           image:
//             "https://th.bing.com/th/id/OLC.y2HOxfJe0alQ6g480x360?&rs=1&pid=ImgDetMain",
//         },
//         {
//           service: "Computer Service",
//           business_name: "TechNova",
//           discription:
//             "Fast computer repairs, upgrades & virus removal. Your digital systems, optimized.",
//           image:
//             "https://miro.medium.com/v2/resize:fit:509/1*wIDCd0nN3SFiPo2miQ0f7w.jpeg",
//         },
//         {
//           service: "Plumbing",
//           business_name: "HydroFix",
//           discription:
//             "Leak-free plumbing solutions, installations, and maintenance with modern tools & skilled hands.",
//           image:
//             "https://thumbs.dreamstime.com/b/handyman-repairing-faucet-sink-bathroom-maintenance-household-assistance-concept-close-up-indian-plumber-264239059.jpg",
//         },
//       ];
//       await new Promise((res) => setTimeout(res, 700));
//       setProducts(data);
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", px: 2, py: 2 }}>
//       {products.length ? (
//         <Swiper
//           modules={[Autoplay, Pagination]}
//           spaceBetween={30}
//           slidesPerView={1}
//           autoplay={{ delay: 4000, disableOnInteraction: false }}
//           pagination={{ clickable: true }}
//           loop
//         >
//           {products.map((product, index) => (
//            <SwiperSlide key={index}>
//            <Box
//              sx={{
//                position: "relative",
//                minHeight: 400,
//                borderRadius: 6,
//                overflow: "hidden",
//                backgroundImage: `url(${product.image})`,
//                backgroundSize: "cover",
//                backgroundPosition: "center",
//                display: "flex",
//                alignItems: "center",
//                justifyContent: "flex-start",
//                p: { xs: 3, sm: 6 },
//              }}
//            >
//              {/* Dark overlay */}
//              <Box
//                sx={{
//                  position: "absolute",
//                  top: 0,
//                  left: 0,
//                  width: "100%",
//                  height: "100%",
//                  background:
//                    "linear-gradient(to right, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.4))",
//                  zIndex: 1,
//                }}
//              />
         
//              {/* Text content */}
//              <Box
//                sx={{
//                  position: "relative",
//                  zIndex: 2,
//                  p: 4,
//                  borderRadius: 4,
//                  color: "#fff",
//                  maxWidth: { xs: "100%", sm: "60%" },
//                }}
//              >
//                <Typography
//                  variant="h6"
//                  sx={{
//                    textTransform: "uppercase",
//                    letterSpacing: 1,
//                    fontWeight: 700,
//                    color: "#FBA518",
//                    mb: 1,
//                  }}
//                >
//                  {product.business_name}
//                </Typography>
         
//                <Typography
//                  variant="h3"
//                  sx={{
//                    fontWeight: 800,
//                    fontFamily: `'Orbitron', sans-serif`,
//                    lineHeight: 1.2,
//                    mb: 2,
//                    textShadow: "0px 2px 10px #000",
//                  }}
//                >
//                  {product.service}
//                </Typography>
         
//                <Typography
//                  variant="body1"
//                  sx={{
//                    fontSize: "1.1rem",
//                    opacity: 0.9,
//                    lineHeight: 1.7,
//                    mb: 3,
//                  }}
//                >
//                  {product.discription}
//                </Typography>
//              </Box>
//            </Box>
//          </SwiperSlide>
//           ))}
//         </Swiper>
//       ) : (
//         <Box sx={{ display: "flex", justifyContent: "center", height: 350 }}>
//           <CircularProgress sx={{ color: "#FBA518" }} />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default ImageSlider;




// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   CircularProgress,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import "swiper/css";
// import "swiper/css/pagination";

// const MotionGrid = motion(Grid);

// const ImageSlider = () => {
//   const [products, setProducts] = useState([]);
 
 

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const data = [
//         {
//           service: "Electrician",
//           business_name: "Voltify Sparks",
//           discription:
//             "High-quality electrical repairs & installations with certified experts. Power your space safely.",
//           image:
//             "https://www.automationroboticscollege.com/wp-content/uploads/2023/04/Electrical-Technician-India-min.jpg",
//         },
//         {
//           service: "Photography",
//           business_name: "Pixel Prism",
//           discription:
//             "Capture memories in style. Events, portraits & creative photography with a cinematic flair.",
//           image:
//             "https://th.bing.com/th/id/OLC.y2HOxfJe0alQ6g480x360?&rs=1&pid=ImgDetMain",
//         },
//         {
//           service: "Computer Service",
//           business_name: "TechNova",
//           discription:
//             "Fast computer repairs, upgrades & virus removal. Your digital systems, optimized.",
//           image:
//             "https://miro.medium.com/v2/resize:fit:509/1*wIDCd0nN3SFiPo2miQ0f7w.jpeg",
//         },
//         {
//           service: "Plumbing",
//           business_name: "HydroFix",
//           discription:
//             "Leak-free plumbing solutions, installations, and maintenance with modern tools & skilled hands.",
//           image:
//             "https://thumbs.dreamstime.com/b/handyman-repairing-faucet-sink-bathroom-maintenance-household-assistance-concept-close-up-indian-plumber-264239059.jpg",
//         },
//       ];
//       await new Promise((res) => setTimeout(res, 700));
//       setProducts(data);
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", px: 2, py: 2 }}>
//       {products.length ? (
//         <Swiper
//           modules={[Autoplay, Pagination]}
//           spaceBetween={30}
//           slidesPerView={1}
//           autoplay={{ delay: 4000, disableOnInteraction: false }}
//           pagination={{ clickable: true }}
//           loop
//         >
//           {products.map((product, index) => (
//             <SwiperSlide key={index}>
//               <MotionGrid
//                 container
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, ease: "easeOut" }}
//                 sx={{
//                   minHeight: 400,
//                   borderRadius: 6,
//                   overflow: "hidden",
//                   backdropFilter: "blur(20px)",
//                   background: "linear-gradient(135deg, rgba(0,0,0,0.6), rgba(40,40,40,0.9))",
//                   // boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
//                 }}
//               >
//                 <Grid
//                   item
//                   xs={12}
//                   md={6}
//                   sx={{
//                     p: 4,
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     color: "white",
//                   }}
//                 >
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       textTransform: "uppercase",
//                       letterSpacing: 1,
//                       fontWeight: 700,
//                       color: "#FBA518",
//                       mb: 1,
//                     }}
//                   >
//                     {/* {product.business_name} */}
//                   </Typography>

//                   <Typography
//                     variant="h3"
//                     sx={{
//                       fontWeight: 800,
//                       fontFamily: `'Orbitron', sans-serif`,
//                       lineHeight: 1.2,
//                       mb: 2,
//                       textShadow: "0px 2px 10px #000",
//                     }}
//                   >
//                     {product.service}
//                   </Typography>

//                   <Typography
//                     variant="body1"
//                     sx={{
//                       fontSize: "1.1rem",
//                       opacity: 0.9,
//                       lineHeight: 1.7,
//                       mb: 3,
//                       maxWidth: "90%",
//                     }}
//                   >
//                     {product.discription}
//                   </Typography>

//                   {/* <Button
//                     variant="contained"
//                     size="large"
//                     sx={{
//                       width: "fit-content",
//                       background: "linear-gradient(45deg, #ff512f, #dd2476)",
//                       color: "#fff",
//                       px: 4,
//                       py: 1.2,
//                       borderRadius: "30px",
//                       fontWeight: 600,
//                       textTransform: "none",
//                       boxShadow: "0 0 10px #ff4c4c",
//                       transition: "0.4s",
//                       "&:hover": {
//                         transform: "scale(1.05)",
//                         boxShadow: "0 0 20px #ff4c4c",
//                       },
//                     }}
//                   >
//                     Explore Service
//                   </Button> */}
//                 </Grid>

//                 <Grid item xs={12} md={6}>
//                   <Box
//                     component="img"
//                     src={product.image}
//                     alt={product.service}
//                     sx={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                       filter: "brightness(1.05)",
//                     }}
//                   />
//                 </Grid>
//               </MotionGrid>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       ) : (
//         <Box sx={{ display: "flex", justifyContent: "center", height: 350 }}>
//           <CircularProgress sx={{ color: "#FBA518" }} />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default ImageSlider;



// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";
// import {
//   Box,
//   CircularProgress,
//   Typography,
//   Button,
//   Grid,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import "swiper/css";
// import "swiper/css/pagination";
// import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

// const ImageSlider = () => {
//   const [products, setProducts] = useState([]);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const productData = [
//         {
//           image:
//             "https://www.automationroboticscollege.com/wp-content/uploads/2023/04/Electrical-Technician-India-min.jpg",
//           service: "Electrician",
//           business_name: "Expert Electricians",
//           discription:
//             "Ensure safety and reliability in your space with expert electrical installation, repair, and maintenance services.",
//         },
//         {
//           image:
//             "https://thumbs.dreamstime.com/b/handyman-repairing-faucet-sink-bathroom-maintenance-household-assistance-concept-close-up-indian-plumber-264239059.jpg",
//           service: "Plumbing Service",
//           business_name: "Pro Plumbing Co.",
//           discription:
//             "From leak repairs to full installations, we offer dependable plumbing services for homes and businesses.",
//         },
//         {
//           image:
//             "https://img.freepik.com/premium-photo/carpenter-woodwork-furniture-making-carpentry-workshop_130181-1177.jpg?w=2000",
//           service: "Wood Works & Design",
//           business_name: "WoodCraft Masters",
//           discription:
//             "Get custom furniture and interior woodwork with precision and craftsmanship tailored to your needs.",
//         },
//         {
//           image: "https://miro.medium.com/v2/resize:fit:509/1*wIDCd0nN3SFiPo2miQ0f7w.jpeg",
//           service: "Computer Service",
//           business_name: "TechFix Gurus",
//           discription:
//             "Fix, upgrade, or secure your computer systems with expert IT and repair support at your doorstep.",
//         },
//         {
//           image:
//             "https://static.wixstatic.com/media/b40a18_8e2d2ca62e0a4f86860de5c45d7289a6~mv2.jpg/v1/fill/w_900,h_479,al_c,q_85/b40a18_8e2d2ca62e0a4f86860de5c45d7289a6~mv2.jpg",
//           service: "Building Construction",
//           business_name: "Skyline Builders",
//           discription:
//             "Modern and efficient building construction services, from start to finish, for both residential and commercial needs.",
//         },
//         {
//           image:
//             "https://1.bp.blogspot.com/-uU5Ro05L10Q/VP6Wvbxp4-I/AAAAAAAABeY/W2MRe8WOFPI/s1600/AAAA.jpg",
//           service: "Catering Service",
//           business_name: "Tasty Treats Catering",
//           discription:
//             "Delight your guests with top-notch catering tailored for every event — with flavor, flair, and finesse.",
//         },
//         {
//           image:
//             "https://th.bing.com/th/id/OLC.y2HOxfJe0alQ6g480x360?&rs=1&pid=ImgDetMain",
//           service: "Photography",
//           business_name: "Moments Studio",
//           discription:
//             "Capture timeless moments with professional photography for weddings, events, portraits and more.",
//         },
//       ];
//       await new Promise((res) => setTimeout(res, 800));
//       setProducts(productData);
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", px: 2, py: 4 }}>
//       {products.length > 0 ? (
//         <Swiper
//           modules={[Autoplay, Pagination]}
//           spaceBetween={30}
//           slidesPerView={1}
//           autoplay={{ delay: 4000, disableOnInteraction: false }}
//           pagination={{ clickable: true }}
//           loop
//         >
//           {products.map((product, index) => (
//             <SwiperSlide key={index}>
//               <Grid
//                 container
//                 sx={{
//                   height: isMobile ? "auto" : 400,
//                   borderRadius: 6,
//                   overflow: "hidden",
//                   backdropFilter: "blur(12px)",
//                   background: "rgba(255, 255, 255, 0.1)",
//                   boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
//                   transition: "transform 0.4s ease",
//                   "&:hover": {
//                     transform: "scale(1.01)",
//                   },
//                 }}
//               >
//                 <Grid
//                   item
//                   xs={12}
//                   md={6}
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     p: 4,
//                     backdropFilter: "blur(8px)",
//                     backgroundColor: "rgba(255, 255, 255, 0.3)",
//                   }}
//                 >
//                   {product.business_name && (
//                     <Typography
//                       variant="h6"
//                       sx={{
//                         fontWeight: 600,
//                         color: "#FBA518",
//                         mb: 0.5,
//                         textTransform: "uppercase",
//                         letterSpacing: 1,
//                       }}
//                     >
//                       {product.business_name}
//                     </Typography>
//                   )}

//                   <Typography
//                     variant="h4"
//                     sx={{
//                       fontWeight: 700,
//                       color: "#222",
//                       mb: 1.5,
//                       lineHeight: 1.2,
//                     }}
//                   >
//                     {product.service}
//                   </Typography>

//                   <Typography
//                     variant="body1"
//                     sx={{
//                       color: "#333",
//                       lineHeight: 1.8,
//                       fontSize: "1.05rem",
//                       mb: 2,
//                       display: "flex",
//                       alignItems: "flex-start",
//                     }}
//                   >
//                     <FormatQuoteIcon sx={{ fontSize: 28, mr: 1, mt: 0.5 }} />
//                     {product.discription}
//                   </Typography>

//                   <Button
//                     variant="contained"
//                     size="medium"
//                     sx={{
//                       width: "fit-content",
//                       background: "#111",
//                       borderRadius: "25px",
//                       px: 4,
//                       py: 1.2,
//                       textTransform: "none",
//                       fontWeight: 500,
//                       fontSize: "1rem",
//                       "&:hover": {
//                         backgroundColor: "#333",
//                       },
//                     }}
//                   >
//                     Book Now
//                   </Button>
//                 </Grid>

//                 <Grid item xs={12} md={6}>
//                   <Box
//                     component="img"
//                     src={product.image}
//                     alt={product.service}
//                     sx={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                       filter: "brightness(0.95)",
//                       transition: "0.3s",
//                       "&:hover": {
//                         filter: "brightness(1.05)",
//                       },
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       ) : (
//         <Box
//           sx={{
//             height: 350,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <CircularProgress sx={{ color: "#FBA518" }} />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default ImageSlider;



// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import { Box, CircularProgress, Typography, Grid } from "@mui/material";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const ImageSlider = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const productData = [
//           {
//             image: "https://www.automationroboticscollege.com/wp-content/uploads/2023/04/Electrical-Technician-India-min.jpg",
//             service:'Electrician',
//             discription:"Our professional electrician services ensure the safety, efficiency, and reliability of your electrical systems. Whether you need installation, repair, maintenance, or troubleshooting, our expert electricians are here to help.",
//           },
//           {
//             image: "https://thumbs.dreamstime.com/b/handyman-repairing-faucet-sink-bathroom-maintenance-household-assistance-concept-close-up-indian-plumber-264239059.jpg",
//             discription:" Our expert plumbing services cover everything from leak repairs and pipe installations to drainage solutions and water heater maintenance. We ensure reliable, efficient, and long-lasting plumbing solutions for homes and businesses.",
//             service:'Plumbing Service',
//           },
//           {
//             image: "https://img.freepik.com/premium-photo/carpenter-woodwork-furniture-making-carpentry-workshop_130181-1177.jpg?w=2000",
//             discription:"Our professional carpentry services provide custom woodwork solutions, including furniture making, repairs, and interior wood design. Whether you need elegant wooden décor, durable cabinetry, or structural woodwork, our skilled craftsmen ensure precision and quality.",
//             service:'Wood Works And Design',
//           },
//           {
//             image: "https://miro.medium.com/v2/resize:fit:509/1*wIDCd0nN3SFiPo2miQ0f7w.jpeg",
//             discription:" Our expert computer services include troubleshooting, repairs, software installation, virus removal, and hardware upgrades. Whether it's a slow PC, network issues, or data recovery, our skilled technicians ensure smooth and efficient system performance. ",
//             service:'Computer Service',
//           },
//           {
//             image: "https://static.wixstatic.com/media/b40a18_8e2d2ca62e0a4f86860de5c45d7289a6~mv2.jpg/v1/fill/w_900,h_479,al_c,q_85/b40a18_8e2d2ca62e0a4f86860de5c45d7289a6~mv2.jpg",
//             discription:"We provide reliable and high-quality building construction services, from residential and commercial projects to renovations and structural improvements. Our expert team ensures strong foundations, modern designs, and efficient project execution, delivering durable and aesthetically pleasing constructions.",
//             service:'Bulding Construction',
//           },
//           {
//             image: "https://1.bp.blogspot.com/-uU5Ro05L10Q/VP6Wvbxp4-I/AAAAAAAABeY/W2MRe8WOFPI/s1600/AAAA.jpg",
//             service:'Catering Service',
//             discription:"Our professional catering service offers delicious and well-presented meals for all occasions, including weddings, corporate events, parties, and gatherings. We provide a variety of cuisines, customized menus, and high-quality ingredients to ensure a memorable dining experience for your guests.",
//           },
//           {
//             image: "https://th.bing.com/th/id/OLC.y2HOxfJe0alQ6g480x360?&rs=1&pid=ImgDetMain",
//             service:'Professional Photography ',
//             // business_name: "Friends Digital Studio",
//             discription:"Capture life’s most precious moments with our professional photography services. Whether it’s weddings, corporate events, portraits, or special occasions, we provide high-quality images that tell a story. Our skilled photographers use the latest equipment and creative techniques to deliver stunning, timeless photos. From candid shots to artistic compositions, we ensure every moment is beautifully preserved.",
//           },
//         ];
//         await new Promise((resolve) => setTimeout(resolve, 1000)); 
//         setProducts(productData);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <Box sx={{ width: "95%", position: "relative", borderRadius: "10px" }}>
//       {products.length > 0 ? (
//         <Swiper
//           modules={[Autoplay, Navigation, Pagination]}
//           spaceBetween={10}
//           slidesPerView={1}
//           autoplay={{ delay: 3000, disableOnInteraction: false }}
//           navigation={{ clickable: true }}
//           // pagination
//           loop
//           style={{ borderRadius: "10px" }}
//         >
//           {products.map((product, index) => (
//             <SwiperSlide key={index} >
//               <Grid
//                 container
//                 spacing={2}
//                 sx={{
//                   width: "100%",
//                   height: "300px",
//                   backgroundColor: "#f5f5f5",
//                   borderRadius: "10px",
//                   overflow: "hidden",
//                 }}
//               >

//                 <Grid item xs={6} sx={{ height:'300px', width:'40%',display:'flex',justifyContent:'center',alignItems:'flex-end',flexDirection:'column',textAlign:'right',color:'rgb(255, 0, 0)' }}>
//                 <Typography variant="h4"sx={{color:'#FBA518'}}>
//                     {product.business_name}
//                   </Typography>
//                   <Typography variant="h6"sx={{color:'#FBA518'}}>
//                     {product.service}
//                   </Typography>

//                   <Typography sx={{width:'80%',color:'gray'}}>
//                   "{product.discription}"
//                   </Typography>
//                   {/* <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//                     ${product.price}{" "}
//                     <Typography
//                       component="span"
//                       variant="body2"
//                       sx={{ textDecoration: "line-through", opacity: 0.6, marginLeft: "5px" }}
//                     >
//                       ${Math.round(product.price / (1 - product.discount / 100))}
//                     </Typography>
//                   </Typography>
//                   <Typography variant="body1" sx={{ color: "#FF5733", fontWeight: "bold", marginTop: "5px" }}>
//                     {product.discount}% Off
//                   </Typography> */}
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Box
//                     component="img"
//                     src={product.image}
//                     alt={`Product ${index + 1}`}
//                     sx={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit:'contain',
//                       borderRadius: "10px",
//                     }}
//                   />
//                 </Grid>

//               </Grid>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       ) : (
//         <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "350px", }}>
//           <CircularProgress sx={{color:'red'}} />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default ImageSlider;


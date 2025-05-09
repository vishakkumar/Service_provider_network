import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Stack,
  Paper,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get("/services.json");
        const serviceData = response.data.services.find(
          (s) => s.id.toString() === id
        );

        if (!serviceData) {
          setError("Service not found");
        } else {
          setService(serviceData);
        }
      } catch (err) {
        setError("Failed to load service details.");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading)
    return (
      <CircularProgress style={{ display: "block", margin: "20px auto" }} />
    );
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Paper
      elevation={6}
      sx={{
        maxWidth: 900,
        margin: "40px auto",
        borderRadius: 4,
        padding: 4,
        background: "linear-gradient(to bottom right, #f5f5f5, #ffffff)",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        alignItems="center"
      >
        {/* Service Image */}
        <Box
          component="img"
          src={service.image || "https://via.placeholder.com/400x300"}
          alt={service.business_name}
          sx={{
            width: { xs: "100%", md: "50%" },
            height: 300,
            objectFit: "contain",
            borderRadius: 3,
            boxShadow: 3,
          }}
        />

        {/* Service Info */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" color="#43a047" fontWeight={700} gutterBottom>
            {service.business_name}
          </Typography>

          <Typography variant="h6" color="text.secondary" gutterBottom>
            {service.service}
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            {service.description}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <LocationOnIcon fontSize="small" color="action" />
            <Typography variant="subtitle1" color="text.primary">
              {service.contact.location}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center" mb={2}>
            <PhoneIcon fontSize="small" color="action" />
            <Typography variant="subtitle1" color="text.primary">
              {service.contact.phone}
            </Typography>
          </Stack>

          <Button
            variant="contained"
            sx={{
              background: "#43a047",
              color: "#fff",
              mr: 2,
              "&:hover": { background: "#388e3c" },
            }}
            onClick={() => alert("Booking Sucessfully")}
          >
            Book Service Now
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{ borderColor: "#aaa", color: "#555" }}
          >
            Back
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ServiceDetails;


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Box, Typography, Button, CircularProgress, Alert } from "@mui/material";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import PhoneIcon from "@mui/icons-material/Phone";


// const ServiceDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [service, setService] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchService = async () => {
//       try {
//         const response = await axios.get("/services.json");
//         const serviceData = response.data.services.find((s) => s.id.toString() === id);

//         if (!serviceData) {
//           setError("Service not found");
//         } else {
//           setService(serviceData);
//         }
//       } catch (err) {
//         setError("Failed to load service details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchService();
//   }, [id]);

//   if (loading) return <CircularProgress style={{ display: "block", margin: "20px auto" }} />;
//   if (error) return <Alert severity="error">{error}</Alert>;

//   return (
//     <Box sx={{ padding: "20px", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      
//       <Typography variant="h4" color="#43a047">{service.business_name}</Typography>
//       <Typography variant="h6" color="gray">{service.service}</Typography>
//       <Typography variant="body1" paragraph>{service.description}</Typography>
//       <Typography variant="subtitle1"><LocationOnIcon fontSize="small" color="action" /> {service.contact.location}</Typography>
//       <Typography variant="subtitle1"><PhoneIcon fontSize="small" color="action" /> {service.contact.phone}</Typography>
      
//       <Button
//         sx={{ marginTop: "20px", background: "rgb(170, 170, 20)", color: "white" }}
//         onClick={() => navigate(-1)}
//       >
//         Book Service Now
//       </Button>
//       <Button
//         sx={{ marginTop: "20px", background: "rgb(170, 170, 20)", color: "white" }}
//         onClick={() => navigate(-1)}
//       >
//         Back
//       </Button>
//     </Box>
//   );
// };

// export default ServiceDetails;

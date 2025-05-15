import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";

const AdminPage = () => {
  const [services, setServices] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    business_name: "",
    service: "",
    description: "",
    contact: { phone: "", location: "" },
    active: true,
    image: "",
    rating: 0,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:3000/services");
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" || name === "location") {
      setFormData({
        ...formData,
        contact: { ...formData.contact, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:3000/services/${formData.id}`,
          formData
        );
      } else {
        const newService = {
          ...formData,
          id: Date.now().toString(),
        };
        await axios.post("http://localhost:3000/services", newService);
      }
      fetchServices();
      handleDialogClose();
    } catch (err) {
      console.error("Error saving service:", err);
    }
  };

  const handleEdit = (service) => {
    setFormData(service);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/services/${id}`);
      fetchServices();
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  };

  const handleToggleActive = async (id) => {
    try {
      const service = services.find((s) => s.id === id);
      if (!service) return;
      await axios.patch(`http://localhost:3000/services/${id}`, {
        active: !service.active,
      });
      fetchServices();
    } catch (err) {
      console.error("Error toggling active status:", err);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setIsEditing(false);
    setFormData({
      id: "",
      business_name: "",
      service: "",
      description: "",
      contact: { phone: "", location: "" },
      active: true,
      image: "",
      rating: 0,
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={600} mb={4}>
        Admin - Manage Businesses
      </Typography>

      <Button variant="contained" onClick={() => setOpenDialog(true)}>
        Add New Business
      </Button>

      {/* Business List Table */}
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Business</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Image</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.business_name}</TableCell>
                <TableCell>{service.service}</TableCell>
                <TableCell>{service.contact.phone}</TableCell>
                <TableCell>{service.contact.location}</TableCell>
                <TableCell>
                  <Switch
                    checked={service.active}
                    onChange={() => handleToggleActive(service.id)}
                  />
                </TableCell>
                <TableCell>
                  <Rating
                    value={service.rating || 0}
                    readOnly
                    precision={0.5}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {service.image && (
                    <img
                      src={service.image}
                      alt="business"
                      style={{ height: 50, borderRadius: 4 }}
                    />
                  )}
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleEdit(service)}>
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(service.id)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{isEditing ? "Edit Business" : "Add Business"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Business Name"
            name="business_name"
            fullWidth
            value={formData.business_name}
            onChange={handleInputChange}
            margin="dense"
          />
          <TextField
            label="Service"
            name="service"
            fullWidth
            value={formData.service}
            onChange={handleInputChange}
            margin="dense"
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            value={formData.description}
            onChange={handleInputChange}
            margin="dense"
          />
          <TextField
            label="Phone"
            name="phone"
            fullWidth
            value={formData.contact.phone}
            onChange={handleInputChange}
            margin="dense"
          />
          <TextField
            label="Location"
            name="location"
            fullWidth
            value={formData.contact.location}
            onChange={handleInputChange}
            margin="dense"
          />

          <Box mt={2}>
            <Typography component="legend">Rating</Typography>
            <Rating
              name="rating"
              value={formData.rating}
              precision={0.5}
              onChange={(event, newValue) => {
                setFormData({ ...formData, rating: newValue });
              }}
            />
          </Box>

          <Box mt={2}>
            <Typography>Upload Image</Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ marginTop: 8 }}
            />
            {formData.image && (
              <Box mt={2} display="flex" justifyContent="center">
                <img
                  src={formData.image}
                  alt="preview"
                  style={{ maxHeight: 100, borderRadius: 8 }}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {isEditing ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPage;


// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Switch,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";
// import axios from "axios";

// const AdminPage = () => {
//   const [services, setServices] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [formData, setFormData] = useState({
//     id: "",
//     business_name: "",
//     service: "",
//     description: "",
//     contact: { phone: "", location: "" },
//     active: true,
//   });

//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/services");
//       setServices(res.data);
//     } catch (err) {
//       console.error("Failed to fetch services", err);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "phone" || name === "location") {
//       setFormData({
//         ...formData,
//         contact: { ...formData.contact, [name]: value },
//       });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

// const handleSave = async () => {
//   try {
//     if (isEditing) {
//       await axios.put(`http://localhost:3000/services/${formData.id}`, formData);
//     } else {
//       const newService = { ...formData, id: Date.now().toString() };
//       await axios.post("http://localhost:3000/services", newService);
//     }
//     fetchServices();
//     setOpenDialog(false);
//     setIsEditing(false);
//     setFormData({
//       id: "",
//       business_name: "",
//       service: "",
//       description: "",
//       contact: { phone: "", location: "" },
//       active: true,
//     });
//   } catch (err) {
//     console.error("Error saving service:", err);
//   }
// };


//   const handleEdit = (service) => {
//     setFormData(service);
//     setIsEditing(true);
//     setOpenDialog(true);
//   };

// const handleDelete = async (id) => {
//   try {
//     await axios.delete(`http://localhost:3000/services/${id}`);
//     fetchServices();
//   } catch (err) {
//     console.error("Error deleting service:", err);
//   }
// };


// const handleToggleActive = async (id) => {
//   try {
//     const service = services.find((s) => s.id === id);
//     if (!service) return;
//     await axios.patch(`http://localhost:3000/services/${id}`, {
//       active: !service.active,
//     });
//     fetchServices();
//   } catch (err) {
//     console.error("Error toggling active status:", err);
//   }
// };


//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" fontWeight={600} mb={4}>
//         Admin - Manage Businesses
//       </Typography>

//       <Button variant="contained" onClick={() => setOpenDialog(true)}>
//         Add New Business
//       </Button>

//       {/* Business List Table */}
//       <TableContainer component={Paper} sx={{ mt: 3 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Business</TableCell>
//               <TableCell>Service</TableCell>
//               <TableCell>Phone</TableCell>
//               <TableCell>Location</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell align="center">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {services.map((service) => (
//               <TableRow key={service.id}>
//                 <TableCell>{service.business_name}</TableCell>
//                 <TableCell>{service.service}</TableCell>
//                 <TableCell>{service.contact.phone}</TableCell>
//                 <TableCell>{service.contact.location}</TableCell>
//                 <TableCell>
//                   <Switch
//                     checked={service.active}
//                     onChange={() => handleToggleActive(service.id)}
//                   />
//                 </TableCell>
//                 <TableCell align="center">
//                   <IconButton onClick={() => handleEdit(service)}>
//                     <Edit color="primary" />
//                   </IconButton>
//                   <IconButton onClick={() => handleDelete(service.id)}>
//                     <Delete color="error" />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Add/Edit Dialog */}
//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
//         <DialogTitle>{isEditing ? "Edit Business" : "Add Business"}</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Business Name"
//             name="business_name"
//             fullWidth
//             value={formData.business_name}
//             onChange={handleInputChange}
//             margin="dense"
//           />
//           <TextField
//             label="Service"
//             name="service"
//             fullWidth
//             value={formData.service}
//             onChange={handleInputChange}
//             margin="dense"
//           />
//           <TextField
//             label="Description"
//             name="description"
//             fullWidth
//             value={formData.description}
//             onChange={handleInputChange}
//             margin="dense"
//           />
//           <TextField
//             label="Phone"
//             name="phone"
//             fullWidth
//             value={formData.contact.phone}
//             onChange={handleInputChange}
//             margin="dense"
//           />
//           <TextField
//             label="Location"
//             name="location"
//             fullWidth
//             value={formData.contact.location}
//             onChange={handleInputChange}
//             margin="dense"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//           <Button onClick={handleSave} variant="contained">
//             {isEditing ? "Update" : "Add"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default AdminPage;

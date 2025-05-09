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
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("./services.json");
      setServices(res.data.services);
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

  const handleSave = () => {
    if (isEditing) {
      setServices((prev) =>
        prev.map((s) => (s.id === formData.id ? formData : s))
      );
    } else {
      setServices((prev) => [
        ...prev,
        { ...formData, id: Date.now().toString() },
      ]);
    }

    setFormData({
      id: "",
      business_name: "",
      service: "",
      description: "",
      contact: { phone: "", location: "" },
      active: true,
    });
    setIsEditing(false);
    setOpenDialog(false);
  };

  const handleEdit = (service) => {
    setFormData(service);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const handleToggleActive = (id) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
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
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {isEditing ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPage;

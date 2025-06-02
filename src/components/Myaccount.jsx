import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
export const Myaccount = () => {
  const [userdata, setUserdata] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch all user data from API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/register');
        setUserdata(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchUser();
  }, []);

  // Load current user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setCurrentUser(user);
        console.log('User ID:', user.id);
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    } else {
      console.log('No user found in localStorage');
    }
  }, []);

  return (
    <Box>

      <Grid container>
        <Grid item md={4}> <Avatar alt="Remy Sharp" src="/broken-image.jpg"/> </Grid>
        <Grid item md={8} sx={{height:'300px',width:'50%',background:'rgba(209, 209, 209, 0.93)',}}
        style={{display: 'grid',placeItems: 'center',height: '200px'
        }}>
          <Typography variant="h6">Welcome, {currentUser?.name || 'Guest'}</Typography>
          <Typography variant="body1">User ID: {currentUser?.id || 'N/A'}</Typography>
          </Grid>
      </Grid>
    </Box>
  );
};

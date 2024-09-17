/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Link from 'next/link';
import { Box, Button, Avatar, Grid, Paper, Typography, Input, Snackbar, Modal, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';

import Navbarr from '@/components/home/navbarr';
import Footer from '@/layouts/footer';
import Hero from '@/components/home/hero';


const localizer = momentLocalizer(moment);

const UserPage: React.FC = () => {
  const [avatar, setAvatar] = useState<string>('/avatar.jpg');
  const [checkInSuccess, setCheckInSuccess] = useState<boolean>(false);
  const [events, setEvents] = useState<Array<{ start: Date; end: Date; title: string }>>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newEvent, setNewEvent] = useState<{ title: string; start: Date | null; end: Date | null }>({
    title: '',
    start: null,
    end: null,
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setAvatar(e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleCheckIn = () => {
    setCheckInSuccess(true);
  };

  const handleSnackbarClose = () => {
    setCheckInSuccess(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleEventChange = (key: string, value: string | Date | null) => {
    setNewEvent((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      setEvents([...events, { title: newEvent.title, start: newEvent.start, end: newEvent.end }]);
      handleCloseModal();
      setNewEvent({ title: '', start: null, end: null });
    }
  };

  return (
    <>
      <Hero />
      <Navbarr />
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        minHeight="70vh"
        mt={4}
      >
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <Box display="flex" flexDirection="column" height="100%" justifyContent="space-between">
                <Button fullWidth color="primary" style={{ marginBottom: '10px' }} variant="contained" onClick={handleCheckIn}>
                  Check-In
                </Button>
                <Button fullWidth color="primary" style={{ marginBottom: '10px' }} variant="contained">
                  <Link href="/filesubmission">File Submission</Link>
                </Button>
                <Button fullWidth color="primary" style={{ marginBottom: '10px' }} variant="contained">
                  <Link href="/personal-records">Personal Records</Link>
                </Button>
                <Button fullWidth color="secondary" variant="contained">
                  Edit Profile
                </Button>
              </Box>
            </Grid>
            <Grid item alignItems="center" display="flex" flexDirection="column" justifyContent="center" sm={6} xs={12}>
              <Avatar alt="User Avatar" src={avatar} style={{ width: '150px', height: '150px', marginBottom: '10px' }} />
              <label htmlFor="avatar-upload">
                <Input
                  id="avatar-upload"
                  style={{ display: 'none' }}
                  type="file"
                  onChange={handleAvatarChange}
                />
                <Button color="primary" component="span" variant="outlined">
                  Edit Avatar
                </Button>
              </label>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Snackbar autoHideDuration={3000} open={checkInSuccess} onClose={handleSnackbarClose}>
        <Alert severity="success" onClose={handleSnackbarClose}>
          You checked in!
        </Alert>
      </Snackbar>

      {/* Calendar Section */}
      <Box display="flex" justifyContent="center" mb={10} mt={10}>
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', width: '100%' }}>
          <Typography gutterBottom align="center" variant="h4">
            Calendar
          </Typography>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button color="primary" variant="contained" onClick={handleOpenModal}>
              Add Event
            </Button>
          </Box>
          <Box mt={4}>
            <div style={{ height: '500pt' }}>
              <Calendar
                endAccessor="end"
                events={events}
                localizer={localizer}
                startAccessor="start"
                style={{ height: '100%' }}
              />
            </div>
          </Box>
        </Paper>
      </Box>

      {/* Add Event Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Paper style={{ margin: 'auto', padding: '20px', maxWidth: '400px', width: '100%' }}>
          <Typography gutterBottom variant="h6">
            Add New Event
          </Typography>
          <TextField
            fullWidth
            label="Event Title"
            style={{ marginBottom: '10px' }}
            value={newEvent.title}
            onChange={(e) => handleEventChange('title', e.target.value)}
          />
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            label="Start Date"
            style={{ marginBottom: '10px' }}
            type="datetime-local"
            onChange={(e) => handleEventChange('start', new Date(e.target.value))}
          />
          <TextField
            fullWidth
            InputLabelProps={{ shrink: true }}
            label="End Date"
            style={{ marginBottom: '20px' }}
            type="datetime-local"
            onChange={(e) => handleEventChange('end', new Date(e.target.value))}
          />
          <Box display="flex" justifyContent="space-between">
            <Button color="secondary" variant="contained" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button color="primary" variant="contained" onClick={handleAddEvent}>
              Add Event
            </Button>
          </Box>
        </Paper>
      </Modal>

      <Footer />
    </>
  );
};

export default UserPage;

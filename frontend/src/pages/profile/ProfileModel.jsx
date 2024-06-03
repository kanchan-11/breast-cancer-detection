import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik';
import { updateUserProfileAction } from '../../redux/auth/auth.action';

import { Avatar, IconButton, TextField, Backdrop, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: "none",
  overflow: "scroll-y",
  borderRadius: 3,
};

export default function ProfileModel({ open, handleClose, userDetails }) {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")

  const handleProfilePictureChange = (event) => {
    // formik.setFieldValue('profilePicture', event.currentTarget.files[0]);
  };


  const formik = useFormik({
    initialValues: {
      firstName: userDetails.firstName, // Set initial value to user's first name
      lastName: userDetails.lastName,   // Set initial value to user's last name
      profilePicture: null
    },
    onSubmit: (values,) => {
      console.log("values", values);
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      // formData.append('profilePicture', values.profilePicture);
      dispatch(updateUserProfileAction(formData, jwt));
      handleClose();
    }
  })
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
                <p>Edit Porfile</p>
              </div>
              <Button type="submit" variant='contained'>Save</Button>
            </div>
            <div>
              <div className='h-[15rem]'>
                <img className='w-full h-full rounded-t-md' src="https://cdn.pixabay.com/photo/2014/01/13/20/01/pebbles-243910_640.jpg" alt="" />
              </div>
              <div className='pl-5'>
                <label htmlFor="profilePicture">

                  <Avatar className="transform -translate-y-24"
                    xs={{ width: "10rem", height: "10rem" }}
                    src={userDetails.profilePicture || "https://cdn.pixabay.com/photo/2014/01/13/20/01/pebbles-243910_640.jpg"}

                  />

                </label>
                <input id="profilePicture"
                  type="file" accept="image/*"
                  onChange={handleProfilePictureChange}
                  style={{ display: "none" }} />
              </div>
            </div>
            <div className='space-y-3'>
              <TextField fullWidth id="firstName" name="firstName" label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange} />
              <TextField fullWidth id="lastName" name="lastName" label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange} />


            </div>
          </form>

        </Box>
      </Modal>
    </div>
  );
}
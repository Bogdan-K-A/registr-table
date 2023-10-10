import * as React from 'react';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  Box,
  Button,
  ButtonGroup,
} from '@mui/material';
import s from './ModalForm.module.css';
import { Formik } from 'formik';

export const ModalForm = ({ open, handleClose }) => {
  return (
    <div>
      <Modal
        className={s.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={s.modalContent}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Event Details
          </Typography>

          <Formik
            initialValues={{ event: '', date: '', color: '' }}
            onSubmit={(values) => {
              console.log('values: ', values);
              // dispatch(signin(values));
            }}
          >
            {(props) => {
              const { values, handleChange, handleBlur, handleSubmit } = props;

              return (
                <>
                  <form className={s.form} onSubmit={handleSubmit}>
                    <p className={s.labelMargin}>Evetnt title</p>
                    <TextField
                      className={s.Input}
                      sx={{ m: 1, minWidth: 120 }}
                      size="small"
                      label="Event"
                      type="text"
                      name="event"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.event}
                    />

                    <p className={s.labelMargin}>Evetnt date</p>
                    <TextField
                      className={s.Input}
                      sx={{ m: 1, width: 223 }}
                      size="small"
                      type="date"
                      value={values.date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <p className={s.labelMargin}>Select a theme</p>
                    <FormControl sx={{ m: 1, width: 223 }} size="small">
                      <InputLabel>Select a theme</InputLabel>
                      <Select className={s.Input} label="Опции">
                        <MenuItem>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'blue'}>Blue theme</MenuItem>
                        <MenuItem value={'green'}>Green theme</MenuItem>
                        <MenuItem value={'red'}>Red theme</MenuItem>
                      </Select>
                    </FormControl>
                    <Box sx={{ mt: 1 }}>
                      <Button sx={{ mr: 1 }} onClick={handleClose}>
                        <span>Close</span>
                      </Button>
                      <Button type="submit">
                        <span>Save Event</span>
                      </Button>
                    </Box>
                  </form>
                </>
              );
            }}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
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
            initialValues={{ event: '' }}
            onSubmit={(values) => {
              // dispatch(signin(values));
            }}
          >
            {(props) => {
              const { values, handleChange, handleBlur, handleSubmit } = props;

              return (
                <>
                  <form className={s.form} onSubmit={handleSubmit}>
                    <p>Evetnt title</p>
                    <TextField
                      sx={{ m: 1, minWidth: 120 }}
                      size="small"
                      label="Event"
                      type="text"
                      name="event"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.event}
                    />
                    <label className={s.formLabel}>
                      <p>Evetnt date</p>
                      <input
                        // className={s.formInput}
                        // placeholder="event"
                        type="date"
                        // value={values.event}
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                      />
                    </label>
                    <p>Select a theme</p>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel>Select a theme</InputLabel>

                      <Select label="Опции">
                        <MenuItem>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'blue'}>Blue theme</MenuItem>
                        <MenuItem value={'green'}>Green theme</MenuItem>
                        <MenuItem value={'red'}>Red theme</MenuItem>
                      </Select>
                    </FormControl>

                    <button className={s.formButton} onClose={handleClose}>
                      <span>Close</span>
                    </button>
                    <button className={s.formButton} type="submit">
                      <span>Save Event</span>
                    </button>
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

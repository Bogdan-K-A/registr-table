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
import { useDispatch } from 'react-redux';
import { addEvent } from '../../../redux/calendar/calendarReducer';

export const ModalForm = ({ open, handleClose, selectedDayUnix }) => {
  const dispatch = useDispatch();

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
            Создать событие
          </Typography>

          <Formik
            initialValues={{ event: '', started_at: '', finished_at: '', date: selectedDayUnix }}
            onSubmit={(values) => {
              // console.log('values: ', values);

              dispatch(addEvent(values));
            }}
          >
            {(props) => {
              const { values, handleChange, handleBlur, handleSubmit, setFieldValue } = props;
              const handleChangeTime = (e, fieldName) => {
                const timeValue = e.target.value;
                setFieldValue(fieldName, timeValue);
              };

              return (
                <>
                  <form className={s.form} onSubmit={handleSubmit}>
                    <p className={s.labelMargin}>Выбрать событие</p>
                    <FormControl sx={{ m: 1, width: 223 }} size="small">
                      <InputLabel>Event</InputLabel>
                      <Select
                        className={s.Input}
                        label="Опции"
                        name="event"
                        value={values.event}
                        onChange={handleChange}
                      >
                        <MenuItem>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'coll'}>Созвон</MenuItem>
                        <MenuItem value={'meeting'}>Совещание</MenuItem>
                        <MenuItem value={'presentation'}>Презентация проекта</MenuItem>
                      </Select>
                    </FormControl>

                    <p className={s.labelMargin}>Время события</p>
                    <Box sx={{ mt: 1 }}>
                      <div style={{ display: 'inline-block' }}>
                        <p>C</p>
                        <TextField
                          className={s.Input}
                          sx={{ mr: 1 }}
                          size="small"
                          type="time"
                          value={values.time}
                          onChange={(e) => handleChangeTime(e, 'started_at')}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div style={{ display: 'inline-block' }}>
                        <p>До</p>
                        <TextField
                          className={s.Input}
                          size="small"
                          type="time"
                          onChange={(e) => handleChangeTime(e, 'finished_at')}
                          value={values.time}
                          onBlur={handleBlur}
                        />
                      </div>
                    </Box>

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

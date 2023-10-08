import React, { useState } from 'react';
import moment from 'moment/moment';
import s from './Calendar.module.css';
import { Button, ButtonGroup } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ModalForm } from '../../components/calendarComponent/ModalForm/ModalForm';

export const Calendar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const startDay = moment().startOf('month').startOf('week');
  // const endDay = moment().endOf('month').endOf('week');
  // const monthDaysArr = [...Array(7)];
  const calendar = 35;
  const calendarFoolArr = [...Array(calendar)];

  return (
    <div className={s.calendarWrapper}>
      <div className={s.calendarGrid}>
        <div className={s.nameMonthWrapper}>
          <p className={s.nameMonth}>Oktober 2023</p>
        </div>
        <ButtonGroup className={s.buttonGroup} size="small" aria-label="small button group">
          <Button className={s.btn}>
            <NavigateBeforeIcon />
          </Button>
          <Button className={s.btn}>
            <NavigateNextIcon />
          </Button>
        </ButtonGroup>
        {calendarFoolArr.map((_, ind) => {
          return (
            <div className={s.gridBox} key={ind} onClick={handleOpen}>
              {ind}
            </div>
          );
        })}
        <ModalForm open={open} handleClose={handleClose} />
      </div>
    </div>
  );
};

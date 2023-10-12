import { useEffect, useState } from 'react';
import moment from 'moment/moment';
import s from './Calendar.module.css';
import { Button, ButtonGroup } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ModalForm } from '../../components/calendarComponent/ModalForm/ModalForm';
import { TOTAL_DAYS, WEEK_DAYS } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import { filterEvents } from '../../redux/calendar/calendarReducer';

export const Calendar = () => {
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState(moment());
  const [selectedDayUnix, setSelectedDayUnix] = useState(null);
  const events = useSelector(({ calendar }) => calendar.events);
  const dispatch = useDispatch();
  console.log('events: ', events);

  const handleOpen = (dayItem) => {
    setSelectedDayUnix(dayItem);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  moment.updateLocale('uk', { week: { dow: 1 } });
  const startDay = today.clone().startOf('month').startOf('week');
  const day = startDay.clone().subtract(1, 'days');
  const calendarFoolArr = [...Array(TOTAL_DAYS)].map(() => day.add(1, 'day').clone());
  const weekDaysArr = [...Array(WEEK_DAYS)].map(() => day.add(1, 'day').clone());

  const isCurrentDay = (day) => moment().isSame(day, 'day');
  const isSelectedMonth = (day) => today.isSame(day, 'month');

  const prevRandler = () => setToday((prev) => prev.clone().subtract(1, 'month'));
  const nextRandler = () => setToday((prev) => prev.clone().add(1, 'month'));

  const startDateQuery = startDay.clone().format('X');
  const endDateQuery = startDay.clone().add(TOTAL_DAYS, 'day').format('X');

  useEffect(() => {
    dispatch(filterEvents({ startDateQuery: startDateQuery, endDateQuery: endDateQuery }));
  }, []);

  return (
    <div>
      <div className={s.calendarGrid}>
        <div className={s.wrapperNameDay}>
          {weekDaysArr.map((day) => {
            return (
              <p key={day} className={s.nameDay}>
                {day.format('ddd')}
              </p>
            );
          })}
        </div>
        <div className={s.nameMonthWrapper}>
          <p className={s.nameMonth}>
            {today.format('MMMM')} <span className={s.year}>{today.format('YYYY')}</span>
          </p>
        </div>

        {/* ПЕРЕКЛЮЧЕНИЕ МЕСЯЦА */}
        <ButtonGroup className={s.buttonGroup} size="small" aria-label="small button group">
          <Button className={s.btn} onClick={prevRandler}>
            <NavigateBeforeIcon />
          </Button>
          <Button className={s.btn} onClick={nextRandler}>
            <NavigateNextIcon />
          </Button>
        </ButtonGroup>

        {/* CЕТКА КАЛЕНДАРЯ */}
        {calendarFoolArr.map((dayItem) => {
          return (
            <div
              className={!isSelectedMonth(dayItem) ? s.notСurrentMonth : null}
              key={dayItem.unix()}
              onClick={() => handleOpen(dayItem.unix())}
            >
              {!isCurrentDay(dayItem) && <p className={s.dayBox}>{dayItem.format('D')}</p>}
              {isCurrentDay(dayItem) && <p className={s.currentDay}>{dayItem.format('D')}</p>}
            </div>
          );
        })}
        <ModalForm open={open} handleClose={handleClose} selectedDayUnix={selectedDayUnix} />
      </div>
    </div>
  );
};

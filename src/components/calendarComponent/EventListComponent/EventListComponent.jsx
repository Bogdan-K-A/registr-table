import React from 'react';
import { translation } from './utils';
import { AiOutlineDelete } from 'react-icons/ai';
import s from './EventListComponent.module.css';
import { useDispatch } from 'react-redux';
import { deleteEvent } from '../../../redux/calendar/calendarReducer';

export const EventListComponent = ({ localEvents, dayItem }) => {
  const dispatch = useDispatch();

  const deleteEventById = (e, id) => {
    e.stopPropagation();
    dispatch(deleteEvent({ id }));
  };

  return (
    <ul className={s.list}>
      {localEvents
        .filter((event) => event.date >= dayItem.format('X') && event.date <= dayItem.clone().endOf('day').format('X'))
        .map(({ title, id, started_at, finished_at }) => {
          return (
            <li className={s.listItem} key={started_at}>
              <p>
                {translation(title)}: <span>C {started_at}</span>-<span>По {finished_at}</span>
              </p>
              <div>
                <AiOutlineDelete size={18} onClick={(e) => deleteEventById(e, id)} />
              </div>
            </li>
          );
        })}
    </ul>
  );
};

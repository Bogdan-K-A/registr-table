import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { uid } from 'uid';
import moment from 'moment';

const createEvent = (data) => {
  return {
    id: uid(),
    event: 'Созвон',
    started_at: '12:00',
    finished_at: '12:30',
    date: 1695665522,
    ...data,
  };
};

const EVENT = createEvent({
  id: uid(),
});

const EVENTS_MOCKS = [
  EVENT,
  {
    id: uid(),
    event: 'Совещание',
    started_at: '15:00',
    finished_at: '15:30',
    date: 1698257522,
  },
  {
    id: uid(),
    event: 'Совещание',
    started_at: '15:00',
    finished_at: '15:30',
    date: 1697652722,
  },
  {
    id: uid(),
    event: 'Совещание',
    started_at: '15:00',
    finished_at: '15:30',
    date: 1699207922,
  },
];

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: EVENTS_MOCKS,
    // currentEvents: [],
  },
  reducers: {
    addEvent: (state, { payload }) => {
      state.events.push(createEvent(payload));
    },

    filterEvents: (state, { payload }) => {
      const { startDateQuery, endDateQuery } = payload;
      // console.log('startDateQuery: ', startDateQuery);
      // console.log('endDateQuery: ', endDateQuery);
      // console.log('endDateQuery: ', startDateQuery < endDateQuery);
      // const ell = EVENTS_MOCKS.map((obj) => obj.date).slice(startDateQuery, endDateQuery);
      // console.log('ell: ', ell);

      // if (startDateQuery <= endDateQuery && startDateQuery >= endDateQuery) {
      //   return state.events;
      // }

      state.events = state.events.filter((event) => {
        const eventDate = moment.unix(event.date);
        console.log(event.date);
        return (
          eventDate.isSameOrAfter(moment.unix(startDateQuery)) && eventDate.isSameOrBefore(moment.unix(endDateQuery))
        );
      });

      // console.log('filteredEvents: ', filteredEvents);
      // state.currentEvents = EVENTS_MOCKS.map((obj) => obj.date);
    },
  },
});

const persistConfig = {
  key: 'root',
  storage,
};

export const { addEvent, filterEvents } = calendarSlice.actions;
export const calendarReducer = persistReducer(persistConfig, calendarSlice.reducer);

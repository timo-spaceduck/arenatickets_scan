import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  timetable: null,
  tickets: [],
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEvent: (state, action) => {
      state.event = action.payload;
    },
    setTickets: (state, action) => {
      state.tickets = action.payload;
    },
  },
  extraReducers: {},
});

export const {setEvent, setTickets} = eventSlice.actions;

export default eventSlice.reducer;

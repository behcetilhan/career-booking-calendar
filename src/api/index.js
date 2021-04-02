import axios from 'axios';

export const cfCalendarApi = axios.create({
  baseURL: 'https://private-anon-22d0e9dca9-cfcalendar.apiary-mock.com',
});

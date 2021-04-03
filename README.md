# Career Booking Calendar

![Vercel](http://therealsujitk-vercel-badge.vercel.app/?app=career-booking-calendar)
### [DEMO](https://career-booking-calendar-behcetilhan.vercel.app/)
Career Booking Calendar gives students the ability to schedule calls with thier mentors.

## Features

- List of already allocated time slots with time and description
- Week based UI
- Ability to add description to planned call. 
- Past date detection
- Current time indicator
- UTC Compatible dates & times
- Custom event types for already allocated and user allocated events
- Ability to see details of past calls.

---
## Tech

Carer Booking Calendar is bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses open source projects listed below to work properly:

- [React Big Calendar](https://github.com/jquense/react-big-calendar) - An events calendar component built for React and made for modern browsers (read: IE10+) and uses flexbox over the classic tables-ception approach.
- [Moment.js](https://momentjs.com/) - A JavaScript date library for parsing, validating, manipulating, and formatting dates.
- [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
- [Bootstrap SCSS](https://www.npmjs.com/package/bootstrap-scss) - Sleek, intuitive, and powerful front-end framework for faster and easier web development.

---
## Installation & Available Scripts

Carer Booking Calendar requires [Node.js](https://nodejs.org/) v10+ to run.

Cloning project and installing dependencies

```sh
git clone https://github.com/behcetilhan/career-booking-calendar.git
cd career-booking-calendar
yarn install
```

In the project directory, you can run:

##### `yarn start`
Runs the app in the development mode. The page will reload if you make edits.
You will also see any lint errors in the console.

##### `yarn test`
Launches the test runner in the interactive watch mode. 

##### `yarn build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.

## App Flow & Code Examples

App uses axios to fetch data from [CareerFoundry API](https://cfcalendar.docs.apiary.io/). Then it passes the returned data to localstorage and app context for future user additions.

App is initializes with an itial state created and distributed by the Context

```sh
export const initialState = {
  returnedData: '',
  isLoading: true,
  apiErrorMessage: '',
  allocatedTimeSlots: [],
  selectedSlot: '',
  allocatedEventData: false
};

export const DataContext = createContext();

const AllocatedDateTimeProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DataContext.Provider>
  );
};
```

`useFetch` is a custom hook which is used to call the data. And needs api, method and url to function 

```sh
useEffect(() => {
    const fetchData = async () => {
      api[method](url, JSON.parse(config), JSON.parse(data))
        .then((res) => {
          dispatch({
            type: GET_API_DATA,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: API_ERROR,
            payload: 'An error'
          });
        })
        .finally(() => {
          dispatch({
            type: DATA_LOADED,
          });
        });
    };
```

These params are given in the main component of the app `CareerCalendar`

```sh
const CareerCalendar = () => {
  useFetch({
    api: cfCalendarApi,
    method: 'get',
    url: '/mentors/1/agenda',
  });
```


Also react-big-calendar component is configured here

```sh
<Calendar
  selectable
  localizer={localizer}
  views={['week']}
  defaultView="week"
  events={allocatedTimeSlots}
  startAccessor="start"
  step={60}
  timeslots={1}
  endAccessor="end"
  onSelectEvent={(event) => handleAllocatedEvent(event)}
  onSelectSlot={handleSelect}
  onSelecting={(slot) => false}
  components={{
    event: EventComponent,
    toolbar: CalendarToolbar,
  }}
/>
```
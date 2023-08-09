import ReactCalendar from 'react-calendar';
import { monthNames } from '../constants';

import '../styles/Calendar.css';
import TileContent from './TileContent';

export const Calendar = ({
 date,
  setDate,
  notes,
  setNotes,
}) => {
  return (
    <ReactCalendar
      className="calendar"
      onChange={setDate}
      value={date}
      navigationLabel={({ date }) => <NavigationLabel date={date} />}
      showNavigation={true}
      tileContent={({ date, view }) => <TileContent date={date} notes={notes} setNotes={setNotes} />}
    />
  );
};

const NavigationLabel = ({ date }) => {
  return (
    <div className="calendar-navigation">
      <h3 className="calendar-year">{date.getFullYear()}</h3>
      <p className="calendar-month">{monthNames[date.getMonth()]}</p>
    </div>
  );
};

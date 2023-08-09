import { useState } from 'react'
import { Calendar } from './components/Calendar'
import { monthNames, weekDayNames } from './constants'

import './styles/App.css'

function App() {
  const [date, setDate] = useState(new Date())
  console.log('Date:', date); // Ajoutez cette ligne
  const [notes, setNotes] = useState({}); // État pour stocker les notes

  const weekDay = weekDayNames[date.getDay()]
  const monthName = monthNames[date.getMonth()]

  return (
    <div className="App">
      <div className="calendar-left">
        <h1 className="calendarLeft-day">{date.getDate()}</h1>
        <p className="calendarLeft-date">
          {weekDay} <Separator /> {monthName} <Separator /> {date.getFullYear()}
        </p>
      </div>
      <Calendar date={date} setDate={setDate} notes={notes} setNotes={setNotes} />
    </div>
  )
}

const Separator = () => {
  return <span className="separator">&#183;</span>
}

export default App

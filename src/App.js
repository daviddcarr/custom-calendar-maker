import { useState, useEffect, useMemo } from 'react'

import { MdDeleteForever, MdFormatListBulletedAdd, MdEditCalendar, MdAlarmAdd, MdSave } from 'react-icons/md'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import Calendar from './components/Calendar'
import EditEvent from './components/EditEvent'
import EditCalendar from './components/EditCalendar'

function App() {

  const defaultCalendar = useMemo(() => (
    {
      months: [
        {
          name: 'Month 1',
          days: 30
        },
      ],
      startDay: 1,
      startYear: 2023,
      years: 1,
      weekdays: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      categories: [
        {
          name: 'Holiday',
          color: 'red'
        }
      ],
      events: [
        {
          name: 'New Year\'s Day',
          date: 1,
          month: 0,
          year: 0,
          category: 0,
          description: 'New Year\'s Day is the first day of the Gregorian calendar, which is widely used in many countries such as the USA.'
        }
      ],
    }
  ), [])

  const [showEditCalendar, setShowEditCalendar] = useState(false)
  const [showEditEvent, setShowEditEvent] = useState(false)
  const [currentEvent, setCurrentEvent] = useState(0)

  const [calendar, setCalendar] = useState(defaultCalendar)

  // const [calendar, setCalendar] = useState(() => {
  //   const storedCalendar = localStorage.getItem('calendar')
  //   return storedCalendar ? JSON.parse(storedCalendar) : defaultCalendar
  // })

  const saveCalendarToLocalStorage = (updatedCalendar) => {
    localStorage.setItem('calendar', JSON.stringify(updatedCalendar))
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCalendar = localStorage.getItem('calendar')
      setCalendar(storedCalendar ? JSON.parse(storedCalendar) : defaultCalendar)
    }
  }, [])

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-12 xl:p-24`}
    >

       <div className='w-full'>

          {/* Calendar Title */}
          <div className="flex">
            <h1 className='text-4xl font-bold grow'>Calendar</h1>

            <button
              className='ml-4 bg-green-500 text-white text-lg px-4 py-2 rounded flex items-center space-x-4'
              onClick={() => setShowEditCalendar(true)} 
              >
              <MdEditCalendar />
            </button>
          </div>

          {/* Edit Calendar Interface */}
          {
            showEditCalendar && (
              <EditCalendar 
                calendar={calendar} 
                setCalendar={setCalendar} 
                setShowEditCalendar={setShowEditCalendar} 
                saveCalendarToLocalStorage={saveCalendarToLocalStorage}
                defaultCalendar={defaultCalendar}
                />
            )
          }

          {/* Edit Event Interface */}
          {
            showEditEvent && (
              <EditEvent 
                calendar={calendar} 
                setCalendar={setCalendar} 
                setShowEditEvent={setShowEditEvent} 
                event={calendar.events[currentEvent]}
                saveCalendarToLocalStorage={saveCalendarToLocalStorage}
                />
            )
          }

          {/* Render Calendar */}
          <Calendar 
            calendar={calendar} 
            setCalendar={setCalendar} 
            setCurrentEvent={setCurrentEvent} 
            setShowEditEvent={setShowEditEvent} />


       </div>

    </main>
  )

}

export default App;

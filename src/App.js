import { useState, useEffect, useMemo } from 'react'

import { MdEditCalendar } from 'react-icons/md'

import Calendar from './components/Calendar'
import EditEvent from './components/EditEvent'
import EditCalendar from './components/EditCalendar'
import JumpToButtons from './components/JumpToButtons'

function App() {

  const defaultCalendar = useMemo(() => (
    {
      name: 'My Calendar',
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
      checkedDays: []
    }
  ), [])

  const [showEditCalendar, setShowEditCalendar] = useState(false)
  const [showEditEvent, setShowEditEvent] = useState(false)
  const [currentEvent, setCurrentEvent] = useState(0)

  const [calendar, setCalendar] = useState(defaultCalendar)

  const saveCalendarToLocalStorage = (updatedCalendar) => {
    localStorage.setItem('calendar', JSON.stringify(updatedCalendar))
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCalendar = localStorage.getItem('calendar')
      setCalendar(storedCalendar ? JSON.parse(storedCalendar) : defaultCalendar)
    }
  }, [defaultCalendar])

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-6 md:p-12 xl:p-24 bg-black`}
    >

      <div className="w-full fixed top-0 left-0 right-0 bg-gray-900 border-b-2 border-gray-800">
        <div className="m-auto max-w-[1500px] p-2 flex justify-between">
          <h2 className="font-logo text-2xl capitalize">Calendarling</h2>
        </div>
      </div>


       <div className='w-full mt-9'>

          <div className="w-full max-w-[1500px] m-auto">
            {/* Calendar Title */}
            <div className="flex items-center">
              <h1 className='text-2xl sm:text-4xl font-bold grow'>{calendar.name}</h1>

              <button
                className='ml-4 bg-green-500 text-white text-lg px-4 py-2 rounded flex items-center space-x-4'
                onClick={() => setShowEditCalendar(true)} 
                >
                <MdEditCalendar />
              </button>
            </div>

            {/* Render Calendar */}
            <Calendar 
              calendar={calendar} 
              setCalendar={setCalendar} 
              setCurrentEvent={setCurrentEvent} 
              setShowEditEvent={setShowEditEvent}
              saveCalendarToLocalStorage={saveCalendarToLocalStorage}
              />
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

          {/* Jump To Buttons */}
          <JumpToButtons
            calendar={calendar}
            />

       </div>

    </main>
  )

}

export default App;

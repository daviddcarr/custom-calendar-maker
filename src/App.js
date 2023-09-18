import { useState, useEffect, useMemo } from 'react'

import { MdEditCalendar } from 'react-icons/md'

import Calendar from './components/Calendar'
import EditEvent from './components/EditEvent'
import EditCalendar from './components/EditCalendar'
import JumpToButtons from './components/JumpToButtons'

import defaultCalendar from './data/default'

function App() {

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
      id="main-container"
      className={`flex min-h-screen flex-col items-center justify-between p-6 md:p-12 xl:p-24 pt-[calc(1.5rem+50px)] md:pt-[calc(3rem+50px)] bg-black`}
    >

      <div className="w-full fixed z-50 top-0 left-0 right-0 px-6 md:px-12 xl:px-24 bg-gray-900 bg-opacity-70 backdrop-blur-sm">
        <div className="m-auto max-w-[1500px] py-2 flex justify-between">
          <button className=""
            onClick={() => {
                document.getElementById(`main-container`).scrollIntoView({ behavior: 'smooth' })
            }}
            >
            <h2 className="font-logo text-2xl capitalize">Calendarling</h2>
          </button>
        </div>
      </div>


       <div className='w-full' id="calendar-container">

          <div className="w-full max-w-[1500px] m-auto">
            {/* Calendar Title */}
            <div className="flex items-center">
              <h1 className='text-2xl sm:text-4xl font-bold grow'>{calendar.name}</h1>

              <button
                className='ml-4 bg-green-500 hover:bg-green-600 text-white text-lg px-4 py-2 rounded flex items-center space-x-4'
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

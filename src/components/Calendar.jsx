import { useState, useEffect } from 'react'
import { MdAlarmAdd, MdCheckCircleOutline, MdCheckCircle, MdOutlineHighlightOff } from 'react-icons/md'

const Calendar = ({calendar, setCalendar, setCurrentEvent, setShowEditEvent, saveCalendarToLocalStorage}) => {

    const months = []
    let startDay = calendar.startDay
    let currentYear = calendar.startYear
  
  
    for (let i = 0; i < calendar.years; i++) {
      calendar.months.map((month, index) => {
        const events = calendar.events.filter(event => event.month === calendar.months.indexOf(month) && event.year === i)
  
        months.push({
          monthId: index,
          month: month.name,
          year: calendar.startYear + i,
          yearIndex: i,
          days: month.days,
          startDay: startDay,
          events: events
        })
        startDay = ((month.days + startDay) % calendar.weekdays.length)

        return null
      })
    }

    // Detect which  month is currently in view and add fixed class to month-title-container
    const handleScroll = () => {
      let currentMonth = null
      let lowestNegative = -Infinity

      months.map((month, index) => {
        const monthElement = document.getElementById(`month-${month.monthId}-year-${month.yearIndex}`)


        if (monthElement) {
          const containerTop = monthElement.getBoundingClientRect().top

          console.log("Month: ", month.month, "Container Top: ", containerTop)
          if (containerTop <= 0) {
            if (containerTop > lowestNegative) {
              lowestNegative = containerTop
              currentMonth = monthElement
            }
          }
        }
      })

      //  get all .month-title-containers and remove fixed class
      const monthTitleContainers = document.querySelectorAll('.month-title-container')
      monthTitleContainers.forEach(monthTitleContainer => {
        monthTitleContainer.classList.remove('fixed', 'z-50')
        monthTitleContainer.classList.add('relative')
      })

      if (currentMonth) {
        const monthTitleContainer = currentMonth.querySelector('.month-title-container')
        monthTitleContainer.classList.add('fixed', 'z-50')
        monthTitleContainer.classList.remove('relative')
      }

    }

    useEffect(() => {
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }, [])
  
    return (
      <div className='flex flex-col items-center justify-center mt-8 w-full space-y-10'>
  
        {months.map((month, index) => {
  
          const showDivider = currentYear !== month.year
          currentYear = month.year
  
          return (
            <div key={index} className="w-full" id={`month-${month.monthId}-year-${month.yearIndex}`}>
              {showDivider && (
                <div className="w-full mb-4">
                  <h2 className="text-2xl sm:text-4xl text-center">{currentYear}</h2>
                  <div className='w-full border-[1px] border-gray-700'></div>
                </div>
              )}
              <div
                className='flex flex-col items-center justify-center w-full'
              >
                  <div className="h-[48px] w-full">
                    <div className={`month-title-container relative top-0 left-0 right-0 w-full text-center`}>
                      <h2 className='text-xl sm:text-2xl font-bold p-2'>{month.month} {month.year}</h2>
                    </div>
                  </div>
                  <div className={`w-full grid weekdays-${calendar.weekdays.length}`}>
                    {
                      calendar.weekdays.map((weekday, i) => (
                        <div
                          key={i}
                          className='weekday-title px-4 py-2 border-[1px] border-gray-900'
                        >
                          {weekday}
                        </div>
                      ))
                    }
                    <RenderDaysOfMonth 
                      calendar={calendar} 
                      setCalendar={setCalendar}
                      setCurrentEvent={setCurrentEvent} 
                      setShowEditEvent={setShowEditEvent} 
                      month={month}
                      saveCalendarToLocalStorage={saveCalendarToLocalStorage}
                      />
                  </div>
              </div>
            </div>
  
        )})}
  
      </div>
    )
  }
  
export default Calendar


const RenderDaysOfMonth = ({calendar, setCalendar, setCurrentEvent, setShowEditEvent, month, saveCalendarToLocalStorage}) => {

  const days = []
  const cellCount = (month.days + month.startDay) + (calendar.weekdays.length - ((month.days + month.startDay) % calendar.weekdays.length))

  for (let i = 0; i < cellCount; i++) {
    const dateIndex = i - month.startDay

    // get all month.events with dateIndex
    const events = month.events.filter(event => event.date - 1 === dateIndex)

    const dateInfo = {
      isDate: dateIndex + 1 > 0 && dateIndex + 1 <= month.days,
      day: dateIndex + 1,
      name: calendar.weekdays[i % calendar.weekdays.length],
      events: events
    }

    days.push(dateInfo)
  }

  const checkIfDayIsChecked = (day) => {
    const checkedDayIndex = calendar.checkedDays.findIndex(checkedDay => checkedDay.day === day.day && checkedDay.month === month.monthId && checkedDay.year === month.yearIndex)
    return checkedDayIndex
  }

  return days.map((day, index) => (
      <div
        key={index}
      className={`weekday ${ day.isDate ? 'is-date' : 'not-date'} ${checkIfDayIsChecked(day) !== -1 ? 'bg-gray-950' : ''} flex flex-col min-h-[150px] border-[1px] border-gray-900`}
      >
        {day.isDate && (
          <>
            {/* Day Title & Check Button */}
            <button
              className={`group hover:bg-gray-950 flex justify-between items-center bg-transparent w-full px-4 py-2  text-left ${day.isDate ? 'text-gray-900' : 'text-gray-500'}`}
              onClick={() => {
                let checkedDays = [...calendar.checkedDays]
                const dayIndex = checkIfDayIsChecked(day)
                console.log("Day Index: ", dayIndex)
                if (dayIndex === -1) {
                  checkedDays.push({
                    day: day.day,
                    month: month.monthId,
                    year: month.yearIndex
                  })
                } else {
                  checkedDays.splice(dayIndex, 1)
                }
                setCalendar({...calendar, checkedDays: checkedDays })
                saveCalendarToLocalStorage({...calendar, checkedDays: checkedDays })
              }}>
                <h2 className="text-white">{day.day} <span className="weekday-name text-gray-600">{day.name}</span></h2>
                { checkIfDayIsChecked(day) !== -1 ? (
                    <>
                      <MdCheckCircle className="text-xl text-green-400 group-hover:hidden" />
                      <MdOutlineHighlightOff className="text-xl text-gray-700 hidden group-hover:block text-red-400" />
                    </>
                  ) : (
                    <MdCheckCircleOutline className="text-xl text-gray-700 group-hover:text-green-400" />
                  )
                }
              </button>

            <div className="px-4 py-2 grow flex flex-col">
              {/* Event List */}
              <ul className="space-y-2 mb-2">
                { day.events.length > 0 && day.events.map((event, i) => (
                  <li key={i}>
                      <button 
                        className={`bg-red-800 event-${calendar.categories[event.category].color} py-1 px-2 rounded w-full text-left`}
                        onClick={() => {
                          const eventId = calendar.events.indexOf(event)
                          setCurrentEvent(eventId)
                          setShowEditEvent(true)
                        }}
                        >
                        <h3 className="text-sm">{event.name}</h3>
                      </button>
                  </li>
                )) }
              </ul>

              {/* Add Event Button */}
              <button 
                className="mt-auto bg-transparent hover:bg-green-400 py-1 px-2 rounded w-full text-center text-gray-700 hover:text-black  flex justify-center"
                onClick={() => {
                  // Add new current event with this day month and year and open editEvent
                  const events = calendar.events
                  events.push({
                    name: 'New Event',
                    date: day.day,
                    month: month.monthId,
                    year: month.yearIndex,
                    category: 0,
                    description: ''
                  })
                  const newEventId = events.length - 1
                  setCalendar({...calendar, events: events})
                  setCurrentEvent(newEventId)
                  setShowEditEvent(true)
                }}
                >
                <MdAlarmAdd className="text-2xl" />
              </button>
            </div>


          </>
          )}
      </div>
  ))

}

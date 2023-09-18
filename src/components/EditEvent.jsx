import { useState, useEffect } from 'react'

import DeleteWarning from './DeleteWarning'

import { MdDeleteForever, MdSave } from 'react-icons/md'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const EditEvent = ({calendar, setCalendar, setShowEditEvent, event, saveCalendarToLocalStorage}) => {

    const [showDeleteWarning, setShowDeleteWarning] = useState(false)

    const yearStrings = []
    for (let i = 0; i < calendar.years; i++) {
      yearStrings.push(`${calendar.startYear + i}`)
    }

    const eventIndex = calendar.events.indexOf(event)

    const downloadJson = (event) => {
        if (event !== null) {  
          const filename = `calendarling_event_${event.date}-${calendar.months[event.month].name}-${calendar.startYear+event.year}.json`

          const storedData = JSON.stringify([event])
  
          let element = document.createElement('a')
          element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(storedData))
          element.setAttribute('download', filename)
  
          document.body.appendChild(element)
          element.click()
          document.body.removeChild(element)
        }
      }
  
    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-gray-800 backdrop-blur-sm bg-opacity-80 p-8 rounded-lg max-h-[80vh] overflow-scroll space-y-4">
        
                <div className='flex'>
                    <h2 className="text-2xl font-bold text-white grow">Edit Event</h2>
                    <button
                        className='text-3xl text-gray-500 hover:text-gray-300 rounded flex items-center space-x-4'
                        onClick={() => setShowEditEvent(false)}
                            >
                        <AiOutlineCloseCircle />
                    </button>
                </div>
        
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    {/* Event Name and Date Fields */}
                    <div
                    className='space-y-4'
                    >
                        {/* Event Name Field */}
                        <div>
                            <label className='text-white'>Event name:</label>
                            <input
                            type="text"
                            value={event.name}
                            className='w-full border-2 border-gray-500 bg-gray-700 rounded px-4 py-2 text-white'
                            onChange={(e) => {
                                
                                const events = calendar.events
                                events[eventIndex].name = e.target.value
                                setCalendar({...calendar, events: events})
                            }}
                            />
                        </div>
        
                        {/* Event Date FIeld */}
                        <div>
                            <label className='text-white'>Event Day / Month / Year:</label>
                            <div className="flex">
            
                                <input
                                    type="number"
                                    value={event.date}
                                    step={1}
                                    className='w-full border-l-2 border-y-2 border-r-none border-gray-500 bg-gray-700 rounded-l rounded-r-none px-4 py-2 text-white'
                                    onChange={(e) => {
                                        const events = calendar.events
                                        events[eventIndex].date = e.target.value ? parseInt(e.target.value) : 0
                                        setCalendar({...calendar, events: events})
                                    }}
                                />
                
                                <select
                                    value={event.month}
                                    className='w-full bg-transparent border-y-2 border-x-[1px] rounded-none border-gray-500 bg-gray-700 px-4 py-2 text-white'
                                    onChange={(e) => {
                                        const events = calendar.events
                                        events[eventIndex].month = e.target.value ? parseInt(e.target.value) : 0
                                        setCalendar({...calendar, events: events})
                                    }}
                                >
                                    {
                                    calendar.months.map((month, index) => (
                                        <option key={index} value={index}>{month.name}</option>
                                    ))
                                    }
                                </select>
                
                                <select
                
                                    value={event.year}
                                    className='w-full border-r-2 border-y-2 border-l-none border-gray-500 bg-gray-700 rounded-r rounded-l-none px-4 py-2 text-white'
                                    onChange={(e) => {
                                        const events = calendar.events
                                        events[eventIndex].year = e.target.value ? parseInt(e.target.value) : 0
                                        setCalendar({...calendar, events: events})
                                    }}
                                >
                                    {
                                        yearStrings.map((year, index) => (
                                            <option key={index} value={index}>{year}</option>
                                        ))
                                    }
                                </select>
            
                            </div>
                        </div>

                        {/* Event Category Field */}
                        <div className="grid grid-cols-[auto,1fr]">
                            <label className='text-white p-2 border-y-2 border-l-2 border-r-[1px] rounded-l rounded-r-none border-gray-500 bg-gray-700'>Category:</label>
                            <select
                                value={event.category}
                                className='border-y-2 border-r-2 border-l-none rounded-r rounded-l-none bg-transparent border-gray-500 bg-gray-700 px-4 py-2 text-white'
                                onChange={(e) => {
                                    const events = calendar.events
                                    events[eventIndex].category = e.target.value
                                    setCalendar({...calendar, events: events})
                                }}
                            >
                                {
                                    calendar.categories.map((category, index) => (
                                        <option key={index} value={index}>{category.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                    </div>
        
                    {/* Event Description Field */}
                    <div>
                        
                        <div className="h-full grid grid-rows-[auto,1fr]">
                            <label className='text-white'>Event description:</label>
                            <textarea
                                value={event.description}
                                rows={6}
                                className='w-full border-2 border-gray-500 bg-gray-700 rounded px-4 py-2 text-white'
                                onChange={(e) => {
                                    const events = calendar.events
                                    events[eventIndex].description = e.target.value
                                    setCalendar({...calendar, events: events})
                                }}
                            />
                        </div>

                    </div>

        
                </div>
        
                {/* Save and Delete Buttons */}
                <div className="flex gap-4">
        
                    <button
                    className='bg-green-500 hover:bg-green-600 text-white text-lg px-4 py-2 rounded flex items-center space-x-2 grow md:grow-0'
                    onClick={() => {
                        const events = calendar.events
                        events[eventIndex] = event
                        const updatedCalendar = {...calendar, events: events}
                        setCalendar(updatedCalendar)
                        saveCalendarToLocalStorage(updatedCalendar)
                        setShowEditEvent(false)
                    }}
                    >
                        <MdSave className='text-white' /> <span>Save</span>
                    </button>
        
                    <button
                    className='bg-red-800 hover:bg-red-900 text-white text-lg px-4 py-2 rounded flex items-center space-x-2'
                    onClick={() => {
                        setShowDeleteWarning(true)
                    }}
                    >
                        <MdDeleteForever className='text-white' />
                    </button>

                    <button
                        className='bg-gray-700 hover:bg-gray-600 text-white text-lg px-4 py-2 rounded flex items-center space-x-2'
                        onClick={() => {
                            downloadJson(event)
                        }}>
                        <span>Download</span>
                    </button>

                </div>
        
                </div>
            </div>

            {showDeleteWarning && (
                <DeleteWarning
                    message="Are you sure you want to delete this event?"
                    deleteFunction={() => {
                        const events = calendar.events
                        events.splice(eventIndex, 1)
                        const updatedCalendar = {...calendar, events: events}
                        setCalendar(updatedCalendar)
                        saveCalendarToLocalStorage(updatedCalendar)
                        setShowEditEvent(false)
                        setShowDeleteWarning(false)
                    }}
                    cancelFunction={() => {
                        setShowDeleteWarning(false)
                    }}
                />
            )}

        </>
    )
  }

  export default EditEvent
  
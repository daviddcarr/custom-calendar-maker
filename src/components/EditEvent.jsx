import { useState } from 'react'

import DeleteWarning from './DeleteWarning'

import { MdDeleteForever, MdFormatListBulletedAdd, MdEditCalendar, MdAlarmAdd, MdSave } from 'react-icons/md'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const EditEvent = ({calendar, setCalendar, setShowEditEvent, event, saveCalendarToLocalStorage}) => {

    const [showDeleteWarning, setShowDeleteWarning] = useState(false)

    const yearStrings = []
    for (let i = 0; i < calendar.years; i++) {
      yearStrings.push(`${calendar.startYear + i}`)
    }

    const eventIndex = calendar.events.indexOf(event)
  
  
    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-lg max-h-[80vh] overflow-scroll space-y-4">
        
                <div className='flex'>
                    <h2 className="text-2xl font-bold text-gray-900 grow">Edit Event</h2>
                    <button
                    className='text-white text-lg px-4 py-2 rounded flex items-center space-x-4'
                    onClick={() => setShowEditEvent(false)}
                    >
                    <AiOutlineCloseCircle className='text-gray-800' />
                    </button>
                </div>
        
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    {/* Event Name and Date Fields */}
                    <div
                    className='space-y-4'
                    >
                    <div>
                        <label className='text-gray-900'>Event name:</label>
                        <input
                        type="text"
                        value={event.name}
                        className='w-full border-[1px] border-gray-900 rounded px-4 py-2 text-gray-900'
                        onChange={(e) => {
                            
                            const events = calendar.events
                            events[eventIndex].name = e.target.value
                            setCalendar({...calendar, events: events})
                        }}
                        />
                    </div>
        
                    <div>
                        <label className='text-gray-900'>Event Day / Month / Year:</label>
                        <div className="flex">
        
                        <input
                            type="number"
                            value={event.date}
                            step={1}
                            className='w-full border-l-[1px] border-y-[1px] border-gray-900 rounded-l px-4 py-2 text-gray-900'
                            onChange={(e) => {
                            const events = calendar.events
                            events[eventIndex].date = e.target.value ? parseInt(e.target.value) : 0
                            setCalendar({...calendar, events: events})
                            }}
                        />
        
                        <select
                            value={event.month}
                            className='w-full border-[1px] border-gray-900 px-4 py-2 text-gray-900'
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
                            className='w-full border-r-[1px] border-y-[1px] border-gray-900 rounded-r px-4 py-2 text-gray-900'
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

                    <div className="grid grid-cols-[auto,1fr]">
                            <label className='text-gray-900 p-2 border-[1px] rounded-l border-gray-900'>Category:</label>
                            <select
                                value={event.category}
                                className='border-y-[1px] border-r-[1px] rounded-r border-gray-900 px-4 py-2 text-gray-900'
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
                            <label className='text-gray-900'>event description:</label>
                            <textarea
                                value={event.description}
                                rows={6}
                                className='w-full border-[1px] border-gray-900 rounded px-4 py-2 text-gray-900'
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
                    className='bg-green-500 text-white text-lg px-4 py-2 rounded flex items-center space-x-2 grow md:grow-0'
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
                    className='bg-red-800 text-white text-lg px-4 py-2 rounded flex items-center space-x-2'
                    onClick={() => {
                        // const events = calendar.events
                        // events.splice(eventIndex, 1)
                        // const updatedCalendar = {...calendar, events: events}
                        // setCalendar(updatedCalendar)
                        // saveCalendarToLocalStorage(updatedCalendar)
                        // setShowEditEvent(false)
                        setShowDeleteWarning(true)
                    }}
                    >
                    <MdDeleteForever className='text-white' />
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
  
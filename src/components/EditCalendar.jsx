import { useState } from 'react'

import { MdDeleteForever, MdFormatListBulletedAdd, MdSave } from 'react-icons/md'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { TbFileImport, TbFileExport } from 'react-icons/tb'

import DeleteWarning from './DeleteWarning'
import JsonUploader from './JsonUploader'

const EditCalendar = ({calendar, setCalendar, setShowEditCalendar, saveCalendarToLocalStorage, defaultCalendar}) => {

    const [calendarJSON, setCalendarJSON] = useState(JSON.stringify(calendar, null, 2))
    const [dataUploaded, setDataUploaded] = useState(false)

    const [showFileUploader, setShowFileUploader] = useState(false)
    const [importEvents, setImportEvents] = useState(false)

    const [showEventsList, setShowEventsList] = useState(false)
    const [eventsToExport, setEventsToExport] = useState([])

    const [showResetWarning, setShowResetWarning] = useState(false)
    const [resetWarningState, setResetWarningState] = useState({
      message: '',
      actionText: '',
      deleteFunction: () => {},
      cancelFunction: () => {}
    })

    const downloadJson = () => {
      if (localStorage.getItem('calendar') !== null) {
        let storedData = localStorage.getItem('calendar')

        const filename = 'my_calendarling_data.json'

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
          <div className="bg-gray-800 backdrop-blur-sm bg-opacity-80 p-8 rounded-lg max-h-[80vh] overflow-scroll">

            {/* Title and Close Button */}
            <div className="flex flex-wrap">
                <h2 className="text-2xl font-bold text-white grow">Edit Calendar</h2>
                <button
                    className='text-3xl text-gray-500 hover:text-gray-300 rounded flex items-center space-x-4'
                    onClick={() => {
                      saveCalendarToLocalStorage(calendar)
                      setShowEditCalendar(false)        
                    }}
                    >
                    <AiOutlineCloseCircle />
                </button> 

                <div className="w-full flex-grow">
                  <p className="text-sm text-gray-200 max-w-md">Warning, removing certain items from calendar after adding events can cause errors or unwanted behavior.</p>
                </div>
            </div>
    
            <div className="mt-4 space-y-8">

              {/* Calendar Name Field */}
              <div>
                <label className='text-white'>Calendar name:</label>
                <input

                  type="text"
                  value={calendar.name}
                  className='w-full border-2 border-gray-500 bg-gray-700 rounded px-4 py-2 text-white'
                  onChange={(e) => setCalendar({...calendar, name: e.target.value})}
                />
              </div>
    
              {/* Start Year Field */}
              <div>
                <label className='text-white'>start year and year count:</label>
                <div className="flex">
                  <input
                    type="number"
                    value={calendar.startYear}
                    step={1}
                    placeholder='2023'
                    className='w-full border-r-[1px] border-y-2 border-l-2 border-gray-500 bg-gray-700 rounded-l rounded-r-none px-4 py-2 text-white'
                    onChange={(e) => setCalendar({...calendar, startYear: e.target.value ? parseInt(e.target.value) : 0})}
                  />
                  <input
                    type="number"
                    value={calendar.years}
                    step={1}
                    placeholder='5'
                    className='w-full border-y-2 border-r-2 border-gray-500 bg-gray-700 rounded-r rounded-l-none px-4 py-2 text-white'
                    onChange={(e) => setCalendar({...calendar, years: e.target.value ? parseInt(e.target.value) : 0})}
                  />
                </div>

              </div>
    
              {/* Months Field */}
              <div className="flex flex-col space-y-2">
                <label className='text-white'>Months:</label>
    
                {
                  calendar.months.map((month, index) => (
                    <div key={index} className='border-[2px] border-gray-500 bg-gray-700 rounded grid grid-cols-[auto,1fr,auto]'>
                      <label className='text-white p-2 border-r-[1px] border-b-[1px] border-gray-500 bg-gray-700'>month:</label>
                      <input
                        type="text"
                        value={month.name}
                        className='w-full border-b-[1px] border-gray-500 bg-gray-700 px-4 py-2 text-white col-span-2'
                        onChange={(e) => {
                          const months = calendar.months
                          months[index].name = e.target.value
                          setCalendar({...calendar, months: months})
                        }}
                      />
                      <label className='text-white p-2 border-r-[1px] border-gray-500 bg-gray-700 '>days:</label>
                      <input
                        type="number"
                        value={month.days}
                        step={1}
                        className={`w-full rounded px-4 py-2 text-white bg-transparent ${ index === 0 ? 'col-span-2' : '' }`}
                        onChange={(e) => {
                          const months = calendar.months
                          months[index].days = e.target.value ? parseInt(e.target.value) : 0
                          setCalendar({...calendar, months: months})
                        }}
                      />
                      { index !== 0 &&  (
                      <button
                        className='p-2 text-red-400 hover:bg-red-400 hover:text-white rounded-l-none rounded-tr-none rounded-br'
                        onClick={() => {
                          setResetWarningState({
                            message: 'Are you sure you want to delete this month? All events in this month will be deleted.',
                            actionText: 'Delete',
                            deleteFunction: () => {
                              const months = calendar.months
                              months.splice(index, 1)

                              // find all events in this month and remove them
                              const events = calendar.events
                              events.forEach(event => {
                                if (event.month === index) {
                                  events.splice(events.indexOf(event), 1)
                                }
                              })
                              setCalendar({...calendar, events: events, months: months})
                              setShowResetWarning(false)
                            },
                            cancelFunction: () => {
                              setShowResetWarning(false)
                            }
                          })
                          setShowResetWarning(true)
                        }}
                        >
                        <MdDeleteForever className='text-xl' />
                      </button>
                      )}
                    </div>
                  ))
                }
    
                <button
                  className='bg-green-500 hover:bg-green-600 text-white text-lg px-4 py-2 rounded flex items-center space-x-4'
                  onClick={() => {
                    const months = calendar.months
                    months.push({
                      name: 'New Month',
                      days: 31
                    })
                    setCalendar({...calendar, months: months})
                  }}
                  >
                  <MdFormatListBulletedAdd className='text-white' /> <span>Add Month</span>
                </button>
    
              </div>
    
              {/* Weekdays Field */}
              <div>
                <label className='text-white'>weekdays:</label>
                <p className="text-gray-500 text-sm">Enter weekdays separated by a comma and a space (12 max.)</p>
                <input
                  type="text"
                  value={calendar.weekdays.join(', ')}
                  className='w-full border-[1px] border-gray-500 bg-gray-700 rounded px-4 py-2 text-white'
                  onChange={(e) => {
                    const weekdays = e.target.value.split(', ')
                    // only allow 12 weekdays
                    if (weekdays.length > 12) {
                      weekdays.splice(12, weekdays.length - 12)
                    }
                    setCalendar({...calendar, weekdays: weekdays})
                  }}
                />
              </div>
    
              {/* First Year Start Day */}
              <div>
                <label className='text-white'>First year start day:</label>
                <select
                  value={calendar.startDay}
                  className='w-full border-2 bg-transparent border-gray-500 bg-gray-700 rounded px-4 py-2 text-white'
                  onChange={(e) => setCalendar({...calendar, startDay: e.target.value ? parseInt(e.target.value) : 0})}
                >
                  {
                    calendar.weekdays.map((weekday, index) => (
                      <option key={index} value={index}>{weekday}</option>
                    ))
                  }
                </select>
              </div>
    
              {/* Categories Field */}
              <div className="flex flex-col space-y-2">
                  <label className='text-white'>Categories:</label>
      
                  {
                    calendar.categories.map((category, index) => (
                      <div key={index} className='border-[2px] border-gray-500 bg-gray-700 rounded grid grid-cols-[auto,1fr,auto]'>

                        <label className='text-white p-2 border-r-[1px] border-b-[1px] border-gray-500 bg-gray-700'>Name:</label>
                        <input
                          type="text"
                          value={category.name}
                          className='w-full border-b-[1px] border-gray-500 bg-gray-700 px-4 py-2 text-white col-span-2'
                          onChange={(e) => {
                            const categories = calendar.categories
                            categories[index].name = e.target.value
                            setCalendar({...calendar, categories: categories})
                          }}
                        />
                        <label className='text-white p-2 border-r-[1px] border-gray-500 bg-gray-700 '>Color:</label>
                        <select
                          value={category.color}
                          className={`w-full rounded px-4 py-2 text-white bg-transparent ${ index === 0 ? 'col-span-2' : '' } `}
                          onChange={(e) => {
                            const categories = calendar.categories
                            categories[index].color = e.target.value
                            setCalendar({...calendar, categories: categories})
                          }}
                        >
                          <option value='red'>red</option>
                          <option value='orange'>orange</option>
                          <option value='yellow'>yellow</option>
                          <option value='lime'>lime</option>
                          <option value='green'>green</option>
                          <option value='blue'>blue</option>
                          <option value='cyan'>cyan</option>
                          <option value='indigo'>indigo</option>
                          <option value='purple'>purple</option>
                          <option value='magenta'>magenta</option>
                          <option value='pink'>pink</option>
                          <option value='gray'>gray</option>
                          <option value='slate'>slate</option>
                        </select>

                          { index !== 0 &&  (
                            <button
                              className='p-2 text-red-400 hover:bg-red-400 hover:text-white rounded-l-none rounded-tr-none rounded-br'
                              onClick={() => {
                                setResetWarningState({
                                  message: 'Are you sure you want to delete this category? All events with this category will be set to previous category.',
                                  actionText: 'Delete',
                                  deleteFunction: () => {
                                    const categories = calendar.categories
                                    categories.splice(index, 1)

                                    // find all events with this category and remove it
                                    const events = calendar.events
                                    events.forEach(event => {
                                      if (event.category >= index) {
                                        event.category -= 1
                                      }
                                    })
                                    setCalendar({...calendar, events: events, categories: categories})
                                    setShowResetWarning(false)
                                  },
                                  cancelFunction: () => {
                                    setShowResetWarning(false)
                                  }
                                })
                                setShowResetWarning(true)
                              }}
                              >
                              <MdDeleteForever className='text-xl' />
                            </button>
                          )}
                      </div>
                    ))
                  }
      
                  <button
                    className='bg-green-500 hover:bg-green-600 text-white text-lg px-4 py-2 rounded flex items-center space-x-4'
                    onClick={() => {
                      const categories = calendar.categories
                      categories.push({
                        name: 'New Category',
                        color: 'red'
                      })
                      setCalendar({...calendar, categories: categories})
                    }}
                    >
                    <MdFormatListBulletedAdd className='text-white' /> <span>Add Category</span>
                  </button>
      
              </div>

              <hr className='border-gray-200' />

              {/* Text field to load calendar JSON to localStorage */}
              <div className="space-y-2">

                <h3>Export / Import Data</h3>

                {/* Export Buttons */}
                <div className="flex gap-2 w-full">

                  <button
                    className='grow bg-green-500 hover:bg-green-600  text-white text-lg px-4 py-2 rounded flex items-center space-x-4'
                    onClick={downloadJson}
                    >
                      <TbFileExport className='text-white' /> <span>Export</span>
                  </button>

                  <button
                  className={`${showEventsList ? 'bg-red-800 hover:bg-red-900' : 'bg-green-500 hover:bg-green-600'} text-white text-lg px-4 py-2 rounded flex items-center space-x-4`}
                    onClick={() => {
                      setShowEventsList(!showEventsList)
                    }}
                    >
                      { showEventsList ? <AiOutlineCloseCircle className='text-white' /> : <TbFileExport className='text-white' />} <span>Export Events</span>
                  </button>

                </div>

                {/* Export Events List */}
                {showEventsList && (
                  <div className="flex flex-col space-y-2 p-2 border-2 border-gray-700 rounded">
                    <label className='text-white'>Select events to export:</label>
                    <div className="flex flex-col space-y-2 max-h-64 overflow-scroll">
                      {
                        calendar.events.map((event, index) => (
                          <div key={index} className={`border-[2px] ${eventsToExport.includes(event) ? 'border-green-400' : 'border-gray-500'}  bg-gray-700 rounded`}>
                            {/* A checkbox that adds/removes event data to eventsToExport when checked  */}
                            <input
                              type="checkbox"
                              name={`event-${index}`}
                              id={`event-${index}`}
                              checked={eventsToExport.includes(event)}
                              className='p-2 text-red-500 hover:bg-red-600 hover:text-white rounded-l-none rounded-tr-none rounded-br hidden'
                              onChange={() => {
                                if (eventsToExport.includes(event)) {
                                  setEventsToExport(eventsToExport.filter(e => e !== event))
                                } else {
                                  setEventsToExport([...eventsToExport, event])
                                }
                              }}
                            />
                            <label for={`event-${index}`} className={`${eventsToExport.includes(event) ? 'text-green-400' : 'text-white'} grow block w-full p-2 cursor-pointer  border-r-[1px] border-b-[1px] border-gray-500 bg-gray-700`}>{ event.name } - {calendar.months[event.month].name} {event.date}, {calendar.startYear+event.year}</label>
                          </div>
                        ))
                      }
                    </div>
                    <div className="">
                      {/* Export eventsToExport data */}
                      <button
                        className='bg-green-500 hover:bg-green-600 text-white text-lg px-4 py-2 rounded flex items-center space-x-4'
                        onClick={() => {
                          const filename = 'my_calendarling_events.json'

                          let element = document.createElement('a')
                          element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(eventsToExport, null, 2)))
                          element.setAttribute('download', filename)

                          document.body.appendChild(element)
                          element.click()
                          document.body.removeChild(element)
                          setShowEventsList(false)
                        }}
                        >
                        <TbFileExport className='text-white' /> <span>Download</span>
                      </button>
                    </div>
                  </div>
                )}


                {/* Import Buttons */}
                <div className="flex gap-2 w-full">

                  <button
                    className={`${showFileUploader && ! importEvents  ? 'bg-red-800 hover:bg-red-900' : 'bg-green-500 hover:bg-green-600'} grow text-white text-lg px-4 py-2 rounded flex items-center space-x-4`}
                    onClick={() => {
                      setImportEvents(false)
                      setShowFileUploader(!showFileUploader)
                    }}
                    >
                    { showFileUploader && ! importEvents  ? <AiOutlineCloseCircle className='text-white' /> : <TbFileImport className='text-white' /> } <span>Import</span>
                  </button>
                  <button
                    className={`${showFileUploader && importEvents  ? 'bg-red-800 hover:bg-red-900' : 'bg-green-500 hover:bg-green-600'} text-white text-lg px-4 py-2 rounded flex items-center space-x-4`}
                    onClick={() => {
                      setImportEvents(true)
                      setShowFileUploader(!showFileUploader)
                    }}
                    >
                      { showFileUploader && importEvents  ? <AiOutlineCloseCircle className='text-white' /> : <TbFileImport className='text-white' /> } <span>Import Events</span>
                  </button>

                </div>

                {/* Import Files UI */}
                {showFileUploader && (
                    <JsonUploader
                      visibilityFunction={setShowFileUploader}
                      calendar={calendar}
                      setCalendar={setCalendar}
                      saveCalendarToLocalStorage={saveCalendarToLocalStorage}
                      dataUploaded={setDataUploaded}
                      isEvents={importEvents}
                      />
                )}
              </div>

              {/* Save  Button */}
              <div  className="flex gap-2">
                <button
                  className='bg-green-500 hover:bg-green-600 text-white text-lg px-4 py-2 rounded flex items-center space-x-4 grow'
                  onClick={() => {
                    saveCalendarToLocalStorage(calendar)
                    setShowEditCalendar(false)
                  }}
                  >
                  <MdSave className='text-white' /> <span>Save</span>
                </button>

                <button
                  className='bg-red-800 hover:bg-red-900 text-white text-lg px-4 py-2 rounded flex items-center space-x-4 shrink'
                  onClick={() => {
                    setResetWarningState({
                      message: 'Are you sure you want to reset the calendar?',
                      actionText: 'Reset',
                      deleteFunction: () => {
                        setCalendar(defaultCalendar)
                        saveCalendarToLocalStorage(defaultCalendar)
                        setShowEditCalendar(false)
                        setShowResetWarning(false)
                      },
                      cancelFunction: () => {
                        setShowResetWarning(false)
                      }
                    })
                    setShowResetWarning(true)
                  }}
                  >
                    <MdDeleteForever className='text-white' /> <span>Reset</span>
                </button>

              </div>
            </div>
    
          </div>
    
        </div>      

        {
          showResetWarning && (
            <DeleteWarning
              message={resetWarningState.message}
              actionText={resetWarningState.actionText}
              deleteFunction={resetWarningState.deleteFunction}
              cancelFunction={resetWarningState.cancelFunction}
            />
          )
        }
      </>
    )
  }

export default EditCalendar
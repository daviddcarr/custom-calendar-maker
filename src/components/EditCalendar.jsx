import { useState } from 'react'

import { MdDeleteForever, MdFormatListBulletedAdd, MdSave } from 'react-icons/md'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import DeleteWarning from './DeleteWarning'
import JsonUploader from './JsonUploader'

const EditCalendar = ({calendar, setCalendar, setShowEditCalendar, saveCalendarToLocalStorage, defaultCalendar}) => {

    const [calendarJSON, setCalendarJSON] = useState(JSON.stringify(calendar, null, 2))

    const [showFileUploader, setShowFileUploader] = useState(false)
    const [dataUploaded, setDataUploaded] = useState(false)

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
          <div className="bg-white p-8 rounded-lg max-h-[80vh] overflow-scroll">

            {/* Title and Close Button */}
            <div className="flex flex-wrap">
                <h2 className="text-2xl font-bold text-gray-900 grow">Edit Calendar</h2>
                <button
                    className='text-3xl text-gray-500 hover:text-gray-700 rounded flex items-center space-x-4'
                    onClick={() => {
                      saveCalendarToLocalStorage(calendar)
                      setShowEditCalendar(false)        
                    }}
                    >
                    <AiOutlineCloseCircle />
                </button> 

                <div className="w-full flex-grow">
                  <p className="text-sm text-gray-700 max-w-md">Warning, removing certain items from calendar after adding events can cause errors or unwanted behavior.</p>
                </div>
            </div>
    
            <div className="mt-4 space-y-8">

              {/* Calendar Name Field */}
              <div>
                <label className='text-gray-900'>Calendar name:</label>
                <input

                  type="text"
                  value={calendar.name}
                  className='w-full border-2 border-gray-300 rounded px-4 py-2 text-gray-900'
                  onChange={(e) => setCalendar({...calendar, name: e.target.value})}
                />
              </div>
    
              {/* Start Year Field */}
              <div>
                <label className='text-gray-900'>start year and year count:</label>
                <div className="flex">
                  <input
                    type="number"
                    value={calendar.startYear}
                    step={1}
                    placeholder='2023'
                    className='w-full border-r-[1px] border-y-2 border-l-2 border-gray-300 rounded-l rounded-r-none px-4 py-2 text-gray-900'
                    onChange={(e) => setCalendar({...calendar, startYear: e.target.value ? parseInt(e.target.value) : 0})}
                  />
                  <input
                    type="number"
                    value={calendar.years}
                    step={1}
                    placeholder='5'
                    className='w-full border-y-2 border-r-2 border-gray-300 rounded-r rounded-l-none px-4 py-2 text-gray-900'
                    onChange={(e) => setCalendar({...calendar, years: e.target.value ? parseInt(e.target.value) : 0})}
                  />
                </div>

              </div>
    
              {/* Months Field */}
              <div className="flex flex-col space-y-2">
                <label className='text-gray-900'>Months:</label>
    
                {
                  calendar.months.map((month, index) => (
                    <div key={index} className='border-[2px] border-gray-300 rounded grid grid-cols-[auto,1fr,auto]'>
                      <label className='text-gray-900 p-2 border-r-[1px] border-b-[1px] border-gray-300'>month:</label>
                      <input
                        type="text"
                        value={month.name}
                        className='w-full border-b-[1px] border-gray-300 px-4 py-2 text-gray-900 col-span-2'
                        onChange={(e) => {
                          const months = calendar.months
                          months[index].name = e.target.value
                          setCalendar({...calendar, months: months})
                        }}
                      />
                      <label className='text-gray-900 p-2 border-r-[1px] border-gray-300 '>days:</label>
                      <input
                        type="number"
                        value={month.days}
                        step={1}
                        className='w-full rounded px-4 py-2 text-gray-900'
                        onChange={(e) => {
                          const months = calendar.months
                          months[index].days = e.target.value ? parseInt(e.target.value) : 0
                          setCalendar({...calendar, months: months})
                        }}
                      />
                      <button
                        className='p-2 text-red-800 hover:bg-red-800 hover:text-white rounded-l-none rounded-tr-none rounded-br'
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
                <label className='text-gray-900'>weekdays:</label>
                <p className="text-gray-500 text-sm">Enter weekdays separated by a comma and a space (12 max.)</p>
                <input
                  type="text"
                  value={calendar.weekdays.join(', ')}
                  className='w-full border-[1px] border-gray-300 rounded px-4 py-2 text-gray-900'
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
                <label className='text-gray-900'>First year start day:</label>
                <select
                  value={calendar.startDay}
                  className='w-full border-2 bg-transparent border-gray-300 rounded px-4 py-2 text-gray-900'
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
                  <label className='text-gray-900'>Categories:</label>
      
                  {
                    calendar.categories.map((category, index) => (
                      <div key={index} className='border-[2px] border-gray-300 rounded grid grid-cols-[auto,1fr,auto]'>

                        <label className='text-gray-900 p-2 border-r-[1px] border-b-[1px] border-gray-300'>Name:</label>
                        <input
                          type="text"
                          value={category.name}
                          className='w-full border-b-[1px] border-gray-300 px-4 py-2 text-gray-900 col-span-2'
                          onChange={(e) => {
                            const categories = calendar.categories
                            categories[index].name = e.target.value
                            setCalendar({...calendar, categories: categories})
                          }}
                        />
                        <label className='text-gray-900 p-2 border-r-[1px] border-gray-300 '>Color:</label>
                        <select
                          value={category.color}
                          className={`w-full rounded px-4 py-2 text-gray-900 bg-transparent ${ index === 0 ? 'col-span-2' : '' } `}
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
                              className='p-2 text-red-800 hover:bg-red-800 hover:text-white rounded-l-none rounded-tr-none rounded-br'
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
                <div className="flex gap-2 w-full">

                  <button
                    className='bg-green-500 hover:bg-green-600 grow text-white text-lg px-4 py-2 rounded flex items-center space-x-4'
                    onClick={downloadJson}
                    >
                      Export
                  </button>

                  <button
                    className='bg-green-500 hover:bg-green-600 grow text-white text-lg px-4 py-2 rounded flex items-center space-x-4'
                    onClick={() => {
                      setShowFileUploader(!showFileUploader)
                    }}
                    >
                      Import
                  </button>

                </div>

                {showFileUploader && (
                    <JsonUploader
                      visibilityFunction={setShowFileUploader}
                      setCalendar={setCalendar}
                      saveCalendarToLocalStorage={saveCalendarToLocalStorage}
                      dataUploaded={setDataUploaded} />
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
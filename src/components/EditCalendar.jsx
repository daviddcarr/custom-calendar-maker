import { useState } from 'react'

import { MdDeleteForever, MdFormatListBulletedAdd, MdEditCalendar, MdAlarmAdd, MdSave } from 'react-icons/md'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import DeleteWarning from './DeleteWarning'

const EditCalendar = ({calendar, setCalendar, setShowEditCalendar, saveCalendarToLocalStorage, defaultCalendar}) => {

    const [calendarJSON, setCalendarJSON] = useState(JSON.stringify(calendar, null, 2))

    const [showResetWarning, setShowResetWarning] = useState(false)

    return (
      <>
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg max-h-[80vh] overflow-scroll">
            <h2 className="text-2xl font-bold text-gray-900">Edit Calendar</h2>
    
            <div className="mt-4 space-y-8">
    
              {/* Start Year Field */}
              <div>
                <label className='text-gray-900'>start year and year count:</label>
                <div className="flex">
                  <input
                    type="number"
                    value={calendar.startYear}
                    step={1}
                    placeholder='2023'
                    className='w-full border-[1px] border-gray-900 rounded-l px-4 py-2 text-gray-900'
                    onChange={(e) => setCalendar({...calendar, startYear: e.target.value ? parseInt(e.target.value) : 0})}
                  />
                  <input
                    type="number"
                    value={calendar.years}
                    step={1}
                    placeholder='5'
                    className='w-full border-y-[1px] border-r-[1px] border-gray-900 rounded-r px-4 py-2 text-gray-900'
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
                        className='p-2'
                        onClick={() => {
                          const months = calendar.months
                          months.splice(index, 1)
                          setCalendar({...calendar, months: months})
                        }}
                        >
                        <MdDeleteForever className='text-red-800' />
                      </button>
                    </div>
                  ))
                }
    
                <button
                  className='bg-green-500 text-white text-lg px-4 py-2 rounded flex items-center space-x-4'
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
                <p className="text-gray-500 text-sm">Enter weekdays separated by a comma and a space</p>
                <input
                  type="text"
                  value={calendar.weekdays.join(', ')}
                  className='w-full border-[1px] border-gray-900 rounded px-4 py-2 text-gray-900'
                  onChange={(e) => {
                    const weekdays = e.target.value.split(', ')
                    setCalendar({...calendar, weekdays: weekdays})
                  }}
                />
              </div>
    
              {/* First Year Start Day */}
              <div>
                <label className='text-gray-900'>First year start day:</label>
                <select
                  value={calendar.startDay}
                  className='w-full border-[1px] border-gray-900 rounded px-4 py-2 text-gray-900'
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
                          className='w-full rounded px-4 py-2 text-gray-900'
                          onChange={(e) => {
                            const categories = calendar.categories
                            categories[index].color = e.target.value
                            setCalendar({...calendar, categories: categories})
                          }}
                        >
                          <option value='red'>red</option>
                          <option value='orange'>orange</option>
                          <option value='yellow'>yellow</option>
                          <option value='green'>green</option>
                          <option value='blue'>blue</option>
                          <option value='cyan'>cyan</option>
                          <option value='indigo'>indigo</option>
                          <option value='purple'>purple</option>
                          <option value='magenta'>magenta</option>
                          <option value='pink'>pink</option>
                          <option value='gray'>gray</option>
                        </select>

                        <button
                          className='p-2'
                          onClick={() => {
                            const categories = calendar.categories
                            categories.splice(index, 1)
                            setCalendar({...calendar, categories: categories})
                          }}
                          >
                          <MdDeleteForever className='text-red-800' />
                        </button>
                      </div>
                    ))
                  }
      
                  <button
                    className='bg-green-500 text-white text-lg px-4 py-2 rounded flex items-center space-x-4'
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

              {/* Text field to load calendar JSON to localStorage */}
              <div className="space-y-2">
                <label className='text-gray-900'>Calendar JSON:</label>
                <textarea
                  value={calendarJSON}
                  rows={6}
                  className='w-full border-[1px] border-gray-900 rounded px-4 py-2 text-gray-900'
                  onChange={(e) => {
                    setCalendarJSON(e.target.value)
                    try {
                      const calendar = JSON.parse(e.target.value)
                      setCalendar(calendar)
                    } catch (error) {
                      console.log(error)
                    }
                  }}
                />
              </div>

              {/* Save  Button */}
              <div  className="flex gap-2">
                <button
                  className='bg-green-500 text-white text-lg px-4 py-2 rounded flex items-center space-x-4 grow'
                  onClick={() => {
                    saveCalendarToLocalStorage(calendar)
                    setShowEditCalendar(false)
                  }}
                  >
                  <MdSave className='text-white' /> <span>Save</span>
                </button>

                <button
                  className='bg-red-800 text-white text-lg px-4 py-2 rounded flex items-center space-x-4 shrink'
                  onClick={() => {
                    setShowResetWarning(true)
                  }}
                  >
                    <MdDeleteForever className='text-white' /> <span>Reset</span>
                </button>

              </div>
            </div>




    
          </div>
    
          <button
            className='fixed top-4 right-4 bg-red-800 text-white text-lg px-4 py-2 rounded flex items-center space-x-4'
            onClick={() => {
              saveCalendarToLocalStorage(calendar)
              setShowEditCalendar(false)
            }}
            >
            <AiOutlineCloseCircle className='text-white' /> <span>Close</span>
          </button>
        </div>      

        {
          showResetWarning && (
            <DeleteWarning
              message='Are you sure you want to reset the calendar?'
              actionText='Reset'
              deleteFunction={() => {
                setCalendar(defaultCalendar)
                saveCalendarToLocalStorage(defaultCalendar)
                setShowEditCalendar(false)
                setShowResetWarning(false)
              }}
              cancelFunction={() => {
                setShowResetWarning(false)
              }}
            />
          )
        }
      </>
    )
  }

export default EditCalendar
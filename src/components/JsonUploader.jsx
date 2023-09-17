import React, { useState } from 'react'
import {AiOutlineCloseCircle} from 'react-icons/ai'
//import { verifyData } from '../../public/functions/userData'


const JsonUploader = ({visibilityFunction, dataUploaded, calendar, setCalendar, saveCalendarToLocalStorage, isEvents}) => {

    const [files, setFiles] = useState("")
    const [fileIsValid, setFileIsValid] = useState(true)

    const eventsBool = isEvents ? true : false

    const verifyData = (calendarData) => {

        const dataJson = JSON.parse(calendarData)

        let dataIsValid = true

        if ( ! eventsBool ) {
            // check if dataJson has properties 'months' (array), 'events' (array), 'startYear' (number), 'years' (number), 'weekdays' (array), 'categories' (array), 'events' (array)
            if ( ! dataJson.hasOwnProperty('months') ) {
                dataIsValid = false
            } else if ( ! dataJson.hasOwnProperty('events') ) {
                dataIsValid = false
            } else if ( ! dataJson.hasOwnProperty('startYear') ) {
                dataIsValid = false
            } else if ( ! dataJson.hasOwnProperty('years') ) {
                dataIsValid = false
            } else if ( ! dataJson.hasOwnProperty('weekdays') ) {
                dataIsValid = false
            } else if ( ! dataJson.hasOwnProperty('categories') ) {
                dataIsValid = false
            } else if ( ! dataJson.hasOwnProperty('events') ) {
                dataIsValid = false
            }

            if ( dataIsValid ) {
                if ( ! dataJson.hasOwnProperty('name')) {
                    dataJson.name = "My Calendar"
                }
                if ( ! dataJson.hasOwnProperty('checkedDays')) {
                    dataJson.checkedDays = []
                }
            }
        } else {
            // Check if dataJson is an array of objects with properties "name", "date", "month", "year", "category", "description"
            if ( ! Array.isArray(dataJson) ) {
                dataIsValid = false
            }
            dataJson.forEach( event => {
                if ( ! event.hasOwnProperty('name') ) {
                    dataIsValid = false
                } else if ( ! event.hasOwnProperty('date') ) {
                    dataIsValid = false
                } else if ( ! event.hasOwnProperty('month') ) {
                    dataIsValid = false
                } else if ( ! event.hasOwnProperty('year') ) {
                    dataIsValid = false
                } else if ( ! event.hasOwnProperty('category') ) {
                    dataIsValid = false
                } else if ( ! event.hasOwnProperty('description') ) {
                    dataIsValid = false
                }
            })
        }

        return {
            isValid: dataIsValid,
            validData: dataJson
        }
    }

    const handleChange = e => {
        const fileReader = new FileReader()
        fileReader.readAsText(e.target.files[0], "UTF-8")
        
        fileReader.onload = e => {
            const verifiedData = verifyData(e.target.result)
            if ( verifiedData.isValid ) {
                setFiles(e.target.result)
                setFileIsValid(true)
            } else {
                setFileIsValid(false)
            }
        }
    }

    const saveData = () => {
        if  ( ! eventsBool ) {
            const calendarData = verifyData(files)
            saveCalendarToLocalStorage(calendarData.validData)
            setCalendar(calendarData.validData)
            dataUploaded(true)
            visibilityFunction(false)
        } else {
            let calendarEvents = calendar.events
            const eventsData = verifyData(files)
            eventsData.validData.forEach( event => {
                // Check if calendarEvents.events contains event with same name and date and month and year
                const eventExists = calendarEvents.find( e => e.name === event.name && e.date === event.date && e.month === event.month && e.year === event.year )
                if ( eventExists ) {
                    // If event exists, replace it
                    calendarEvents = calendarEvents.map( e => {
                        if ( e.name === event.name && e.date === event.date && e.month === event.month && e.year === event.year ) {
                            return event
                        } else {
                            return e
                        }
                    })
                } else {
                    calendarEvents.push(event)
                }

            })
            saveCalendarToLocalStorage({ ...calendar, events: calendarEvents })
            setCalendar({ ...calendar, events: calendarEvents })
            dataUploaded(true)
            visibilityFunction(false)
        }
    }


  return (
    <div className='w-full flex flex-col space-y-4 border-[1px] rounded p-4 text-black'>
        <div className='flex justify-between items-center'>
            <label htmlFor="json_data" className="text-white">Upload your  {eventsBool ? 'event' : 'calendar'} data here.</label>
            <button onClick={() => {visibilityFunction(false)}} className='text-gray-300 hover:text-gray-500' ><AiOutlineCloseCircle size={20} /></button>
        </div>
        <div className='border-[1px] border-gray-300 rounded p-4 overflow-hidden'>
            <input type="file"
                    id="json_data" name="json_data"
                    accept=".txt,.json"
                    className='w-full text-white'
                    onChange={handleChange} />
        </div>
        {
            files !== "" && fileIsValid 
            ? <input type="submit" value="Submit" className='bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg' onClick={saveData} />
            : <p className="text-red-300">Error: Your file contains invalid data.</p>
        }
        {
            files !== "" && fileIsValid ?
                <p className='text-sm text-yellow-300'>Warning: This will ovewrite all existing content.</p> : ``
        }
    </div>
  )
}

export default JsonUploader
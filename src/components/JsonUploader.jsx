import React, { useState } from 'react'
import {AiOutlineCloseCircle} from 'react-icons/ai'
//import { verifyData } from '../../public/functions/userData'


const JsonUploader = ({visibilityFunction, dataUploaded, setCalendar, saveCalendarToLocalStorage}) => {

    const [files, setFiles] = useState("")
    const [fileIsValid, setFileIsValid] = useState(true)

    const verifyData = (calendarData) => {

        const dataJson = JSON.parse(calendarData)

        let dataIsValid = true

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

        return {
            isValid: dataIsValid,
            validData: dataJson
        }
    }

    const handleChange = e => {
        const fileReader = new FileReader()
        fileReader.readAsText(e.target.files[0], "UTF-8")
        fileReader.onload = e => {
            if ( verifyData(e.target.result).isValid ) {
                setFiles(e.target.result)
                setFileIsValid(true)
            } else {
                setFileIsValid(false)
            }
        }
    }

    const saveData = () => {
        const calendarData = JSON.parse(files)
        saveCalendarToLocalStorage(calendarData)
        setCalendar(calendarData)
        dataUploaded(true)
        visibilityFunction(false)
    }


  return (
    <div className='w-full flex flex-col space-y-4 border-[1px] rounded p-4 text-black'>
        <div className='flex justify-between items-center'>
            <label htmlFor="json_data">Upload your data here.</label>
            <button onClick={() => {visibilityFunction(false)}} className='text-gray-300 hover:text-gray-500' ><AiOutlineCloseCircle size={20} /></button>
        </div>
        <div className='border-[1px] border-gray-300 rounded p-4 overflow-hidden'>
            <input type="file"
                    id="json_data" name="json_data"
                    accept=".txt,.json"
                    className='w-full'
                    onChange={handleChange} />
        </div>
        {
            files !== "" && fileIsValid 
            ? <input type="submit" value="Submit" className='bg-green-500 text-white py-2 rounded-lg' onClick={saveData} />
            : <p>Error: Your file contains invalid data.</p>
        }
        {
            files !== "" && fileIsValid ?
                <p className='text-sm'>Warning: This will ovewrite all existing content.</p> : ``
        }
    </div>
  )
}

export default JsonUploader
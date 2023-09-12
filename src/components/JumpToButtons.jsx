import { useEffect, useState } from 'react'

import { MdCircle } from 'react-icons/md'

const JumpToButtons = ({calendar}) => {

    const [months, setMonths] = useState([])

    useEffect(() => {
        const updatedMonths = []

        for (let i = 0; i < calendar.years; i++) {
            calendar.months.map((month, index) => {
                updatedMonths.push({
                    monthId: index,
                    month: month.name,
                    year: calendar.startYear + i,
                    yearIndex: i,
                })
                return null
            })
        }

        setMonths(updatedMonths)
    }, [calendar])

    return (
        <div className="group fixed top-1/2 left-0 -translate-y-1/2 flex flex-col max-h-[80vh] overflow-scroll no-scrollbar gradient-mask text-white rounded-r hidden lg:block">
            {months.map((month, index) => (
                <button 
                    key={index} 
           
                    className="jump-to-buttons flex items-center text-md" 
                    onClick={() => {
                        document.getElementById(`month-${month.monthId}-year-${month.yearIndex}`).scrollIntoView({ behavior: 'smooth' })
                    }}
                    >
                    <span className="grow p-2 text-left bg-gray-800">{month.month} {month.year}</span> <span className="p-[12px] group-hover:bg-gray-800"><MdCircle /></span>
                </button>
            ))}
        </div>
    )
}

export default JumpToButtons
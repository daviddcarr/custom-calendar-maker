import { useEffect, useState } from 'react'

import { MdCircle } from 'react-icons/md'
import { PiArrowsDownUpBold } from 'react-icons/pi'

const JumpToButtons = ({calendar}) => {

    const [months, setMonths] = useState([])

    const [showMobileButtons, setShowMobileButtons] = useState(false)

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
        <>
            <div className="fixed bottom-0 left-0 right-0 block lg:hidden">
                <button 
                    className="w-full sm:w-auto flex justify-center bg-gray-800 hover:bg-gray-900 active:bg-gray-800 p-2 text-4xl sm:rounded-tr"
                    onClick={() => {setShowMobileButtons(!showMobileButtons)}}
                    >
                    <PiArrowsDownUpBold className={` transition-transform duration-500 ${showMobileButtons ? 'rotate-0' : 'rotate-[360deg]'}`} />
                </button>
                <div className={`w-[100vw] bg-gray-700 transition-all duration-500 ${ showMobileButtons ? 'mb-0' : '-mb-[32vh]'} py-[1vh]`}>
                    <div className="gradient-mask overflow-scroll max-h-[30vh]">
                        {months.map((month, index) => (
                            <button
                                key={index}
                                className="text-center text-md w-full hover:bg-gray-900 p-2 first:mt-10 last:mb-10"
                                onClick={() => {
                                    document.getElementById(`month-${month.monthId}-year-${month.yearIndex}`).scrollIntoView({ behavior: 'smooth' })
                                }}
                                >
                                {month.month} {month.year}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="group fixed top-1/2 left-0 -translate-y-1/2 flex-col gradient-mask text-white overflow-visible hidden lg:flex pointer-events-none">
                <div className="max-h-[80vh] overflow-y-scroll overflow-x-visible no-scrollbar pointer-events-auto">
                    {months.map((month, index) => (
                        <button 
                            key={index} 
                
                            className="jump-to-buttons flex items-center text-md first:mt-24 last:mb-24 pointer-events-auto w-max" 
                            onClick={() => {
                                document.getElementById(`month-${month.monthId}-year-${month.yearIndex}`).scrollIntoView({ behavior: 'smooth' })
                            }}
                            >
                            <span className="month-year grow p-2 text-left bg-gray-800 w-max rounded-r">{month.month} {month.year}</span> <span className="p-[12px] dot"><MdCircle /></span>
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

export default JumpToButtons
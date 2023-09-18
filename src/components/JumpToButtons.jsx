import { useEffect, useState } from 'react'

import { MdCircle } from 'react-icons/md'
import { PiArrowsDownUpBold } from 'react-icons/pi'

const JumpToButtons = ({calendar}) => {

    const [months, setMonths] = useState([])

    const [showMobileButtons, setShowMobileButtons] = useState(false)

    useEffect(() => {
        const updatedMonths = []

        for (let i = 0; i < calendar.years; i++) {
            for (let index = 0; index < calendar.months.length; index++) {
                const month = calendar.months[index]
                updatedMonths.push({
                    monthId: index,
                    month: month.name,
                    year: calendar.startYear + i,
                    yearIndex: i,
                })
            }
        }

        setMonths(updatedMonths)
    }, [calendar])

    // Gradient Mask Event Listener
    useEffect(() => {
    
        const jumptoContainerDesktop = document.getElementById('jumpto-scroll-container-desktop')
        const handleScrollDesktop = () => {
            if (jumptoContainerDesktop.scrollTop === 0) {
                jumptoContainerDesktop.classList.add('mask-hide-top')
            } else if (jumptoContainerDesktop.scrollTop + jumptoContainerDesktop.clientHeight === jumptoContainerDesktop.scrollHeight) {
                jumptoContainerDesktop.classList.add('mask-hide-bottom')
            } else {
                jumptoContainerDesktop.classList.remove('mask-hide-top')
                jumptoContainerDesktop.classList.remove('mask-hide-bottom')
            }
        }

        const jumptoContainerMobile = document.getElementById('jumpto-scroll-container-mobile')
        const handleScrollMobile = () => {
            if (jumptoContainerMobile.scrollTop === 0) {
                console.log("Hitting the top")
                jumptoContainerMobile.classList.add('mask-hide-top')
            } else if (jumptoContainerMobile.scrollTop + jumptoContainerMobile.clientHeight + 1 >= jumptoContainerMobile.scrollHeight) {
                console.log("Hitting the bottom")
                jumptoContainerMobile.classList.add('mask-hide-bottom')
            } else {
                jumptoContainerMobile.classList.remove('mask-hide-top')
                jumptoContainerMobile.classList.remove('mask-hide-bottom')
            }
        }
      
        jumptoContainerDesktop.addEventListener('scroll', handleScrollDesktop)
        jumptoContainerMobile.addEventListener('scroll', handleScrollMobile)

      return () => {
        jumptoContainerDesktop.removeEventListener('scroll', handleScrollDesktop)
        jumptoContainerMobile.removeEventListener('scroll', handleScrollMobile)
      }
    })

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 block lg:hidden">
                <button 
                    className="w-full sm:w-auto flex justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm hover:bg-gray-800 active:bg-gray-800 p-2 text-4xl sm:rounded-tr"
                    onClick={() => {setShowMobileButtons(!showMobileButtons)}}
                    >
                    <PiArrowsDownUpBold className={` transition-transform duration-500 ${showMobileButtons ? 'rotate-0' : 'rotate-[360deg]'}`} />
                </button>
                <div className={`w-[100vw] bg-gray-700 py-5 bg-opacity-70 backdrop-blur-sm transition-all duration-500 ${ showMobileButtons ? 'mb-0' : '-mb-[calc(1.5rem+32vh)]'} py-[1vh]`}>
                    <div id="jumpto-scroll-container-mobile" className="gradient-mask gradient-scroll-detection overflow-scroll max-h-[30vh]">
                        {months.map((month, index) => (
                            <button
                                key={index}
                                className="text-center text-md w-full hover:bg-gray-900 p-2"
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
            <div className="group fixed top-1/2 left-0 -translate-y-1/2 flex-col text-white overflow-visible hidden lg:flex pointer-events-none">
                <div id="jumpto-scroll-container-desktop" className="max-h-[80vh] gradient-mask overflow-y-scroll overflow-x-visible gradient-scroll-detection no-scrollbar pointer-events-auto">
                    {months.map((month, index) => (
                        <button 
                            key={index} 
                
                            className="jump-to-buttons flex items-center text-md pointer-events-auto w-max" 
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